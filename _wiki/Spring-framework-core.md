---
layout    : wiki
title     : 스프링 프레임워크 핵심 기술
summary   : 
date      : 2020-01-29 09:42:19 +0900
updated   : 2020-02-02 21:18:33 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 1. Spring framework
Spring framework는 소규모 애플리케이션 또는 기업용 애플리케이션을 자바로 개발하는 데 있어 유용하고 편리한 기능을 제공하는 프레임 워크이다.

## 1.1 역사
- 2003년 등장 (개발은 그 이전부터 이미 진행됐지만)
	- 등장시 Java EE[^5] 표준과 싸우는 것처럼 보였지만 실제로는 Java EE 스팩 구현 모음체(+alpha).
	- Servlet, WebSocket, Bean Validation, JPA, Dependency Injection(DI), ...
- 최근까지 주로 서블릿 기반 애플리케이션을 만들 때 사용해 옴.
- 스프링 5부터는 WebFlux 지원으로 서블릿 기반이 아닌 서버 애플리케이션도 개발할 수 있게 지원


## 1.2 디자인 철학
- 모든 선택은 개발자의 몫. (ex> Spring이 특정 영속화 기술을 강요하지 않는다.)
- 다양한 관점을 지향한다. (유연성)
- 하위 호환성을 지킨다. (노력)
- API를 신중히 설계한다. (공들인다)
- 높은 수준의 코드를 지향한다. (자랑)



## 2. IoC 컨테이너

### 2.1 Spring IoC 컨테이너와 빈

Inversion of Control(IoC): 의존 관계 주입(Dependency Injection, DI)이라고도 하며, 어떤 객체가 사용하는 **의존 객체를 직접 만들어 사용하는게 아니라, 주입 받아 사용하는 방법**[^1]을 말함

- Spring IoC 컨테이너    
	- BeanFactory : 가장 상위 Class, 객체 생성과 검색에 대한 기능
		- e.g) getBean(), 싱글톤/프로토타입
		- Application Component의 중앙 저장소
		- **빈 설정 소스**로부터 **빈 정의**를 읽어들이고, **빈을 구성하고 제공**한다.  
<br>
- 빈  
	- Spring IoC 컨테이너가 관리하는 객체
	- 장점
		- 의존성 관리
		- Scope
			- 싱글톤(Default) : 하나
			- 프로토타입 : 매번 다른 객체
		- 라이프사이클 인터페이스 (e.g> @PostConstruct : 빈이 만들어진 직후 수행할 함수 지정)  
<br> 
- ApplicationContext : 메시지, 프로필/환경 변수들을 처리할 수 있는 기능이 추가된다. (당연히 BeanFactory 기능도 할 수 있다.)  
	- BeanFactory를 상속 받음
	- 메시지 소스 처리 기능[^2] (i18n)
	- 이벤트 발행 기능
	- 리소스[^3] 로딩 기능  
<br>
- DI(Dependency Injection, 의존 주입)    
	- 한 클래스가 다른 클래스의 method를 사용할 때 이를 '의존'이라고 한다.
	- 방식
		- 생성자
		- Setter  
<br><br>
- 참고)
	- 단순히 getter와 setter가 있으면 java bean이라 할 수 있다. 하지만 Spring에서 다루는 빈은 될 수 없다.
	- 프레임워크는 뼈대와 프로그래밍 방법을 제공한다.
	- 자바SE로 된 자바 객체(POJO[^4])를 JAVA EE에 의존적이지 않게 연결해준다.
	- [[Spring-boot]]{Spring boot}
		- Spring은 기능이 많은 만큼 환경 설정이 복잡함
		- 설정의 많은 부분을 자동화해준다.
			- 내장 Tomcat
			- 의존성 관리
			- 실행 환경 자동 설정


### 2.2 ApplicationContext와 다양한 빈 설정 방법

Spring IoC 컨테이너의 역할

- 빈 instance 생성
- 의존 관계 설정
- 빈 제공


ApplicationContext

- ClassPathXmlApplicationContext(XML) : 고전적인 방법, 번거롭다.
- AnnotationConfigApplicationContext(Java) : Java 클래스들에서 정보를 읽어와 객체를 생성하고 초기화를 진행한다.
	- 위 클래스로 빈을 등록하는 방법
		1. 위 클래스 내부에 method를 정의하고, method 위에 @bean을 붙인다.
		2. 등록하고자 하는 클래스에 @componentScan(basePackage=DemoApp.class)를 붙인다.


빈 설정

- 빈 명세서
- 빈에 대한 정의를 담고 있다.
	- 이름
	- Class
	- Scope
	- 생성자 argument(Constructor)
	- properties(setter)
	- etc...

Component Scan

- 설정 방법
	- XML 설정에서는 context:component-scan (고전적 방법)
	- JAVA 설정에서는 @ComponentScan
- 특정 패키지 이하의 모든 클래스 중에서 @Component 애노테이션을 사용한 클래스를 빈으로 자동 등록해준다.



참고)  

- [[Spring-boot]]{Spring boot}
	- @springBootApplicaion
		- AppicationContext도 위 애노테이션을 통해 주입되기 때문에 바로 사용 가능하다.
		- @configuration이 붙는 Class를 생성할 필요도 없다.

### 2.3 @Autowired










## footnote
[^1]: 의존 객체를 변경하는데 유연하고, 유지보수에 용이하다.
[^2]: 메시지 다국화
[^3]: 특정 위치에 있는 파일 등
[^4]: 단순히 평범한 자바 빈즈 객체
[^5]: Java Platform Enterprise Edition, 자바를 이용한 서버측 개발을 위한 플랫폼. PC에서 동작하는 표준 플랫폼인 Java SE에 웹 애플리케이션 서버에서 동작하는 장애복구 및 분산 멀티티어(multi-tier)를 제공하는 자바 소프트웨어의 기능을 추가한 서버를 위한 플랫폼으로, 이전에는 J2EE라 불리었다.  Java EE 스펙에 따라 제품으로 구현한 것을 웹 애플리케이션 서버(WAS)라 불린다. (출처 : [위키피디아](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_%ED%94%8C%EB%9E%AB%ED%8F%BC,_%EC%97%94%ED%84%B0%ED%94%84%EB%9D%BC%EC%9D%B4%EC%A6%88_%EC%97%90%EB%94%94%EC%85%98))

## 내용 출처
[inflearn - 스프링 프레임워크 핵심 기술 강의 및 강의 노트(백기선)](https://www.inflearn.com/course/spring-framework_core#)
[위키피디아](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_%ED%94%8C%EB%9E%AB%ED%8F%BC,_%EC%97%94%ED%84%B0%ED%94%84%EB%9D%BC%EC%9D%B4%EC%A6%88_%EC%97%90%EB%94%94%EC%85%98)
