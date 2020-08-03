---
layout    : wiki
title     : REST
summary   : 
date      : 2020-04-01 14:37:38 +0900
updated   : 2020-08-04 03:03:23 +0900
tag       : 
public    : true
published : true
parent    : [[network]]
latex     : false
---

## 0. 개요
REST는 **Re**presentational **S**tate **T**ransfer의 약자로, Roy Fielding의 2000년 논문에서 처음 소개된 분산 하이퍼 미디어 시스템[^2]의 아키텍처 스타일[^1]

## RESTful
REST는 6개의 가이딩 제약을 가지고 있고, 이 제약들을 만족해야만 RESTful 하다고 할 수 있다.

## 제약(Constraint)
- Client-Server
	- 데이터 저장소로부터 유저 인터페이스를 분리
		- 서버 컴포넌트들을 단순화하여 확장성 증가
		- 멀티 플랫폼간의 유저 인터페이스의 이식성 향상
		- 이 분리는 웹에서 컴포넌트들이 독립적으로 진화하고, 인터넷에서 다양한 도메인의 요구를 지원할 수 있다.
- Stateless
	- 모든 요청은 필요한 모든 정보를 담고 있어야한다.
	- 요청 하나만 봐도 바로 뭔지 알 수 있게 되므로 가시성이 확보된다.
	- task 실패시 복원이 쉬우므로 신뢰성이 개선된다, 
	- 상태를 저장할 필요가 없으므로 규모확장성이 개선된다.
- Cache(Cacheable)
	- 캐시가 가능해야 한다. 
	- 모든 서버 응답은 캐시 가능한지 아닌지 알 수 있어야 한다.
	- 호율, 규모확장성, 사용자 입장에서의 성능이 개선된다.
- Uniform Interface(인터페이스 일관성)
	- 구성 요소(Client, Server 등) 사이의 인터페이스는 균인해야 한다.
	- 인터페이스의 일반화
		- 구조가 단순해진다. 
		- 상호 작용의 가시성 개선
		- 구현과 서비스의 분리로 독립적인 확장이 가능하다.
- Layered System 
	- 계층(hierarchical layers)으로 구성이 가능해야하며, 각 레이어에 속한 구성요소는 인접하지 않은 레이어의 구성요소를 볼 수 없어야 한다.
- Code-On-Demand (Optional) 
	- Server가 네트워크를 통해 Client에게 Java applet이나 script(E.g javascript)를 전달하면 Client에서 실행될 수 있어야 한다.
	- 이 제약조건은 필수는 아니다.

## HTTP와 REST의 관계
REST 아키텍처 스타일(디자인, 패턴)이고, HTTP는 통신에 대한 약속이다.
REST에서 반드시 HTTP만 사용하지 않고, 다른 프로토콜로도 가능하다.
하지만, 웹 환경 통신(클라이언트와 서버 간)의 대부분이 HTTP를 사용한다.


## REST
HTTP URI를 통해 자원(Resource)의 표현(Representation)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용한 구조  

## 구성
- 자원(Resource) : URI
	- 자원은 Server은 존재하고, 각 자원은 unique ID를 갖는다.
	- Client는 URI를 이용해 자원을 지정하고 해당 자원 상태에 대한 조작을 Server에 요청한다.
- 행위(Verb) - HTTP Method
	- HTTP Method에는 POST, GET, PUT, DELETE가 있다.
- 표현(Representations)
	- 하나의 자원을 보통 JSON이나 XML의 형태로 표현하고, 이를 주고 받는다.

## REST(ful) API
- API
	- 프로그램들이 정보 교환 등의 상호작용하는 것을 도와주는 매개체
- REST API
	- REST 기반으로 서비스 API를 구현한 것

## REST API 설계 규칙
- 위 제약을 지키기 위해 어떻게 구현해야 하는지는 나오지 않는다. 해당 제약을 지키기 위한 가이드는 표준이 아닌 많은 개발자들에 의해 만들어진 비공식 가이드이다. 



## 0. 개요
REST는 **Re**presentational **S**tate **T**ransfer의 약자로, 웹에 장점을 최대한 활용할 수 있는 아키텍처이다.

## 1. 정의
HTTP URI를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용한 구조  
자원을 대표하는 이름으로 상태를 전달

## 2. 개발 배경 및 목적
처음 개발된 것은 1994년 10월부터 1995년 8월 사이로 HTTP 1.0, 1.1의 개념을 소통하기 위해서였다고 한다.
웹이 어떻게 동작해야 하는지에 대한 구조적 모델을 만들어 웹 프로토콜 표준을 위한 guiding framework 역할을 하기 위함이다.(REST가 웹, HTTP와 큰 관련이 있는 것은 이 때문이다.) 

## 3. 구성
- 자원(Resource) : URI
	- 자원은 Server은 존재하고, 각 자원은 unique ID를 갖는다.
	- Client는 URI를 이용해 자원을 지정하고 해당 자원 상태에 대한 조작을 Server에 요청한다.
- 행위(Verb) - HTTP Method
	- HTTP Method에는 POST, GET, PUT, DELETE가 있다.
- 표현(Representations)
	- 하나의 자원을 보통 JSON이나 XML의 형태로 표현하고, 이를 주고 받는다.

## 4. 제약(Constraint) 
여러 네트워크의 구조화 스타일을 참고하여 웹과 같은 분산 하이퍼미디어 프로토콜에 적합한 표준을 이끌어냈고, 그것을 위해 여러 제약(Constraint)을 만들었다.
이 스타일을 웹에 맞게 만들어나가기 위해 현대적인 웹의 특징들을 제약으로 추가하여 generic한 구조를 웹에 적합한 구조로 만들어 이 스타일을 정의할 수 있었다.

- Client-Server
	- Client와 Server를 분리하고 인터페이스로만 소통할 수 있게 하여 유저는
	- Client
		- 자원을 요청하는 쪽
		- 사용자 인증이나 context(세션, 로그인 정보) 등을 직접 관리하고 책임진다.
	- Server
		- 자원을 가지고 있는 쪽
		- API를 제공하고 비즈니스 로직 처리 및 저장을 책임진다.
- Stateless
	- Server는 각 요청을 완전히 별개의 것으로 인식 및 처리한다.
	- 각 API 서버는 Client의 요청만을 단순 처리한다.
	- Server의 처리 방식에 일관성을 부여하고 서비스의 자유도가 높아진다.
- Cacheable(개시 처리 기능)

하기의 제약들은 현대적인 Web 구조를 위해 추가된 제약이다.
- Uniform Interface(인터페이스 일관성)
- Client와 Server 사이의 인터페이스는 균일(uniform)해야 한다. 
- 인터페이스를 일반화함으로써, 전체 시스템 아키텍처가 단순해지고, 상호작용의 가시성이 개선되며, 구현과 서비스가 분리되므로 독립적인 진화가 가능해진다. 
- 이 스타일은 다음의 네 제약조건으로 이루어진다: 
	- identification of resources
	- manipulation of resources through representation
	- self-descriptive messages
	- hypermedia as the engine of application state


- Layered System 
	- 계층(hierarchical layers)으로 구성이 가능해야하며, 각 레이어에 속한 구성요소는 인접하지 않은 레이어의 구성요소를 볼 수 없어야한다.
- Code-On-Demand (Optional) 
	- Server가 네트워크를 통해 Client에게 프로그램을 전달하면 그 프로그램이 클라이언트에서 실행될 수 있어야한다. (Java applet이나 Javascript 같은 것을 말함) 다만 이 제약조건은 필수는 아니다.
	- 
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

## 정의
네트워크 기반 아키텍처 스타일[^1]들 몇 가지와 추가로 Uniform Interface 스타일을 함께 결합한 하이브리드 스타일

## 제약
- Client-Server
	- 데이터 저장소로부터 유저 인터페이스를 분리
		- 서버 컴포넌트들을 단순화하여 확장성 증가
		- 멀티 플랫폼간의 유저 인터페이스의 이식성 향상
		- 이 분리는 웹에서 컴포넌트들이 독립적으로 진화하고, 인터넷에서 다양한 도메인의 요구를 지원할 수 있다.

- Stateless
	- 
- Cache
- Uniform Interface
- Layered System
- Code-On-Demand
## References
- https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#fig_5_8
- https://shoark7.github.io/programming/knowledge/what-is-rest.html
- https://blog.npcode.com/2017/03/02/%EB%B0%94%EC%81%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%9C-rest-%EB%85%BC%EB%AC%B8-%EC%9A%94%EC%95%BD/
- https://restfulapi.net/
- http://haah.kr/2017/05/24/rest-the-dissertation-summary/
- https://sanghaklee.tistory.com/61
- https://ijbgo.tistory.com/20

## footnotes
[^1]: 그 스타일을 따르는 아키텍처가 지켜야 하는 제약조건들의 집합
[^2]: hypertext(링크를 가진 텍스트, 다른 문서를 넘나들며 원하는 정보를 얻을 수 있음)의 상위 개념
