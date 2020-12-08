---
layout    : wiki
title     : Spring MVC vs Webflux
summary   : 
date      : 2020-08-17 20:55:20 +0900
updated   : 2020-08-18 00:12:10 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---


## Spring MVC vs Webflux
![](https://spring.io/images/diagram-reactive-1290533f3f01ec9c57baf2cc9ea9fa2f.svg)  
![](https://docs.spring.io/spring/docs/current/spring-framework-reference/images/spring-mvc-and-webflux-venn.png)  
![](https://docs.spring.io/spring-framework/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/html/images/webflux-overview.png)

- Spring MVC는 Java EE의 Servlet Spec에 기반하여 만들어 졌다.
	- Synchronous blocking I/O 구조를 사용
	- 1 request -> 1 thread
- Webflux는 non-blocking web framework이다.
- 내장 서버
	- Webflux('spring-boot-start-webflux')의 기본 내장 서버는 Netty(비동기적인 이벤트 중심의 서버 중 하나)이다.
	- Spring Boot starter('spring-boot-starter-web')의 기본 내장 서버는 Tomcat이다.
- Programming 방식
	- Spring MVC는 명령형 로직(Imperative programming)으로, 코드 작성 및 디버깅이 쉽다.
		- 작업이 수행되는 동안 완료될 때까지 아무 것도 할 수 없다(이 작업을 수행하는 스레드는 차단되고, 차단되는 스레드는 낭비다).
	- Webflux는 이벤트 기반의 reactive programming 방식이다(명령형 프로그래밍의 대안).
		- 연결을 수락하는 하나의 보스 스레드와 cpu의 코어 수에 비례하는 N개의 워커 스레드만으로 구성(many request -> 1 thread)
- Event loop concurrency model
	- 모든 것이 이벤트로 처리
	- 이벤트 루프가 DB나 네트워크 작업과 같은 집중적인 작업의 콜백을 등록하여 병행(concurrency)으로 수행되게 하고, 다른 이벶트 처리로 넘어간다.
	- 작업이 완료되면 완료 이벤트를 푸시하게 되고, 이를 이벤트 루프가 받는다.
- Webflux는 2가지 모델을 지원한다.
	- Annotated Controller 
		- Spring MVC 모델 기반의 기존 spring-web 모듈과 같은 방식으로 구성하는 방법, Spring MVC에서 제공하는 어노테이션들을 그대로 사용 가능
	- Functional Endpoints
		- lambda 베이스의 lightweight한 함수형 프로그래밍 모델
		- request을 routing과 handling 할 때 사용하는 라이브러리
		- callback 형태로써 요청이 있을 때만 호출된다는 점이 annotated controller 방식과의 차이점


## Webflux의 탄생 이유
Servlet 3.1에서 non-blocking I/O에 대한 API를 제공했으나, non-blocking API를 사용하게 되면 Filter, Servlet 등의 동기화나 getParameter, getPart 등의 blocking을 API을 사용하지 못하게 된다. 이는 곧 non-blocking이 기반이 되는 새로운 공통 API가 필요한 이유가 되었다.
## Spring MVC
- Spring Framework 3.x부터 비동기 방식을 지원하고 있지만, Servlet은 Response를 기다리는 동안 Pool의 Thread들을 지연시킬 수 있기 때문에 전체 stack을 **Reactive**하게 할 수 없다.

## Reactive Programming
- 명령형 프로그래밍의 대안이 되는 패러다임
	- 작업이 수행되는 동안 완료될 때까지 아무 것도 할 수 없다(이 작업을 수행하는 스레드는 차단되고, 차단되는 스레드는 낭비다).
- 변화에 반응하도록 
- 비동기 데이터 Stream으로 Non-blocking 애플리케이션을 구현하는 방식을 의미

## Reactive stream
- Non-blocking back pressure를 이용한 비동기 데이터 처리의 표준
	- back pressure : Publisher에서 데이터를 Subscriber로 Push하는 방식이 아니라, Pull 방식으로 Subscriber가 Publisher로 처리할 수 있는 양 만큼 데이터를 요청하는 방식
		- 다이나믹 풀 방식
		- Subscriber의 장애 방지
즉, 다이나믹 풀 방식의 데이터 요청을 통해서 구독자가 수용할 수 있는 만큼 데이터를 요청하는 방식이다.
- 데이터 전체를 사용할 수 있을 때까지 기다리지 않고 사용 가능한 데이터가 있을 때마다 처리

## Project Reactor
- 스프링5의 리액티브 기능을 뒷밧침하는 리액티브 프로그래밍 라이브러리

## Reactive Stream
- sd

## Webflux
- MVC는 서블릿 컨테이너와 서블릿을 기반으로 웹 추상화 계층을 제공

Webflux는 서블릿 컨테이너 뿐만 아니라, Netty, Undertow와 같은 네트워크 어플리케이션 프레임워크도 지원하므로, HTTP와 Reactive Stream 기반으로 웹 추상화 계층을 제공합니다.
WebFlux 모듈에는 HTTP abstractions, Reactive Stream apdater, Reactive codes 그리고 non-blocking servlet api를 지원하는 core web api가 포함되어 있음

server-side WebFlux 상에서 아래와 같이 두 가지 프로그램 모델로 구성이 가능합니다.

Annotated Controller : Spring MVC 모델 기반의 기존 spring-web 모듈과 같은 방식으로 구성하는 방법으로, Spring MVC에서 제공하는 어노테이션들을 그대로 사용가능합니다.
Functional Endpoints : Java 8 lambda style routing과 handling 방식입니다. 가벼운 routing기능과 request 처리 라이브러리라고 생각하면 쉽고, callback형태로써 요청이 있을 때만 호출된다는 점이 annotated controller방식과의 차이점입니다.

## Spring MVC vs Webflux
- Spring MVC는 Servlet 구조의 멀티스레드인 반면, Webflux는 이벤트 기반의 Reactive 



## 참고
- https://spring.io/reactive
	- 1번 이미지
- https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html
	- #webflux-new-framework : Webflux의 탄생 이유
	- #webflux-why-reactive : 'Reactive' 정의
	- #webflux-programming-models : Webflux의 2가지 모델
	- #webflux-framework-choice : 2번 이미지
- https://docs.spring.io/spring-framework/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/html/web-reactive.html
	- 3번 이미지
- https://docs.spring.io/spring-boot/docs/1.1.3.RELEASE/reference/html/howto-embedded-servlet-containers.html#howto-use-jetty-instead-of-tomcat 
- https://dreamchaser3.tistory.com/6 
- https://kimyhcj.tistory.com/343
- https://hyunsoori.tistory.com/3
	- http://www.reactive-streams.org/
- https://engineering.linecorp.com/ko/blog/reactive-streams-with-armeria-1/
