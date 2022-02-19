---
layout    : wiki
title     : Redis와 MySQL의 트랜잭션 동기화 고민
summary   : 
date      : 2022-02-19 13:44:12 +0900
updated   : 2022-02-19 15:48:58 +0900
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
