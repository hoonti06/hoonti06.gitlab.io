---
layout    : wiki
title     : Redis 트랜잭션과 동시성 제어
summary   : 
date      : 2022-02-06 21:08:57 +0900
updated   : 2022-03-04 21:14:47 +0900
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
