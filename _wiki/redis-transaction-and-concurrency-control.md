---
layout    : wiki
title     : Redis 트랜잭션과 동시성 제어
summary   : 
date      : 2022-02-06 21:08:57 +0900
updated   : 2022-03-25 12:55:19 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## Check and Set

예산이라는 공유 자원의 증가/감소를 하기 위해서는 먼저 현재의 값을 조회(Check)하고, 새로운 값으로 저장(Set)해주는 과정이 필요하다.
그리고 이 과정이 원자적으로 이루어져야 한다.

<br>
Redis의 multi와 exec만으로는 Check and Set을 구현할 수 없다. 그 이유는 Redis operation들이 queueing되었다가 한 번에 수행되어, 조회하고자 하는 시점과 실제 조회되는 시점이 다르기 때문이다. 따라서, 다른 방법을 활용해야 한다.

## 1. INCRBYFLOAT & DECRBYFLOAT

- Redis에서 제공하는 operation
- 원자적인 증가 / 감소 가능
- benefit 시스템 특성상 현재 값을 조회하여 전체 예산과 비교를 해야 하기 때문에 조회가 필요하다.
- float은 부동 소수점을 활용하기 때문에 소수점 데이터에서 오차가 발생할 수 있다.


## 2. Lua script

- script를 통해서 원자적인 조회와 저장(Check and Set)이 가능하다.
- float은 부동 소수점을 활용하기 때문에 소수점 데이터에서 오차가 발생할 수 있다.
- Spring에서 Redis의 lua script 사용 방법 : <https://docs.spring.io/spring-data/data-redis/docs/current/reference/html/#scripting>
- Redis의 유일한 committer는 lua script가 나오고 난 뒤에는 MULTI/EXEC을 써본 적이 없다고 한다
  - <https://github.com/redis/redis/issues/1315#issuecomment-26125869>


## 3. 조회와 저장을 하나의 트랜잭션으로 수행하지 않는다

- 조회와 저장을 따로 수행한다.
- 동시성 제어가 되지 않는다.
  - 하나의 thread에서 조회와 저장을 진행하는 동안 그 사이에 다른 thread에서 동일한 공유 자원을 조회 및 저장하는 경우 문제가 발생할 수 있다.
- 동시성 제어를 하기 위한 방법이 필요하다.


### WATCH 이용(Optimistic lock)

- Redis에서 제공하는 WATCH를 통해 key를 모니터링하면 해당 value의 값이 변경되는지를 감지할 수 있다.
- 공유 자원에 대한 동시 접근이 적게 발생할 때 적합
- exec()을 수행하면 WATCH하던 key는 unwatch를 하게 되고, 그 상태에서 해당 key의 value를 변경할 경우 DISCARD된다.
- DISCARD 되었을 때, 재시도(retry) 등의 추가 처리가 필요하다.

### Lock 이용(Pessimistic lock)

- 충돌이 많이 발생할 것이라 예상을 하고 진행하는 방식
- Lock을 활용하여 하나의 thread에서 조회와 저장을 진행하는 동안 다른 thread가 끼어들지 못한다.
- Lock을 걸고 해제하는 방식으로 인해 성능적 이슈가 있을 수 있다.
