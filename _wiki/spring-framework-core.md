---
layout    : wiki
title     : 스프링 프레임워크 핵심 기술
summary   : 
date      : 2020-01-29 09:42:19 +0900
updated   : 2020-03-24 10:24:55 +0900
tag       : spring web inflearn
public    : true
published : true
parent    :[[]]
latex     : false
---

## 1. Spring framework
Spring framework는 소규모 애플리케이션 또는 기업용 애플리케이션을 자바로 개발하는 데 있어 유용하고 편리한 기능을 제공하는 프레임 워크이다.

## 1.1. 역사
- 2003년 등장 (개발은 그 이전부터 이미 진행됐지만)
	- 등장시 Java EE[^5] 표준과 싸우는 것처럼 보였지만 실제로는 Java EE 스팩 구현 모음체(+alpha).
	- Servlet, WebSocket, Bean Validation, JPA, Dependency Injection(DI), ...
- 최근까지 주로 서블릿 기반 애플리케이션을 만들 때 사용해 옴.
- 스프링 5부터는 WebFlux 지원으로 서블릿 기반이 아닌 서버 애플리케이션도 개발할 수 있게 지원


## 1.2. 디자인 철학
- 모든 선택은 개발자의 몫. (ex> Spring이 특정 영속화 기술을 강요하지 않는다.)
- 다양한 관점을 지향한다. (유연성)
- 하위 호환성을 지킨다. (노력)
- API를 신중히 설계한다. (공들인다)
- 높은 수준의 코드를 지향한다. (자랑)

## 1.3. 장점
- 트랜젝션 관리
- 각기 다른 데이터베이스의 연동 지원
- 객체관계형 프레임워크(하이버네이트, 아이바티스)와 결합
- 모든 필요한 이즈노성을 컨테이너에서 해결되도록 의존성 주입을 지원
- REST 스타일 웹 서비스 지원 
 

## 2. IoC 컨테이너

### 2.1. Spring IoC 컨테이너와 빈

Inversion of Control(IoC): 의존 관계 주입(Dependency Injection, DI)이라고도 하며, 어떤 객체가 사용하는 **의존 객체를 직접 만들어 사용하는게 아니라, 주입 받아 사용하는 방법**[^1]을 말함

{% plantuml %}
rectangle "Bean 설정" as bean
node "Spring IoC 컨테이너" as container
bean -right-> container

skinparam node {
	backgroundColor Agua
}

{% endplantuml %}

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
  
+---------------------------------------------------+-------------+--------------------+
| Feature                                           | BeanFactory | ApplicationContext |
+===================================================+:===========:+:==================:+
| Bean instantiation/wiring                         |     Yes     |         Yes        |
+---------------------------------------------------+-------------+--------------------+
| Automatic `BeanPostProcessor` registration        |      No     |         Yes        |
+---------------------------------------------------+-------------+--------------------+
| Automatic `BeanFactoryPostProcessor` registration |      No     |         Yes        |
+---------------------------------------------------+-------------+--------------------+
| Convenient `messageSource` access (for i18n)      |      No     |         Yes        |
+---------------------------------------------------+-------------+--------------------+
| `ApplicationEvent` publicaion                     |      No     |         Yes        |
+---------------------------------------------------+-------------+--------------------+

	  
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


### 2.2. ApplicationContext와 다양한 빈 설정 방법

- Spring IoC 컨테이너의 역할
	- 빈 instance 생성
	- 의존 관계 설정
	- 빈 제공  
	  <br>
- ApplicationContext
	- ClassPathXmlApplicationContext(XML) : 고전적인 방법, 번거롭다.
	- AnnotationConfigApplicationContext(Java) : Java 클래스들에서 정보를 읽어와 객체를 생성하고 초기화를 진행한다.
		- 위 클래스로 빈을 등록하는 방법
			1. 위 클래스 내부에 method를 정의하고, method 위에 @bean을 붙인다.
			2. 등록하고자 하는 클래스에 @componentScan(basePackage=DemoApp.class)를 붙인다.  
			   <br>
- 빈 설정
	- 빈 명세서
	- 빈에 대한 정의를 담고 있다.
		- 이름
		- Class
		- Scope
		- 생성자 argument(Constructor)
		- properties(setter)
		- etc...  
		  <br>
- Component Scan
	- 설정 방법
		- XML 설정에서는 context:component-scan (고전적 방법)
		- JAVA 설정에서는 @ComponentScan
	- 특정 패키지 이하의 모든 클래스 중에서 @Component 애노테이션을 사용한 클래스를 빈으로 자동 등록해준다.  
	  <br><br>
- 참고)
	- [[Spring-boot]]{Spring boot}
		- @springBootApplicaion
			- AppicationContext도 위 애노테이션을 통해 주입되기 때문에 바로 사용 가능하다.
			- @configuration이 붙는 Class를 생성할 필요도 없다.


### 2.3. @Autowired

- 필요한 의존 객체의 `타입`에 해당하는 빈을 찾아 주입한다.
- @Autowired(required: true) : Default값은 true (주입할 빈을 못 찾으면 애플리케이션 구동 실패)
- 사용할 수 있는 위치
	- 생성자(Spring 4.3부터는 생략 가능)
	- 세터(Setter)
	- 필드  
	  <br>
- 같은 타입의 빈 개수에 따른 경우의 수
	- 0개
	- `1개`
	- 2개 이상
		- 빈 이름(smallcase로 시작하는 class 이름)으로 시도
			- `같은 이름의 빈을 찾으면 해당 빈을 사용`
			- 같은 이름의 빈을 못 찾으면 실패  
			  <br>
- 같은 타입의 빈 개수가 2개 이상일 때 해결하는 방법
	- `@Primary` : 가장 우선적인 빈을 주입하도록 지정 (추천, type-safe하기 때문)
	- List<>을 통해 해당 타입의 빈을 모두 주입받을 수 있다.
	- @Qualifier(value) : 해당 value로 지정해놓은 빈을 주입받는다. (value가 빈 이름이 될 수도 있다.)
	- 필드(변수)의 이름을 빈 이름과 동일하게 작성(추천하지는 않는 방법)  
	  <br>
- 동작 원리
	- BeanPostProcessor
		- 새로 만든 빈 instance를 수정할 수 있는 라이프 사이클 인터페이스
	- AutowiredAnnotationBeanPostProcessor (extends BeanPostProcessor)
		- Spring이 제공하는 `@Autowired`와 '@Value' annotation 그리고 JSR-330의 '@Inject' annotation을 지원하는 `annotation 처리기`
		- 수행 순서 (하기의 리스트는 긴 수행 과정 중의 일부분)
			1. PostProcessBeforeInitialization (BeanPostProcessor) : 이때 @Autowired를 처리하여 의존을 주입한다.
			2. Initializing Bean's afterPropertiesSet : 이때 @PostConstruct를 처리한다.
			3. PostProcessAfterInitialization (BeanPostProcessor)
				<br><br>
				
				
- 참고)  
	- Application을 실행하고 'ApplicationRunner' Interface들을 모두 실행한다.
	- @PostConstruct
		- 생성자가 호출되는 시점에는 아직 빈이 초기화되지 않은 상태, 즉 아직 Bean이 주입되기 전이다.  
		  생성자에서 빈에 대한 초기화를 할 수 없으니 주입이 완료된 빈에 대해 초기화를 @PostConstruct가 설정된 method에서 할 수 있다.

### 2.4. @Component와 컴포넌트 스캔

- @Component : 개발자가 직접 작성한 Class를 Bean으로 등록할 때 사용
	- 하위 annotation으로 나눈 이유 : annotation마다 특성을 갖고 있지만, 가독성에서도 해당 애노테이션을 갖는 클래스가 무엇을 하는지 알 수 있다.
	- @Repository
		- DAO의 메소드에서 발생할 수 있는 unchecked exception들을 스프링의 DataAccessException으로 처리할 수 있다.
	- @Service
	- @controller
	- @Configuration
		- @Bean으로 정의된 메소드들을 포함하며, 이 메소드는 Spring IoC Container에 의해 관리되는 오브젝트들의 instatiation, configuration, initialization 로직 등을 담당한다.


- 컴포넌트 스캔
	- @Component와 @Service, @Repository, @Controller, @Configuration이 붙은 클래스 Bean들을 찾아 Context에 Bean 등록을 해주는 annotation
	- 주요 기능
		- 스캔 위치, 범위 설정
		- 필터 : 어떤 annotation을 스캔할지 또는 하지 않을지(include or exclude)
	- 동작 원리
		- @ComponentScan은 스캔할 package와 annoataion에 대한 정보
		- 실제 스캐닝은 ConfigurationClassPostProcessor라는 BeanFactoryPostProcessor에 의해 처리됨
		- scan을 먼저 수행하고, scan을 통하지 않는 빈 등록을 수행한다.  
	 
- 참고)
	- @Bean : @Configuration으로 선언된 클래스 내에 있는 메소드를 정의할 때 사용한다. 이 메소드가 반환하는 객체가 bean이 되며, 메소드 이름이 bean의 이름이 된다.
	- @Bean vs @Component
		- @Bean은 개발자가 직접 제어할 수 없는 외부 라이브러리 등을 Bean으로 등록할 때 사용
	- Function을 사용한 빈 등록 ('@Bean'을 통한 빈 등록을 대체할 수 있지만, @ComponentScan을 대체하기엔 좋지 못한 방법)  
	  
	  ```java
	  
	  public static void main(String[] args) {
	  	new SpringApplicationBuilder()
			.sources(DemoApplication.class)
			.initalizer((ApplicationContextInitializer<GenericApplicationContext>) applicationContext -> { 
				applicationContext.registerBean(MyBean.class);
			})
			.run(args);
	  }
	  ```
	  
### 2.5. 빈의 스코프

- 스코프
	- 싱글톤
	- 프로토타입 : @scope("prototype")
		- Request
		- Session
		- WebSocket
		- ...
- 프로토타입 빈이 싱글톤 빈을 참조하면?
	- 아무 문제없음
- 싱글톤 빈이 프로토타입을 참조하면?
	- 프로토타입 빈이 업데이트되지 않는다.  
	  (싱글톤 빈이 처음에 생성될 때 참조하는 프로토타입 빈의 property도 세팅이 되어 바뀌지 않는다.)
	- 업데이트 하려면
		- scoped-proxy 
			- @scope(value="prototype", proxyMode="ScopedProxyMode.TARGET_CLASS") // '클래스 기반의 proxy로 해당 빈을 감싸라'
		- Object-Provider
			- ObjectProvider<CLASS> class;
			- 추천 X (코드에 스프링 코드가 추가되기 때문에 POJO스럽지 않다.)
		- Provider(표준)  
		  <br>
		  
- 프록시

{% ditaa -T %}
+---------+
|  Proxy  |
| +-----+ |    +------+
| |Proto| |<---+Single|
| +-----+ |    +------+
+---------+
{% endditaa %}  
<br>

- 싱글톤 객체 사용 시 주의할 점
	- property가 공유된다. (변수들의 값이 thread-safe하지 않기 때문에 조심해야 한다.)
	- ApplicationContext 초기 구동 시에 인스턴스 생성함 (구동 시에 모든 빈을 생성하느라 느릴 수 있다.)

## 내용 출처
[inflearn - '스프링 프레임워크 핵심 기술(백기선)' 강의 및 강의 노트](https://www.inflearn.com/course/spring-framework_core)
[Java EE - wikipedia](https://ko.wikipedia.org/wiki/자바_플랫폼,_엔터프라이즈_에디션)


## footnote
[^1]: 의존 객체를 변경하는데 유연하고, 유지보수에 용이하다.
[^2]: 메시지 다국화
[^3]: 특정 위치에 있는 파일 등
[^4]: 단순히 평범한 자바 빈즈 객체
[^5]: Java Platform Enterprise Edition, 자바를 이용한 서버측 개발을 위한 플랫폼. PC에서 동작하는 표준 플랫폼인 Java SE에 웹 애플리케이션 서버에서 동작하는 장애복구 및 분산 멀티티어(multi-tier)를 제공하는 자바 소프트웨어의 기능을 추가한 서버를 위한 플랫폼으로, 이전에는 J2EE라 불리었다.  Java EE 스펙에 따라 제품으로 구현한 것을 웹 애플리케이션 서버(WAS)라 불린다. (출처 : [위키피디아](https://ko.wikipedia.org/wiki/자바_플랫폼,_엔터프라이즈_에디션))
