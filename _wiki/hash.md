---
layout    : wiki
title     : Hash(해시)
summary   : 
date      : 2019-03-26 23:30:15 +0900
updated   : 2021-01-04 10:03:34 +0900
tag       : 
public    : true
published : true
parent    : [[data-structure]]
latex     : false
---
* TOC
{:toc}

## 1. Hash
- 임의의 길이의 데이터(key)를 고정된 길이의 데이터(hash)로 변환시키는 것
- Hash function을 통해 hash값을 얻는 과정

## 2. Hash Table

### 2.1. 정의 및 특성
- Hash Table은 해시값을 인덱스로 하여 key와 value를 함께 저장하는 자료구조 
- 저장되는 곳은 bucket 또는 slot

### 2.2. 장점
- 인덱스로 해시값을 사용하므로 검색과 삽입, 삭제를 빠르게 수행할 수 있다. (0(1))
- 적은 리소스로 많은 데이터를 효율적으로 관리할 수 있다.

### 2.3. Collision(충돌)
- 한정적인 자원(table)으로 인해 훨씬 많은 key값을 더 적은 양의 hash값으로 대응시켜야 하기 때문에 서로 다른 두 key값이 같은 hash값을 갖는 Collision이 발생한다.

- 해결 방법
	- Open addressing(개방 주소)
		- 다른 인덱스의 저장소를 탐색하여 빈 곳에 삽입하게 된다.
		- 동일한 데이터에 대한 저장 위치가 매번 달라질 수 있다.
	- Chaining
		- 해당 인덱스에 있는 linked list에 삽입한다.
		- 동일한 데이터는 항상 같은 인덱스에서 찾을 수 있지만, 하나의 인덱스에 데이터가 몰리게 되면 속도가 느려진다.

## 3. 암호화
- 기존의 데이터가 완전히 다른 모습의 데이터로 변환된다.
- SHA(Secure Hash Algorithm)

## 4. 데이터 축약
- 엄청난 길이의 데이터를 짧게 축약된 데이터로 변환시키기 때문에 축약된 데이터간의 비교를 통해 효율적인 비교가 가능하다.


## 5. 롤링 해시

abcdefgh 에서 bcd를 찾으려할 때
bcd => b*13^0 + c*13^1 + d*13^2 라고 하고,

abcdefgh 에서 abc => a*13^0 + b*13^1 + c*13^2 이고,
bcd로 가기 위해서
1. a 빼기 : (a*13^0 + b*13^1 + c*13^2) - a*13^0
2. 13으로 나누기 : (b*13^1 + c*13^2) / 13
3. d 더하기 : (b*13^0 + c*13^1) + d*13^2

이게 롤링 해시

## 내용 출처
[https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash](https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash)   
[https://dbehdrhs.tistory.com/70](https://dbehdrhs.tistory.com/70)

## footnotes

