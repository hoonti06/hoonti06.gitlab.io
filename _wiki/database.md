---
layout    : wiki
title     : 
summary   : 
date      : 2019-10-04 09:44:02 +0900
updated   : 2020-04-10 02:07:44 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 0. 개요
DB : 응용 시스템들이 공유해서 사용하는 운영 데이터들을 구조적으로 통합시켜놓은 모임


- DDL(Data Definition Language)
	- DB 구축 목적
	- CREATE, ALTER, DROP, TRUNCATE
- DML(Data Manipulation Language)
	- 데이터를 실질적으로 처리
	- SELECT, INSERT, UPDATE, DELETE
- DCL(Data Control Language)
	- 데이터의 보안, 무결성 등을 정의
	- GRANT, REVOKE, COMMIT, ROLLBACK
 
- 참고)
	- TCL(Transaction Control Language)
		- 일부에서는 DCL의 COMMIT, ROLLBACK를 따로 분류하기도 함

- DB 스키마
	- 외부 스키마 : 사용자 뷰
	- 개념 스키마 : 전체적인 뷰
	- 내부 스키마 : 저장 스키마, 물리적인 구조 정의

- 뷰 : 사용자에게 제한적인 자료만을 보여주기 위한 가상 테이블

- 갱신 이상(수정 이상)
- 삽입 이상
- 삭제 이상

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



출처: https://zzdd1558.tistory.com/88 [YunJin_Choi]
