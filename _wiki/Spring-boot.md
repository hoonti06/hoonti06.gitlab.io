---
layout    : wiki
title     : Spring boot
summary   : 
date      : 2020-01-27 12:31:49 +0900
updated   : 2020-01-31 13:36:09 +0900
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
	- 소스 코드 (src\main\java)
	- 소스 리소스 (src\main\resource)
	- 테스트 코드 (src\test\java)
	- 테스트 리소스 (src\test\resource)
 
- main application 위치
	- 기본 페키지(default package)
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

- 버전 관리 안 해주는 의존성 추가  
의도치 않은 version이 들어올 수 있기 때문에 version을 명시해주는 것이 좋다.  

	```xml  
	<dependency>
		<groupId>org.modelmapper.boot</groupId>
		<artifactId>modelmapper</artifactId>
		<version>2.1.0</version>
	</dependency>
	```

	[https://mvnrepository.com](https://mvnrepository.com) 참고  


- 기존 의존성 버전 변경하기  
spring-boot-dependencies나 spring-boot-start-parent의 \<properties\>를 current project에서 다른 버전으로 overriding할 수 있다. 


### 2.2 자동 설정

#### 2.2.1 개요
- @EnableAutoConfiguration (@SpringBootApplication 안에 포함되어 있음)
	- 이 Annotation으로 인하여 application 실행 시 자동으로 tomcat이 뜨고, 이런 거 저런 거가 되는거다.
	- 빈을 한 번 더 읽는다.
- 빈은 사실 두 단계로 나뉘어서 읽힌다.
	- 1단계 : @ComponentScan
	- 2단계 : @EnableAutoConfiguration
- @ComponentScan
	- 해당 애노테이션이 포함되어 있는 package에서 그 하위에 있는 모든 빈을 scan한다. (같은 또는 상위 레벨에 있는 package는 포함되지 않는다.)
	- @Configuration @Repository @Service @Controller @RestController
- @EnableAutoConfiguration
	- spring.factories[^1]
		- org.springframework.boot.autoconfigure.EnableAutoConfiguration : 이 항목 하위에 명시되어 있는 모든 목록에 대해 자동으로 빈 등록을 시도한다.(그 모든 목록에 가보면 @Configuration이 명시되어 있다.) 하지만, 각 목록에서 @ConditionalOnXxxYyyZzz 애노테이션에 따라 빈 등록 여부가 결정된다.

#### 2.2.2 자동 설정 만들기
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-developing-auto-configuration

- 모듈(프로젝트)
	- xxx-spring-boot-Autoconfigure : 자동 설정 관련
	- xxx-spring-boot-starter : 필요한 의존성 정의
- 하나로 만들고 싶을 때는? 프로젝트의 artifactId를 xxx-spring-boot-starter로 만든다.
- 구현 방법
	1. 프로젝트 생성
		- groupId : me.hoonti06
		- artifactId : hoon-spring-boot-starter
		- pom.xml에 아래와 같은 설정이 되어있다.  
		  
			```xml  
			<groupId>me.hoonti06</groupId>
			<artifactId>hoon-spring-boot-starter</artifactId>
			<version>0.0.1-SNAPSHOT</version>
			```  

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
 
	4. src/main/resource/META-INF에 spring.factories 파일 생성 (서비스 프로바이더??)
	 
	5. spring.factories 안에 자동 설정할 파일(2.의 @Configuration 파일)을 명시
		- org.springframework.boot.autoconfigure.EnableAutoConfiguration=\\  
		  me.hoonti06.HolomanConfiguration
	6. mvn install
	 
	7. 1~6을 통해 자동 설정을 작성한 프로젝트(1)를 다른 프로젝트(2)에 의존성으로 추가한다.
	 
	8. 프로젝트(2)에서 프로젝트(1)의 빈을 사용한다.
 
	9. 프로젝트(2)에서 프로젝트(1)의 클래스를 사용하여 로컬에서 빈을 등록하게 되면 적용이 되지 않는다.  
		그 이유는 ComponentScan이 먼저 수행되어 로컬에서 먼저 빈을 등록하고 Auto Configuration이 그 다음 수행되어 프로젝트(2)의 빈으로 덮어쓰게 되기 때문이다.  
<br><br>
  
- 덮어쓰기 방지
	- @ConditionalOnMissingBean  
<br>
- 빈 재정의에 대한 수고 덜기
	- resource에 application.properties 파일을 생성한다.
	- application.properties에 property 값들을 설정한다.
	- @ConfigurationProperties("holoman") // class 이름
	- @EnableConfigurationProperties(HolomanProperties) // properties class 이름
	- 프로퍼티 키값 자동 완성

```xml
<dependency>
	<groupId> org.springframework.boot </groupId>
	<artifactId> spring-boot-configuration-processor </artifactId>
	<optional> true </optional>
</dependency>
```











### 2.3 내장 서블릿 컨테이너




## footnotes
[^1]: spring-boot-autoconfigure/META-INF/spring.factories
