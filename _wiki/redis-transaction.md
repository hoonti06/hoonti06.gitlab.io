---
layout    : wiki
title     : Redis 트랜잭션
summary   : 
date      : 2022-02-06 09:42:16 +0900
updated   : 2022-02-06 10:14:47 +0900
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
