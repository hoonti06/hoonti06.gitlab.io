---
layout    : wiki
title     : Redis 트랜잭션
summary   : 
date      : 2022-02-06 09:42:16 +0900
updated   : 2022-02-23 19:11:26 +0900
tag       : 
public    : true
published : true
parent    : [[redis]]
latex     : false
---
* TOC
{:toc}

Redis 트랜잭션은 [공식 reference](https://redis.io/topics/transactions)에 보면 다음과 같은 글이 있다.  

> All the commands in a transaction are serialized and executed sequentially. It can never happen that a request issued by another client is served **in the middle** of the execution of a Redis transaction. This guarantees that the commands are executed as a single isolated operation.

‘레디스 트랜잭션의 모든 명령은 일렬로 수행되고 트랜잭션의 수행 중간에 다른 요청이 발생할 수 없다’고 나와있다.  
하나의 독립된 수행으로 실행됨을 보장한다’ 고도 한다.

<br>
하지만, [https://stackoverflow.com/a/10751198](https://stackoverflow.com/a/10751198) 의 내용을 보면  
왜 다른 명령에 의해 방해 받지 않는 트랜잭션에서 check and set을 수행할 수 없냐는 질문의 답이 다음과 같이 작성되어 있다.

> Redis "transactions" are completely different than what most people think transactions are in classical DBMS.

`Redis의 트랜잭션`은 일반적으로 생각하는 기존 DBMS의 트랜잭션과 다르다.

<br>
먼저, 서버 사이드(in redis)와 클라이언트 사이드(in script)에서 정확히 무엇이 수행되는지 알아야 한다.

<br>
```python
# Does NOT work
redis.multi()
current = redis.get('powerlevel')
redis.set('powerlevel', current + 1)
redis.exec()
```
위 코드를 봤을때, 분명 GET과 SET 명령은 서버 사이드에서 수행이 된다. 그리고 current에 값을 저장하는 것과 current + 1 연산은 클라이언트 사이드에서 수행된다.

<br>
`원자성(atomicity)`을 보장하기 위해서 MULTI/EXEC 구간 사이의 명령들은 EXEC을 비로소 만나야 수행이 되기 때문에 그때까지 기다린다. 그래서 클라이언트에서 구간의 명령(GET & SET)들을 메모리에 쌓아놨다가 마지막에 한 번에 수행된다.

<br>
다시 말하자면, redis.get()이 실행될 때에는 null이 반환되어 current값이 null이 되면서 GET operation이 queue에 쌓인다. (null + 1) 이 set의 parameter로 들어가고, queue SET operation이 쌓인다. exec()이 호출되면 그제서야 queue에 쌓인 operation들이 redis에 전달되고, 한 번에 처리된 뒤 그에 대한 값들이 응답으로 온다. 이때 실제 우리가 원하던 get(’powerlevel’)의 값을 받게 되지만 이미 한참 늦은 뒤인 것이다.

<br>
<https://lettuce.io/core/release/reference/#_transactionsmulti>에 비슷한 내용이 나와있다.


## Redis 트랜잭션에는 Rollback이 없다.

단순하고 빠르게 만들기 위해 Rollback 기능은 제공하지 않는다. 에러는 개발 중에 발견할 수 있다.  
자세한 내용은 <https://redis.io/topics/transactions#why-redis-does-not-support-roll-backs>에서 확인할 수 있다.


## Redis 트랜잭션 구현

Redis에도 저장을 하고, MySQL에도 저장을 하는 과정이 atomic하게 이루어져야 하는 것이 목표였다.  

<br>
Spring에서 Reids 트랜잭션을 구현하기 위해서는 크게 2가지 방법이 존재한다.

### SessionCallback  사용

다음 코드를 실행했을 때 정상 동작을 하고, 2개 항목을 수행했으니 2개 항목에 대한 결과가 txResults에 잘 저장되어 있다.
```java
List<Object> txResults = redisTemplate.execute(new SessionCallback<>() {
  public List<Object> execute(RedisOperations operations) throws DataAccessException {
 
    operations.multi(); // redis transaction 시작

    operations.opsForValue().set("key1", "NEW_VALUE1");
    operations.opsForSet().add("key2", "NEW_VALUE2");

    jpaRepository.save(new Entity());

    return operations.exec(); // redis transaction 종료
  }
});

System.out.println(Arrays.toString(txResults.toArray())); // output : [true, 1]
```


<br>
다음 코드는 transaction 외부에서 watch로 모니터링하고 있는 key의 값이 update 되었을 때이다.  
트랜잭션 내부는 discard가 발생하여 rxResults에도 값이 하나도 안 들어가 있다. 하지만, MySQL에 save하는 코드는 정상 동작하게 된다. 그래서 이 경우에는 atomic이 이뤄지지 않는다.
```java
List<Object> txResults = redisTemplate.execute(new SessionCallback<>() {
  public List<Object> execute(RedisOperations operations) throws DataAccessException {

    operations.watch("key2");
    operations.opsForSet().add("key2", "ANOTHER_VALUE");

    operations.multi(); // redis transaction 시작

    operations.opsForValue().set("key1", "NEW_VALUE1");
    operations.opsForSet().add("key2", "NEW_VALUE2");

    jpaRepository.save(new Entity());

    return operations.exec(); // redis transaction 종료
  }
});

System.out.println(Arrays.toString(txResults.toArray())); // ouput : [] (empty)
```

<br>
따라서, 다음과 같이 txResults의 값을 확인하여 discard가 되었다면 runtime exception을 통해 MySQL에 저장하는 과정 또한 rollback 되게끔 해야 한다(txResults의 값은 execute 내부에서 실행되는 operations.exec()의 리턴 값이며, MySQL rollback은 `@Transactional`에 의해 이뤄진다).
```java
@Transactional
void method() {

  List<Object> txResults = redisTemplate.execute(new SessionCallback<>() {
    public List<Object> execute(RedisOperations operations) throws DataAccessException {

      operations.watch("key2");
      operations.opsForSet().add("key2", "ANOTHER_VALUE");

      operations.multi(); // redis transaction 시작

      operations.opsForValue().set("key1", "NEW_VALUE1");
      operations.opsForSet().add("key2", "NEW_VALUE2");

      jpaRepository.save(new Entity());
	
      return operations.exec(); // redis transaction 종료
    }
  });
	

  if (txResults.isEmpty()) {
    throw new RuntimeException("Redis 트랜잭션의 Discard 발생!");
  }
}
```

<br>
다음 코드와 같이 Redis의 트랜잭션 진행 과정(multi와 exec 사이)에서 exception이 발생하면 exec()을 실행하지 않기 때문에 redis에 명령들이 전달되지 않는다. 그리고 DB의 save도 Rollback된다.

```java
@Transactional
void method() {

  List<Object> txResults = redisTemplate.execute(new SessionCallback<>() {
    public List<Object> execute(RedisOperations operations) throws DataAccessException {

      operations.multi(); // redis transaction 시작

      operations.opsForValue().set("key1", "NEW_VALUE1");
      operations.opsForSet().add("key2", "NEW_VALUE2");

      jpaRepository.save(new Entity());

      if (true) {
        throw new RuntimeException("Redis 트랜잭션 내부에서 exception 발생!");
      }

      return operations.exec(); // redis transaction 종료
    }
  });
}
```


### @Transactional 사용

[spring data redis reference](https://docs.spring.io/spring-data/data-redis/docs/current/reference/html/#tx.spring)를 참고하였다.

<br>
@Transactional을 사용하기 위해서는 몇 가지 설정이 필요하다

<br>
사실 JPA를 사용하면 (2)에 해당하는 RedisTemplate의 **`setEnableTransactionSupport(true)`** 설정만 해도 된다.
```java
@Configuration
@RequiredArgsConstructor
@EnableTransactionManagement // (1)
public class RedisConfig {
    private final RedisProperties redisProperties;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(redisProperties.getHost(),
                                            redisProperties.getPort());
    }

    @Bean
    public RedisTemplate<?, ?> redisTemplate() {
        RedisTemplate<?, ?> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        **redisTemplate.setEnableTransactionSupport(true);  // (2)**
        return redisTemplate;
    }
}
```

<br>
위와 같이 설정을 하고 다음의 코드를 수행하면, update() 메서드가 정상적으로 리턴되면 그제서야 JPA transactionManager의 commit()과 redis 트랜잭션의 exec()이 수행된다.
```java
public class ParentService {
	
	public void parent() {
		txService.update();
	}
}

public class TxService {
	@Transactional // redis transaction 시작 & 끝
	public void update() {
	
	  redisTemplate.opsForValue().set("key1", "NEW_VALUE1"); // 수행됨
	  redisTemplate.opsForSet().add("key2", "NEW_VALUE2");   // 수행됨
	
	  jpaRepository.save(new Entity()); // 수행됨
	
	}
}
```

<br>
commit()을 수행하는 과정에서 DB의 연결 이상 등의 이유로 실패를 하게 되면 당연하게 DB 트랜잭션은 수행되지 않고, redis의 exec()도 수행되지 않는다.  
하지만, exec()을 수행하는 과정에서 redis의 연결 이상 등의 이유로 실패하더라도 commit()은 정상 수행이 되어 원자성이 이루어지지 않는다. commit()이 먼저 이뤄지고, exec()이 그 다음 수행되는 것으로 판단된다.
