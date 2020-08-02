---
layout    : wiki
title     : REST
summary   : 
date      : 2020-04-01 14:37:38 +0900
updated   : 2020-08-03 02:47:49 +0900
tag       : 
public    : true
published : true
parent    : [[network]]
latex     : false
---

## 0. 개요
REST는 **Re**presentational **S**tate **T**ransfer의 약자로, 웹에 장점을 최대한 활용할 수 있는 아키텍처

## 1. 정의
HTTP URI를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용한 구조  
자원을 대표하는 이름으로 상태를 전달


## 2. 구성
- 자원(Resource) : URI
	- 자원은 Server은 존재하고, 각 자원은 unique ID를 갖는다.
	- Client는 URI를 이용해 자원을 지정하고 해당 자원 상태에 대한 조작을 Server에 요청한다.
- 행위(Verb) - HTTP Method
	- HTTP Method에는 POST, GET, PUT, DELETE가 있다.
- 표현(Representations)
	- 하나의 자원을 보통 JSON이나 XML의 형태로 표현하고, 이를 주고 받는다.

## 3. 특징
- Client-Server(클라이언트-서버 구조)
	- Client
		- 자원을 요청하는 쪽
		- 사용자 인증이나 context(세션, 로그인 정보) 등을 직접 관리하고 책임진다.
	- Server
		- 자원을 가지고 있는 쪽
		- API를 제공하고 비즈니스 로직 처리 및 저장을 책임진다.
- Stateless(무상태)
	- Server는 각 요청을 완전히 별개의 것으로 인식 및 처리한다.
	- 각 API 서버는 Client의 요청만을 단순 처리한다.
	- Server의 처리 방식에 일관성을 부여하고 서비스의 자유도가 높아진다.
- Ccheable(개시 처리 기능)

하기의 특징은 현대적인 Web 구조를 위해 추가된 제약이다.
- Uniform Interface(인터페이스 일관성)
- Layered System(계층화)
	- 인터넷 단위의 요구사항을 위한 행동을 향상하기 위해 이 제약을 도입. 
	- 독립성을 주어 이 제약은 OSI 7계층 모델처럼 컴포넌트가 인접한 컴포넌트 의외의 영역을 “볼 수 없는 것처럼”한다. 이를 통해 전체 시스템 복잡도에 한계를 주고 독립성을 증진한다. 
	- 레이어는 레거시 서비스를 감싸서 새 서비스를 레거시 클라이언트로부터 보호할 수 있다.
	- 
- Code-On-Demand
	- Server로부터 스크립트를 받아 Cient에서 실행할 수 있다.



## API
프로그램들이 정보 교환 등의 상호작용하는 것을 도와주는 매개체

## REST API
- REST 기반으로 서비스 API를 구현한 것
- Open API, MSA 등을 제공하는 업체 대부분은 REST API를 제공한다.

## REST API의 특징
- REST 기반으로 시스템을 분산해 확장성과 재사용성을 높여 유지보수 및 운용을 편리하게 할 수 있다.
- HTTP 표준을 기반으로 구현하므로, HTTP를 지원한느 프로그래밍 언어로 클라이언트 및 서버를 구현할 수 있다.

## 설계 규칙
- URI

## References
- https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#fig_5_8
- https://shoark7.github.io/programming/knowledge/what-is-rest.html
