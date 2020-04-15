---
layout    : wiki
title     : 데이터베이스
summary   : 
date      : 2019-10-04 09:44:02 +0900
updated   : 2020-04-13 00:00:52 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 0. 개요
DB : 응용 시스템들이 공유해서 사용하는 운영 데이터들을 구조적으로 통합시켜놓은 모임


- DB 언어
	- DDL(Data Definition Language)
		- DB 구축 목적
		- e.g> CREATE, ALTER, DROP, TRUNCATE
	- DML(Data Manipulation Language)
		- 데이터를 실질적으로 처리
		- e.g> SELECT, INSERT, UPDATE, DELETE
	- DCL(Data Control Language)
		- 데이터의 보안, 무결성 등을 정의
		- e.g> GRANT, REVOKE, COMMIT, ROLLBACK
 

- DB 스키마 : 데이터베이스에서 자료의 구조, 자료의 표현 방법, 자료 간의 관계를 형식 언어로 정의한 구조
	- 외부 스키마
		- 사용자 뷰
		- 여러 개 존재 가능
	- 개념 스키마
		- 전체적인 뷰
	- 내부 스키마
		- 전체 DB의 물리적인 저장 형태

- 뷰 : 사용자에게 제한적인 자료만을 보여주기 위한 가상 테이블

- 이상(Anomaly)과 정규화
	- 이상(Anomaly)
		- 삽입 이상 : 새 데이터를 삽입하기 위해 불필요한 데이터도 함께 삽입해야 하는 문제
		- 삭제 이상 : 튜플을 삭제하면 꼭 필요한 데이터까지 함께 삭제되는 데이터 손실의 문제
		- 갱신 이상 : 중복 튜플 중 일부만 변경하여 데이터가 불일치하게 되는 모순의 문제

	- 정규화
		- 정의 : 관계형 데이터베이스의 설계에서 중복을 최소화하게 데이터를 구조화하는 프로세스
		- 목적 : 이상(Anomaly)을 예방하고 효과적 연산을 제공한다.
		- 제 1정규형
		- 
- 무결성
	- 정의 : 데이터베이스에 저장된 데이터 값과 그것이 표현하는 현실 세계의 실제값이 일치하는 정확성을 의미한다
	- 종류
		- 개체 무결성
			- 기본 키(primary key)를 고유 값으로 반드시 가져야 하고 NULL이 아니어야 한다.
		- 참조 무결성
			- 외래 키(foreign key)는 NULL이거나 참조 대상이 갖는 범위 내에서만 가능
		- 도메인 무결성
			- 속성 값이 미리 정의된 도메인 범위에 속해야 한다.
			- e.g> int형에 char형 데이터가 들어갈 수 없고, 성별에는 '남'과 '여'만 가능


- DELETE, TRUNCATE, DROP의 차이
	- DELETE
		- 데이터만 삭제되며 테이블 용량은 줄어들지 않는다.
		- TABLE이나 CLUSTER에 행이 많으면 많은 SYSTEM 자원이 소모된다.
		- Commit 이전에는 Rollback이 가능하다.
		- Rollback 정보를 기록하므로 Truncate에 비해서 느리다.
		- 전체 또는 일부 삭제 가능
		- 삭제 행수를 반환
		- 데이터를 모두 Delete 해도 사용했던 Storage는 Release 처리되지 않는다.

	- TRUNCATE
		- 테이블을 최초 생성된 초기상태로 만든다.
		- 용량이 줄어들고, 인덱스 등도 모두 삭제
		- Rollback 불가능
		- 무조건 전체 삭제만 가능
		- 삭제 행수를 반환하지 않는다.
		- 테이블이 사용했던 Storage 중 최초 테이블 생성시 할당된 Storage만 남기고 Release 처리

	- DROP
		- 테이블의 정의(존재)를 제거
		- Rollback 불가능
		- 테이블이 사용했던 Storage는 모두 Release 처리


