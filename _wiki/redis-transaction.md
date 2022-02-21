---
layout    : wiki
title     : Redis 트랜잭션
summary   : 
date      : 2022-02-06 09:42:16 +0900
updated   : 2022-02-21 12:25:41 +0900
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

