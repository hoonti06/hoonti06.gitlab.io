---
layout    : wiki
title     : Redis와 MySQL의 트랜잭션 동기화 고민
summary   : 
date      : 2022-02-19 13:44:12 +0900
updated   : 2022-02-25 17:14:23 +0900
tag       : 
public    : true
published : true
parent    : [[redis]]
latex     : false
---
* TOC
{:toc}

아래의 경우 `JPA 트랜잭션의 commit`이 수행될 때 문제가 발생한다면 Redis와 MySQL의 sync가 맞지 않는다.
```java
@Transactional
void executeTx {
  redis.multi();

  redis.opsForValue().set("key1", "1");
  redis.opsForSet().add("key2", "2");

  jpaRepository.save(new Entity());

  redis.exec();
}
```

<br>
아래의 경우 `Redis의 exec()`이 수행될 때 문제가 발생한다면 이 또한, Redis와 MySQL의 sync가 맞지 않는다.
```java
void executeTx {
  redis.multi();

  redis.opsForValue().set("key1", "1");
  redis.opsForSet().add("key2", "2");

  jpaRepository.save(new Entity()); // save()에 @Transactional 적용되어 있는 상태

  redis.exec();
}
```


[@Transactional Support](https://docs.spring.io/spring-data/data-redis/docs/current/reference/html/#tx.spring)를 적용하게 되면 multi()와 exec()을 명시하지 않아도 `@Transactional`을 통해 Redis 트랜잭션을 실행할 수 있다.  
(참고로, JPA를 사용하는 경우 redisTemplate에 **`setEnableTransactionSupport(true)`**  설정만 추가해주면 된다.)

아래와 같이 작성하면 method가 종료될 때, Redis 트랜잭션과 JPA 트랜잭션이 수행된다.

```java
@Transactional
void executeTx {
  redis.opsForValue().set("key1", "1");
  redis.opsForSet().add("key2", "2");

  jpaRepository.save(new Entity());
}
```

<br>
테스트 결과 `Redis exec()`을 수행할 때 Redis와의 연결이 끊기면 Redis는 반영이 안 되지만, JPA 트랜잭션은 정상 반영(commit)되는 문제가 발생한다(아마도 순서가 JPA commit을 한 다음 Redis exec을 수행하는 것으로 판단된다). 이러한 이유로 완전한 트랜잭션이라고 할 수 없다.

<br>
또한, @Transactional proxy에서 Redis exec() 수행 도중 exception이 발생하더라도 내부에서 exception을 알아서 처리하기 때문에 외부에서 exception을 catch할 수가 없다. 그래서, exec이 제대로 수행됐는지 안 됐는지 알 수가 없다.

<br>
다행히 다음과 같은 코드를 작성하면 exec() 수행 시 발생하는 exception을 받을 수 있다. exec에서 발생한 exception을 catch한 시점에서는 JPA 트랜잭션은 이미 commit된 상태이다. 그래서, 이미 commit된 데이터를 삭제하여야 데이터의 일관성을 유지시킬 수 있다.
```java
void executeTx {
  redis.multi();

  redis.opsForValue().set("key1", "1");
  redis.opsForSet().add("key2", "2");

  Entity e = new Entity();
  jpaRepository.save(e);

	try {
    redis.exec();
  } catch (Exception e) {
    jpaRepository.deleteById(e.getId());
    throw new RedisExecException();
  }
}
```
