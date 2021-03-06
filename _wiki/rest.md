---
layout    : wiki
title     : REST
summary   : 
date      : 2020-04-01 14:37:38 +0900
updated   : 2021-01-05 00:07:51 +0900
tag       : REST REST-API
public    : true
published : true
parent    : [[network]]
latex     : false
---
* TOC
{:toc}

## 개요
REST는 **Re**presentational **S**tate **T**ransfer의 약자로, Roy Fielding의 2000년 논문에서 처음 소개된 분산 하이퍼 미디어[^2] 시스템의 아키텍처 스타일[^1]  
즉, 웹을 위한 네트워크 기반 아키텍처의 설계 규범들(아키텍처가 지켜야 하는 제약조건들의 집합)
REST 아키텍처 스타일은 URI, HTTP 등의 웹 표준에 반영되었다.

## 탄생 배경
웹이 급속도로 성장하고 있던 상황에서 당시 HTTP 명세에 참여하고 있던 Roy Fielding이 당시 아키텍처가 웹의 본래 설계의 우수성을 많이 사용하지 못하고 있다고 판단하여 웹의 장점을 최대한 활용할 수 있는 네트워크 기반의 아키텍처에 대한 제약 및 가이드를 제시

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
	- 구성 요소(Client, Server 등) 사이의 인터페이스는 균일해야 한다.
		- 미디어 유형이나 리소스 식별자 등을 의미하는 문법이 구성요소나 호환 시스템 간 동일해야 한다는 의미
		- 필요한 이유
			- 서버 입장에서 어떤 클라이언트든 상관없이(내가 보내주는 것을 이해할 수 있을까 걱정없이) 표준에 의한 응답을 해줄 수 있다.
			- 클라이언트 입장에선 hypertext를 통해 다음 상태로의 이동을 해야 하는데, 표준화된 방식을 통해 해당 서버의 특성을 알 필요가 없어진다.
			- 서로의 특성을 알지 못해도 커뮤니케이션이 가능할 수 있어야, 각각 독립적으로 진화할 수 있는 유연한 시스템이 만들어진다.
		- 4가지 Interface 제약조건
			-  identification of resources
				- 리소스를 식별하는 방법이 동일해야 한다. 우리는 보통 URI를 쓰기 때문에 어쩐지 당연한 말처럼 느껴진다.
			- manipulation of resources through representation
				- 리소스의 표현계층(representation)을 리소스의 식별자(URL)로부터 분리한 것은 REST에서 아주 주요한 관점이다.
			- self-descriptive messages
				- 요청이나 응답 메시지에는 이를 이해하기 위한 모든 정보가 포함되어야 한다.
			- hypermedia as the engine of application state(a.k.a HATEOAS)
				- 논문에서 hypermedia라고 한 것은 단지 text가 아닌 매체를 고려했기 때문이고,
				- 일반적인 API에서는 거의 hypertext라고 표현하면 된다.
				- 음? 우리가 HTML 페이지에서 맨날 보는 그 hypertext라는 용어가 맞나?
				- 맞다. 제시된 hypertext 위에서 application 상태를 변경하는 주체가 client가 되어야 한다는 게 핵심이다.
				- 목적
					- (서버-클라이언트 간 의존성을 분리해야만 가능한) 독자적인 진화와 확장을 보조하는 것이며, hypermedia는 그 목적을 이루는 데 기여해야 한다.
	- 인터페이스의 일반화
		- 구조가 단순해진다. 
		- 상호 작용의 가시성 개선
		- 구현과 서비스의 분리로 독립적인 확장이 가능하다.
- Layered System 
	- 계층(hierarchical layers)으로 구성이 가능해야하며, 각 레이어에 속한 구성요소는 인접하지 않은 레이어의 구성요소를 볼 수 없어야 한다.
- Code-On-Demand (Optional) 
	- Server가 네트워크를 통해 Client에게 Java applet이나 script(E.g javascript)를 전달하면 Client에서 실행될 수 있어야 한다.
	- 이 제약조건은 필수는 아니다.

## 구성
- 자원(Resource) : URI
	- 자원은 Server은 존재하고, 각 자원은 unique ID를 갖는다.
	- Client는 URI를 이용해 자원을 지정하고 해당 자원 상태에 대한 조작을 Server에 요청한다.
- 행위(Verb) - HTTP Method
	- HTTP Method에는 POST, GET, PUT, DELETE가 있다.
		- GET : 리소스 조회
		- POST : 리소스 생성
		- PUT : 리소스 갱신
		- DELETE : 리소스 삭제
- 표현(Representations)
	- 하나의 자원을 보통 JSON이나 XML의 형태로 표현하고, 이를 주고 받는다.

## 구체적인 개념
HTTP URI를 통해 자원(Resource)의 표현(Representation)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용한 구조  


## HTTP와 REST의 관계
- REST 아키텍처 스타일(디자인, 패턴)이고, HTTP는 통신에 대한 약속이다.
- REST에서 반드시 HTTP만 사용하지 않고, 다른 프로토콜로도 가능하다.
- 하지만, 웹 환경 통신(클라이언트와 서버 간)의 대부분이 HTTP를 사용한다.

## REST API
- API : 프로그램들이 정보 교환 등의 상호작용하는 것을 도와주는 매개체
- REST API
	- REST 기반으로 서비스 API를 구현한 것
	- Open API, MSA 등을 제공하는 업체 대부분은 REST API를 제공한다.

## REST API의 특징
- REST 기반으로 시스템을 분산해 확장성과 재사용성을 높여 유지보수 및 운용을 편리하게 할 수 있다.
- HTTP 표준을 기반으로 구현하므로, HTTP를 지원하는 프로그래밍 언어로 클라이언트 및 서버를 구현할 수 있다.

## REST의 의미
HTTP URI를 통해 자원(Resource)의 표현(Representation)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용한 구조  

## REST API
- API
	- 프로그램들이 정보 교환 등의 상호작용하는 것을 도와주는 매개체
- REST API
	- REST 기반으로 서비스 API를 구현한 것

## RESTful
- REST의 Code-On-Demand를 제외한 5가지 제약을 지키는 구조를 RESTful 하다고 할 수 있다.
- 하지만, Roy Fielding의 논문에는 'url을 어떻게 작성해야 하는지' 등의 구체적인 언급은 없다.
- 따라서, REST의 제약을 잘 지키기 위한 가이드는 표준이 아니고, 여러 개발자들에 의해 만들어진 비공식 가이드라고 할 수 있다.
	- 목적 
		- 이해하기 쉽고 사용하기 쉬운 REST API를 만드는 것
		- 일관적인 컨벤션을 통한 API의 이해도 및 호환성 향상(성능 향상이 주 목적은 아님)


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

### Roy가 말하는 hypertext
- 내가 hypertext라고 이야기하는 건, 정보와 통제(control)를 동시에 제공함으로써, 그 정보가 사용자에 선택권을 주고 동작을 결정하는 수단이 되는 것을 말한다
- hypertext는 브라우저 위에서 HTML로 이루어질 필요는 없다. 기계는 data format과 relation type만 이해하면 링크를 따라갈 수 있다

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

- HTTP 메소드에 대해서 알아보았는데, 조금 더 찾아보니 HTTP 는 0.9 -> 1.0 -> 1.1 순으로 변화했다고 한다.  
  0.9 에선 GET 을 이용한 Read-only 버전이었고 1.0 에 들어와서야 HEAD, POST 등을 이용해 서버로 데이터 전송이 가능해졌다.  
  HTTP 1.1 (RFC 2616) 에 와서야 DELETE, PUT 등이 추가되면서 변경, 삭제까지 가능해졌다.

- FC 2616의 GET 메서드 정의는 다음과 같다.
The GET method means retrieve whatever information (in the form of an
entity) is identified by the Request-URI.

- HTTP method definition (2014 6월 개정) : https://tools.ietf.org/html/rfc7231#section-4.3
	- GET : The GET method requests transfer of a current selected representation
   for the target resource. GET is the primary mechanism of information
   retrieval and the focus of almost all performance optimizations.
	- HEAD : The HEAD method is identical to GET except that the server MUST NOT
   send a message body in the response. This method can be used for obtaining
   metadata about the selected representation without transferring the
   representation data and is often used for testing hypertext links for
   validity, accessibility, and recent modification.

- REST의 논문에선 CRUD에 대한 언급을 안 했으며, 모든 자원에 대해 균일하게 정의되어야 한다 정도를 언급했다. 다만 이 메소드가 본래의 정의에 맞게 사용되기는 해야한다. 모든 상태변화에 PUT만 쓸 필요가 없다.

- REST 논문에는 애초에 CRUD나 어떤 HTTP 메소드를 써야 한다는 언급이 없었다.  ‘REST API는 GET/POST/PUT/DELETE를 쓰는 것이다’라는 공식은 웹 프레임웍의 잘못된 가이드에도 원인이 있기도 하다.

- ["POST 써도 괜찮아"](https://roy.gbiv.com/untangled/2009/it-is-okay-to-use-post) - Roy Fielding의 블로그 'Untangled'
	- 몇몇 사람들이 '갱신(upgrade) 목적으로는 POST를 쓰지마' 라고 REST가 제안하고 있다고 (잘못) 생각하고 있어"
	> Some people think that REST suggests not to use POST for updates. 
	- "내 논문을 찾아보면 CRUD나 POST에 대한 언급은 없어. PUT도 HTTP의 write-back caching 부재에 관한 내용에서만 언급 돼."
	> Search my dissertation and you won’t find any mention of CRUD or POST.
	- "상세한 내용을 작성하지 않은 주요 이유는 HTTP method는 Web의 아키텍처 정의의 한 부분이지, REST 아키텍처 스타일이 아니기 때문이다."
	>  The main reason for my lack of specificity is because the methods defined by HTTP are part of the Web’s architecture definition, not the REST architectural style
	- 항상 stats 변화에 PUT을 사용할 필요없어. REST는 절대 그러라고 한 적이 없어
	> We don’t need to use PUT for every state change in HTTP. REST has never said that we should.
	- 	
	> What matters is that every important resource have a URI, therein allowing representations of that resource to be obtained using GET.  















## References
- https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#fig_5_8
- https://shoark7.github.io/programming/knowledge/what-is-rest.html
- https://blog.npcode.com/2017/03/02/%EB%B0%94%EC%81%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%9C-rest-%EB%85%BC%EB%AC%B8-%EC%9A%94%EC%95%BD/
- https://blog.npcode.com/2017/04/03/rest%ec%9d%98-representation%ec%9d%b4%eb%9e%80-%eb%ac%b4%ec%97%87%ec%9d%b8%ea%b0%80/
- https://restfulapi.net/
- http://haah.kr/2017/05/24/rest-the-dissertation-summary/
- https://sanghaklee.tistory.com/61
- https://ijbgo.tistory.com/20
- https://dingue.tistory.com/m/11
- https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html
- https://meetup.toast.com/posts/92
- https://1ambda.github.io/javascripts/rest-api-put-vs-post/
- https://greatkim91.tistory.com/13
- https://tools.ietf.org/html/rfc7231#section-4.3

## footnotes
[^1]: 그 스타일을 따르는 아키텍처가 지켜야 하는 제약조건들의 집합
[^2]: hypertext를 확장한 개념, world wide web(이하 web)이 하나의 예
[^3]: 서버에서 관리하는 디렉터리라는 리소스
[^4]: 클라이언트에서 관리하는 리소스 저장소
[^5]: 객체 인스턴스나 데이터베이스 레코드와 유사한 개념


# REST, REST API
## 개요
REST는 **Re**presentational **S**tate **T**ransfer의 약자로, Roy Fielding의 2000년 논문에서 처음 소개된 분산 하이퍼 미디어 시스템의 아키텍처 스타일  

## 탄생 배경
웹이 급속도로 성장하고 있던 상황에서 당시 HTTP 명세에 참여하고 있던 Roy Fielding이 당시 아키텍처가 웹의 본래 설계의 우수성을 많이 사용하지 못하고 있다고 판단하여 웹의 장점을 최대한 활용할 수 있는 네트워크 기반의 아키텍처에 대한 제약 및 가이드를 제시

## 구체적인 개념
HTTP URI를 통해 자원(Resource)의 표현(Representation, media type)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용한 구조  

## 구성
- 자원(Resource) : URI
	- 자원은 Server은 존재하고, 각 자원은 unique ID를 갖는다.
	- Client는 URI를 이용해 자원을 지정하고 해당 자원 상태에 대한 조작을 Server에 요청한다.
- 행위(Verb) - HTTP Method
	- HTTP Method에는 POST, GET, PUT, DELETE가 있다.
		- GET : 리소스 조회
		- POST : 리소스 생성
		- PUT : 리소스 갱신
		- DELETE : 리소스 삭제
- 표현(Representations)
	- 하나의 자원을 보통 JSON이나 XML의 형태로 표현하고, 이를 주고 받는다.


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
- REST 아키텍처 스타일(디자인, 패턴)이고, HTTP는 통신에 대한 약속이다.
- REST에서 반드시 HTTP만 사용하지 않고, 다른 프로토콜로도 가능하다.
- 하지만, 웹 환경 통신(클라이언트와 서버 간)의 대부분이 HTTP를 사용한다.

## REST API
- API : 프로그램들이 정보 교환 등의 상호작용하는 것을 도와주는 매개체
- REST API
	- REST 기반으로 서비스 API를 구현한 것
	- Open API, MSA 등을 제공하는 업체 대부분은 REST API를 제공한다.

## REST API 디자인 가이드
REST API 설계 시 가장 중요한 항목 2가지
- URI는 정보의 자원을 표현해야 한다.
- 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.

## RESTful
- REST의 Code-On-Demand를 제외한 5가지 제약을 지키는 구조를 RESTful 하다고 할 수 있다.
- 하지만, Roy Fielding의 논문에는 'url을 어떻게 작성해야 하는지' 등의 구체적인 언급은 없다.
- 따라서, REST의 제약을 잘 지키기 위한 가이드는 표준이 아니고, 여러 개발자들에 의해 만들어진 비공식 가이드라고 할 수 있다.
	- 목적 
		- 이해하기 쉽고 사용하기 쉬운 REST API를 만드는 것
		- 일관적인 컨벤션을 통한 API의 이해도 및 호환성 향상(성능 향상이 주 목적은 아님)
