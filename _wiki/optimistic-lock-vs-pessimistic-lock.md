---
layout    : wiki
title     : 낙관적 lock vs 비관적 lock
summary   : 
date      : 2022-01-28 19:21:51 +0900
updated   : 2022-01-28 22:03:14 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

공유 자원에 대해서 동시에 접근 및 수정을 하게 될 때 충돌이 발생하고 문제가 생길 수 있다. 이때, 일종의 lock을 걸어 해결할 수 있는 방법은 2가지로, 낙관적 lock과 비관적 lock이 있다.

## 낙관적(Optimistic) lock
- 충돌이 거의 일어나지 않을 것으로 예상하고 충돌 발생 시 추가적인 조치를 취하는 방식
- 충돌의 발생을 막지 않고 모니터링을 통해 감지한다.
- 특별한 과정이 추가되지 않기 때문에 비관적 lock에 비해 속도가 빠르다
- Version을 통해 구현할 수 있다(Redis의 경우 WATCH를 통해 구현 가능)
	- 조회 시 Version과 업데이트 시의 Version이 다른 경우, 충돌이 발생했다고 판단하고 그에 따른 처리를 할 수 있다.
 

## 비관적(Pessimistic) lock
- 충돌이 많이 발생할 것으로 예상하고 미리 공유 자원에 대해 선점을 하는 방식
- 처음부터 충돌이 발생하지 않도록 한다.
- 선점 과정 등의 충돌 발생을 미연에 방지하기 위한 작업이 추가되기 때문에 속도가 느릴 수 있다
- DB의 Query 중 SELECT FOR UPDATE로 구현할 수 있다
	- SELECT된 record는 lock이 걸려 다른 트랜잭션에서 접근이 불가능하다

## 참고
- <https://jinhanchoi1.medium.com/비관적-lock-낙관적-lock-이해하기-1986a399a54>
