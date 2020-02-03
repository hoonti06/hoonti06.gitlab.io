---
layout    : wiki
title     : Spring boot
summary   : 
date      : 2020-01-27 12:31:49 +0900
updated   : 2020-02-03 13:48:23 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 1. 시작하기

### 1.1 Spring boot 소개
[https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/#getting-started-introducing-spring-boot](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/#getting-started-introducing-spring-boot)
<br>

### 1.2 spring boot 시작하기
[https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/#getting-started-maven-installation](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/#getting-started-maven-installation)
<br>

### 1.3 Sprint boot 프로젝트 생성기
[https://start.spring.io](https://start.spring.io)
<br>

### 1.4 프로젝트 구조
[https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-structuring-your-code](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-structuring-your-code)
<br><br>

- maven 기본 프로젝트 구조와 동일
	- 소스 코드 (src/main/java)
	- 소스 리소스 (src/main/resources)
	- 테스트 코드 (src/test/java)
	- 테스트 리소스 (src/test/resources)
 
- main application 위치 : 기본 패키지(default package)
	- component-scan을 해야하기 때문이다.(기본 패키지의 하위가 scan 대상)


## 2. 원리

### 2.1 의존성 관리 

#### 2.1.1 이해

{% mermaid %}
graph BT
	A[current project] -- parent --> B[spring-boot-starter-parent]
	B -- parent --> C["spring-boot-dependencies(최상위)"]
{% endmermaid %}

spring-boot-dependencies의 pom.xml 내부 \<dependency management\> 항목에 버전들이 정의되어 있다. 이 버전들을 current project의 pom.xml에 명시하면 해당 버전에 따른 dependency를 사용할 수 있다.

spring-boot-starter-parent의 pom.xml 내부 \<properties\> 항목에 아래와 같이 정의되어 있다. 따라서, spring-boot-starter-parent를 쓰는 것을 권장한다.

- 1.8 Java version
- UTF-8 인코딩
- plugin configuration
- resource filtering 
- etc...


#### 2.1.2 활용

- 버전 관리 해주는 의존성 추가  
spring boot에서 관리하는 의존성이기 때문에 version을 명시하지 않아도 된다.  

	```xml  
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-data-jpa</artifactId>
	</dependency>
	```  
	<br>
- 버전 관리 안 해주는 의존성 추가  
의도치 않은 version이 들어올 수 있기 때문에 version을 명시해주는 것이 좋다. ([https://mvnrepository.com](https://mvnrepository.com) 참고)  

	```xml  
	<dependency>
		<groupId>org.modelmapper.boot</groupId>
		<artifactId>modelmapper</artifactId>
		<version>2.1.0</version>
	</dependency>
	```  
	<br>

- 기존 의존성 버전 변경하기  
spring-boot-dependencies나 spring-boot-start-parent의 \<properties\>를 current project에서 다른 버전으로 overriding할 수 있다. 


### 2.2 자동 설정

#### 2.2.1 개요
- @EnableAutoConfiguration (@SpringBootApplication 안에 포함되어 있음)
	- 의존성 'spring-boot-autoconfigure'에서 설정된 이 Annotation으로 인해 application 실행 시 tomcat, jdbc, MongoDB 등이 자동으로 설정되는 것이다.  
	<br>
- 자동 설정에서 빈은 두 단계로 나뉘어서 등록된다.
	- 첫 번째 : @ComponentScan
		- 해당 annotation이 포함되어 있는 package에서 그 하위에 있는 모든 빈을 scan한다. (같은 또는 상위 레벨에 있는 package는 포함되지 않는다.)  
		- @Configuration, @Repository, @Service, @Controller, @RestController
	- 두 번째 : @EnableAutoConfiguration
		- spring.factories[^1]
			- org.springframework.boot.autoconfigure.EnableAutoConfiguration : 이 항목 하위에 명시되어 있는 모든 목록에 대해 자동으로 빈 등록을 시도한다.(그 모든 목록에 가보면 각각 @Configuration이 명시되어 있다.) 하지만, 각 목록에서 @ConditionalOnXxxYyyZzz 애노테이션에 따라 빈 등록 여부가 결정된다.

#### 2.2.2 자동 설정 만들기
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-developing-auto-configuration

- 모듈(프로젝트)
	- xxx-spring-boot-Autoconfigure : 자동 설정 관련
	- xxx-spring-boot-starter : 필요한 의존성 정의
- 하나의 모듈로 만들고 싶을 때는? 
	- xxx-spring-boot-starter로 만든다.  
	<br>
- 구현 방법
	1. 프로젝트 생성
		- groupId : me.hoonti06
		- artifactId : hoon-spring-boot-starter  
		<br>
		- pom.xml에 아래와 같은 설정이 되어있다.  
		  
			```xml  
			<groupId>me.hoonti06</groupId>
			<artifactId>hoon-spring-boot-starter</artifactId>
			<version>0.0.1-SNAPSHOT</version>
			```  
			<br>
	2. 의존성 추가  
	   아래의 xml 코드를 pom.xml에 추가한다.  
	   
		```xml
		<dependencies>
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-autoconfigure</artifactId>
			</dependency>
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-autoconfigure-processor</artifactId> 
				<optional>true</optional>
			</dependency>
		</dependencies>

		<dependencyManagement>
			<dependencies>
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-dependencies</artifactId>
					<version>2.0.3.RELEASE</version>
					<type>pom</type>
					<scope>import</scope>
				</dependency>
			</dependencies>
		</dependencyManagement>
		```  
		<br>
	3. @Configuration 파일 작성
 
	4. src/main/resource/META-INF/spring.factories 파일에 자동 설정할 파일 이름(3.의 @Configuration 파일)을 명시  
	   (서비스 프로바이더와 비슷한 패턴(?))  
		- SpringbootEnableAutoConfiguration이 켜져 있으면 아래 리스트를 scan하게 된다.  
	   
			```
			org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
			me.hoonti06.HolomanConfiguration
			```  
			<br>
	5. mvn install
		- 로컬 maven 저장소에 설치를 하게 된다.
	 
	6. 1.~5.을 통해 자동 설정을 작성한 프로젝트(1)를 다른 프로젝트(2)에 의존성으로 추가한다.
		- 1.의 xml 코드를 넣어 의존성을 추가하면 된다.
	 
	7. 프로젝트(2)에서 프로젝트(1)에서 생성한 빈을 사용한다.
		- 참고)  
		  프로젝트(1)의 클래스를 프로젝트(2)에서 사용할 때, package의 이름이 동일하면 바로 사용 가능하다.
 
	8. 프로젝트(2)에서 프로젝트(1)의 클래스로 로컬에서 빈을 등록하게 되면 적용이 되지 않고, 프로젝트(2)의 빈으로 등록된다.
		그 이유는 ComponentScan이 먼저 수행되어 로컬에서 먼저 빈을 등록하고 Auto Configuration이 그 다음 수행되어 프로젝트(2)의 빈으로 덮어쓰게 되기 때문이다.(overriding)
		- 참고)  
		  `Spring boot 2.1부터`는 overriding 옵션의 default 설정이 false여서 `에러가 발생`한다. 
		  src/main/resources/application.properties(또는 application.yml)에 'spring.main.allow-bean-definition-overriding: true' 옵션을 추가하면 된다.

<br>

- 덮어쓰기 방지
	- @ConditionalOnMissingBean (동일한 이름의 Bean이 등록 안 되어 있을 때만 해당 Bean을 등록한다는 의미)  
<br>
- 빈 재정의(redefinition)에 대한 수고 덜기
	- src/main/resources/application.properties에 property 값들을 설정한다.
		- e.g.  
		  holoman : prefix
		  
		  ```
		  holoman.name = helloman  
		  holoman.howLong = 5
		  ```  
		  <br>
	- HolomanProperties class에 @ConfigurationProperties("holoman")를 설정한다. ('holoman'이라는 prefix를 설정)
		- 해당 애노테이션을 사용하기 위해서는 spring-boot-configuration-processor 의존성을 추가해야 한다.  
	
			```xml
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-configuration-processor</artifactId>
				<optional>true</optional>
			</dependency>
			```  
			<br>
	- HolomanConfiguration class에 @EnableConfigurationProperties(HolomanProperties.class)를 설정하고,  
	  HolomanProperties instance를 통해 Holoman instance의 값을 초기화한다.
	  
	- 프로퍼티(application.properties)에 설정된 key값을 통해 자동 설정이 된다.


### 2.3 내장 서블릿 컨테이너

#### 2.3.1
- 스프링 부트는 서버가 아닌, Tool이다.(tomcat, netty 등이 서버에 해당한다.)
	- 아래 코드처럼 tomcat을 직접 실행할 수 있다.  
	  
		```{.java .numberLines}
		public class Application {
			public static void main(String[] args) throws LifecycleException {
				Tomcat tomcat = new Tomcat(); // 톰캣 객체 생성
				tomcat.setPort(8080); // 포트 설정			

				COntext context = tomcat.addContext("/", "/"); // 톰캣에 컨텍스트 추가

				// 서블릿 만들기
				HttpServlet servlet = new HttpServlet() {	
					@Override
					protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
						PrintWrite writer = resp.getWriter();
						writer.println("<html><head><title>");
						writer.println("Hey, Tomcat");
						writer.println("</title>");
						writer.println("<body><h1>Hello Tomat</h1></body>");
						writer.println("</html>");
					}
				};

				string servletName = "helloServlet";
				tomcat.addServlet("/", servletName, servlet); // 톰캣에 서블릿 추가
				context.addServletMappingDecoded("/hello", servletName); // 컨텍스트에 서블릿 매핑

				// 톰캣 실행 및 대기
				tomcat.start();
				tomcat.getServer().await();
			}
		}
		```  
		<br>
	- 위 Java 코드의 과정들을 상세하고 유연하게 설정하고 실행해주는 것이 바로 Spring boot의 자동 설정  
	  (spring-boot-autoconfigure의 spring.factories에 등록되어 있다.)
		- SevletWebServerFactoryAutoConfiguration (서블릿 웹 서버(컨테이너) 생성)
			- TomcatServletWebServerFatoryCustomizer (서버 커스터마이징)
		- DispatcherServletAutoConfiguration
			- (Dispatcher) 서블릿을 만들고 등록
		- 참고)
		  '서블릿 웹 서버(컨테이너)를 생성하는 일'과 '서블릿을 생성하고 등록하는 일'이 분리되어 있다.  
		  서블릿은 바뀌지 않지만 컨테이너는 설정에 따라 달라질 수 있기 때문이다.

#### 2.3.2 응용
- 다른 서블릿 컨테이너로 변경
	- Default 설정인 Tomcat을 빼고 Jetty를 적용할 수 있다. ([참고 Document](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-embedded-web-servers))  
	  
		```xml
		<properties>
			<servlet-api.version>3.1.0</servlet-api.version>
		</properties>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
			<exclusions>
				<!-- Exclude the Tomcat dependency -->
				<exclusion>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-tomcat</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
		<!-- Use Jetty instead -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-jetty</artifactId>
		</dependency>
		```  
		<br>
- 웹 서버 사용하지 않기 
	- application.properties에 'spring.main.-application-type=none'을 설정한다.

- 포트 
	- server.port 
		- application.properties에 'server.port=7070'을 설정한다.
		- relaxed binding을 통해 Environment 값 'SERVER_PORT'로 설정할 수 있다.
	- 랜덤 포트 
		- application.properties에 'server.port=0'을 설정한다.
	- Application에서 포트 번호를 알 수 있는 방법
		- ApplicationListener\<ServletWebServerInitializedEvent\>  
		  
			```java
			@Component
			public class PortListener implements ApplicationListener<ServletWebServerInitializedEvent> {
				@Override
				public void onApplicationEvent(ServletWebServerInitializedEvent event)
					ServletWebServerApplicationContext appContext = even;
					System.out.println(appContext.getWebServer().getPort());
			}
			```  
			<br>
- HTTPS 설정하기 ([생활 코딩 참고 자료](https://gist.github.com/keesun/f93f0b83d7232137283450e08a53c4fd))
	- keystore(인증서) 생성 ([출처](https://gist.github.com/keesun/f93f0b83d7232137283450e08a53c4fd))  
	  
		```sh
		$ keytool -genkey 
			-alias tomcat 
			-storetype PKCS12 
			-keyalg RSA 
			-keysize 2048 
			-keystore keystore.p12 
			-validity 4000
		```  
		<br>
	- application.properteis 설정 ([출처](https://gist.github.com/keesun/f93f0b83d7232137283450e08a53c4fd))

		```
		server.ssl.key-store=keystore.p12
		server.ssl.key-store-type=PKCS12
		server.ssl.key-store-password=123456
		server.ssl.key-alias=spring
		```  
		<br>
	- HTTP는 못 쓰게 된다. ([참고 Document](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-configure-ssl))
		- Spring boot는 기본적으로 커넥터가 하나만 등록이 되어서 HTTP 커넥터와 HTTPS 커넥터를 동시에 사용할 수 없다. 
		  HTTPS로 설정하면 모든 요청을 HTTPS로 해야 한다.
		- 커넥터를 둘 다 쓰려면 properties에 HTTPS 커넥터를 등록하고, HTTP는 코드로(프로그래밍적으로) 구현하는 방법을 추천한다. ([예제 코드](https://github.com/spring-projects/spring-boot/tree/v2.0.3.RELEASE/spring-boot-samples/spring-boot-sample-tomcat-multi-connectors))
		 
	- https://로 접근하면 공인된 인증서가 아니여서 브라우저가 Not Secure라는 Warning 문구를 띄운다.  
	  <br>
- HTTP2 설정 
	- SSL이 기본적으로 적용되어 있어야 한다.
	- properties에 'server.http2.enabled=true'를 설정한다.
	- 참고)  
	  사용하는 서블릿 컨테이너마다 설정의 차이가 있다.


## footnotes
[^1]: spring-boot-autoconfigure/META-INF/spring.factories
