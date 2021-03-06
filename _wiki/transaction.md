---
layout    : wiki
title     : 트랜잭션(Transaction)
summary   : 
date      : 2020-04-09 21:32:14 +0900
updated   : 2022-01-03 17:53:29 +0900
tag       : db database
public    : true
published : true
parent    : [[database]]
latex     : false
---
* TOC
{:toc}

## 1. 정의
여러 개의 작업을 하나의 논리적인 작업 단위로 묶어주는 것

## 2. 목적 
병렬 처리에 의한 부정합 방지

## 3. 특징

- ACID
	- Atomicity(원자성) : 모두 반영되거나 모두 반영되지 않는다.
 
	- Consistency(일관성) : 트랜잭션 수행 전, 후에 데이터 모델의 모든 제약 조건(기본키, 외래키, 도메인, 도메인 제약조건 등)을 만족하는 것을 통해 보장 
 
	- Isolation(독립성) : 트랜잭션 수행 도중 다른 트랜잭션이 끼어들지 못한다.(트랜잭션 밖에 있는 어떤 연산도 중간 단계의 데이터를 볼 수 없다)
 
	- Durability(지속성) : 성공적으로 수행된 트랜잭션은 영원히 반영(보장)되어 그 결과를 잃지 않는다.(트랜잭션들이 로그로 기록되어 로그를 통해 시스템 장애 발생 전으로 복원 가능)  
<br>
 
- 참고)
	- COMMIT
		- 모든 작업이 정상적으로 처리돼서 **영구적인 변경을 확정하는 일**
		- COMMIT을 수행하면 하나의 트랜잭션 과정을 종료하게 된다.
	- ROLLBACK
		- 작업 중 문제가 발생했을 때, 트랜잭션의 처리 과정에서 발생한 변경 사항을 취소하고, 트랜잭션 과정을 종료
		- **트랜잭션이 시작되기 이전의 상태로 되돌린다.**

## 4. 격리 수준(Isolation level)

### 4.1. 격리 이슈
- dirty read
	- 수정은 됐지만 아직 커밋은 안된 데이터를 다른 트랜잭션이 읽은 상태에서 수정이 ROLLBACK되버린 경우

- non-repeatable read
	- 한 트랜잭션에서 같은 쿼리를 두 번 수행할 때 그 사이에 수정 또는 삭제 트랜잭션이 커밋되어 두 쿼리의 결과가 다르게 나타나는 경우
	- 한 트랜잭션에서 동일한 SELECT 쿼리의 결과가 항상 같아야 하는 적합성 규칙에 어긋난다.
 
- phantom read 
	- Tx A가 일정 범위의 레코드를 여러 번 조회하는 와중에 Tx B가 새로운 레코드를 추가(INSERT)하여 이전에는 존재하지 않았던 레코드가 갑자기 나타나는 경우  
	- 트랜잭션 도중 새로운 레코드가 삽입되는 것을 허용할 때 발생
<br>
			  
			  
- 참고)
	- second lost updates problem : non-repeatable read의 한 가지 형태로, 첫 번째 트랜잭션이 데이터에 쓰기를 하고 커밋을 했는데 다른 트랜잭션이 같은 데이터에 쓰기를 하고 커밋을 하면 앞선 트랜잭션의 결과는 날아가 버린다.  
 
 
### 4.2. 격리 수준

|                  | dirty read | non-repeatable read | Phantom read |
|------------------|:----------:|:-------------------:|:------------:|
| READ UNCOMMITTED |      Y     |          Y          |       Y      |
|------------------|------------|---------------------|--------------|
| READ COMMITTED   |      N     |          Y          |       Y      |
|------------------|------------|---------------------|--------------|
| REPEATABLE READ  |      N     |          N          |       Y      |
|------------------|------------|---------------------|--------------|
| SERIALIZABLE     |      N     |          N          |       N      |

- READ UNCOMMITTED (Level 0)
	- 가장 낮은 격리 수준
	- **트랜잭션에 처리중인 혹은 아직 커밋되지 않은 데이터를 다른 트랜잭션이 읽는 것을 허용(쓰기는 안됨)**

- READ COMMITTED (Level 1)
	- **커밋된 데이터만 읽을 수 있도록 허용**
	- 한 트랜잭션에서 동일한 SELECT 쿼리가 다른 결과를 낼 수 있음

- REPEATABLE READ (Level 2)
	- **변경 전의 데이터를 Undo 영역에 백업해놓고 이를 이용해 한 트랜잭션에서 동일한 결과를 보여줄 수 있도록 보장**
	- MYSQL InnoDB의 Default level
	- 한 번 lock이 설정된 레코드는 해당 트랜잭션이 종료될 때까지 lock이 유지된다.
	- 트랜잭션이 시작되기 전까지의 커밋된 내용에 대해서만 조회할 수 있는 격리 수준
	- 자신의 트랜잭션 번호보다 낮은 트랜잭션 번호에서 변경된(+커밋된) 것만 보게 된다.

- SEREALIZABLE (Level 3)
	- 가장 높은 격리 수준
	- **읽기 작업에도 shared lock을 걸어**서, 동시에 다른 트랜잭션이 이 레코드를 변경할 수 없다.
	- 성능 측면에서는 동시 처리 성능이 가장 낮다.  
<br>	  


- 참고)
	- MYSQL의 경우 REPEATABLE READ 와 READ COMMITTED level에 대해서 한 트랜잭션에서 SELECT 쿼리로 데이터를 읽어올 때 테이블에 lock을 걸지 않고, 해당 시점의 데이터 상태를 의미하는 snapshot을 구축하여 거기서 데이터를 읽어온다.  
READ COMMITTED 에서 각각의 SELECT 쿼리는 그때그때 최신의 snapshot을 구축하여 데이터를 읽어온다. 따라서 한 트랜잭션이지만 SELECT 쿼리의 결과가 다를 수 있다.  
이와 다르게 REPEATABLE READ 는 한 트랜잭션에서 처음 데이터를 읽어올 때 구축한 snapshot에서 모두 데이터를 읽어온다. 따라서 매번 SELECT 쿼리의 결과들이 항상 처음과 동일했던 것이고, 이로 인해 phantom read도 발생하지 않게 된다.
snapshot을 통해 한 트랜잭션에서 SELECT 쿼리는 항상 동일하더라도, 다른 트랜잭션에서 건드린 row에 대해서는 UPDATE, DELETE 쿼리의 결과가 다르게 출력될 수 있다.
(출처 : https://jupiny.com/2018/11/30/mysql-transaction-isolation-levels/)
	- MVCC(Multi Version Concurrency Control) : lock을 사용하지 않고 데이터 객체의 변경 사항을 버전으로 기록하여 읽기의 일관성을 보장
