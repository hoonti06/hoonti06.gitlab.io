---
layout    : wiki
title     : 더 자바, 코드를 조작하는 다양한 방법
summary   : 
date      : 2020-02-22 09:48:16 +0900
updated   : 2020-03-08 23:29:21 +0900
tag       : java
public    : true
published : true
parent    : 
latex     : false
---

## 1. JVM의 이해

### 1.1 

{% ditaa -T -E %}
+-----------------------------------+
|                JDK                |
|                                   |
| +--------------+ +--------------+ |
| |     JRE      | |   Dev Tool   | |
| | cGRE         | |              | |
| | +----------+ | | appletviewer | |
| | |   JVM    | | | apt          | |
| | |cGRE      | | | extcheck     | |
| | +----------+ | | javadoc      | |
| |              | | jar          | |
| | +----------+ | | javap        | |
| | | Library  | | | jconsole     | |
| | |cGRE      | | | ...          | |
| | +----------+ | |cYEL          | |
| +--------------+ +--------------+ |
+-----------------------------------+
{% endditaa %}

- JVM(JAVA Virtual Machine)
	- 자바 가상 머신으로 자바 바이트 코드(.class 파일)를 OS에 특화된 코드로 변환(interpreter와 JIT Compiler)하여 실행한다. 
	- 바이트 코드를 실행하는 표준(JVM 자체는 표준)이자 구현체(특정 밴더가 구현한 JVM)다. 
	- [JVM 스팩](https://docs.oracle.com/javase/specs/jvms/se11/html/)
	- JVM 밴더: 오라클, 아마존, Azul, ... 
	- 특정 플랫폼에 종속적
- JRE(Java Runtime Environment) : JVM + Library
	- 자바 애플리케이션을 실행할 수 있도록 구성된 배포판. 
	- JVM과 핵심 라이브러리 및 자바 런타임 환경에서 사용하는 프로퍼티 세팅이나 리소스 파일을 가지고 있다. 
	- 개발 관련 도구는 포함하지 않는다. (그건 JDK에서 제공) 
	  
- JDK (Java Development Kit): JRE + 개발 Tool
	- JRE + 개발에 필요할 Tool
	- 소스 코드를 작성할 때 사용하는 자바 언어는 플랫폼에 독립적. 
	- 오라클은 자바 11부터는 JDK만 제공하며 JRE를 따로 제공하지 않는다. 
	- Write Once Run Anywhere 
		 
		  
- 자바 
	- 프로그래밍 언어 
	- JDK에 들어있는 자바 컴파일러(javac)를 사용하여 바이트코드(.class 파일)로 컴파일할 수 있다. 
	- 자바 유료화? 
		- 오라클에서 만든 Oracle JDK 11 버전부터 상용으로 사용할 때 유료 
		- [참고 자료](https://medium.com/@javachampions/java-is-still-free-c02aef8c9e04)
				  
- JVM 언어 
	- JVM 기반으로 동작하는 프로그래밍 언어 
	- **Kotlin**, 클로저, 그루비, JRuby, Jython, Scala, ... 
	  
- 참고)
	- [JIT 컴파일러](https://aboullaite.me/understanding-jit-compiler-just-in-time-compiler/)
	- [JDK, JRE 그리고 JVM](https://howtodoinjava.com/java/basics/jdk-jre-jvm/)
	- [JVM 언어 목록](https://en.wikipedia.org/wiki/List_of_JVM_languages)

### 1.2 JVM의 구조

{% ditaa -T -E %}
+------------------------------------+
|        Class Loader System         |
|+-------+ +-------+ +--------------+|
||Loading| |linking| |initialization||
|+-------+ +-------+ +--------------+|
+----------------+-------------------+
                 |
                 \-------\
                         |
+------------------------+------------------------+
|                      Memory                     |
|+-----+ +--------+ +------------+ +----+ +------+|
||stack| |   PC   | |  natiave   | |heap| |method||
||     | |register| |method stack| |    | |      ||
|+-----+ +--------+ +------------+ +----+ +------+|
+------------------------+------------------------+
                         |
                  /------+------------------\
                  |                         |
+-----------------+------------------+ +----+----+ +-------+
|         Execution Engine           | |         | |       |
|+-----------+ +--------+ +---------+| | native  | |native |
||interpreter| |  JIT   | |Garbage  ||-+ method  +-+method |
||           | |Compiler| |Collector|| |interface| |library|
|+-----------+ +--------+ +---------+| |         | |       |
+------------------------------------+ +---------+ +-------+
{% endditaa %}

- 클래스 로더 시스템
	- .class 파일에서 바이트 코드를 읽고 메모리에 저장
	- 로딩 : 클래스 읽어오는 과정
	- 링크 : 레퍼런스를 연결하는 과정
	- 초기화 : static 값들 초기화 및 변수에 할당
- 메모리
	- 메소드 : 클래스 수준의 정보(클래스 이름, 부모 클래스 이름, 메소드, 변수 등) 저장. 공유 자원이다.
	- 힙 : 객체를 저장. 공유 자원이다.
	- 스택 : 쓰레드마다 런타임 스택을 만들고, 그 안에 메소드 호출을 스택 프레임이라 부르는 블록으로 쌓는다. 쓰레드가 종료되면 런타임 스택도 사라진다.
	- [PC(Program Counter) 레지스터](https://javapapers.com/core-java/java-jvm-run-time-data-areas/#Program_Counter_PC_ Register ) : 쓰레드마다 쓰레드 내 현재 실행할 스택 프레임을 가리키는 포인터가 생성된다.
	- 네이티브 메소드 스택
- 실행 엔진(Execution Engine)
	- 인터프리터 : 바이트 코드를 한줄씩 실행
	- JIT 컴파일러 : 인터프리터 효율을 높이기 위해 인터프리터가 반복되는 코드를 발견하면 JIT 컴파일러가 반복되는 코드를 모두 네이티브 코드로 바꿔둔다. 그 다음부터 인터프리터는 네이티브 코드로 컴파일된 코드를 바로 사용한다.
	- GC(Garbage Collector) : 더 이상 참조되지 않는 객체를 모아서 정리한다.
		- STW(Stop-The-World) : GC를 실행하기 위해 JVM이 애플리케이션 실행을 멈추는 것
		- Thoroughput GC

- JNI(Java Native Interface)
	- 자바 애플리케이션에서 C, C++, 어셈블리로 작성된 함수를 사용할수 있는 방법을 제공
	- Native 키워드를 사용한 메소드 호출
	- [예제](https://medium.com/@bschlining/a-simple-java-native-interface-jni-example-in-java-and- scala-68fdafe76f5f)
- 네이티브 메소드 라이브러리
	- C, C++로 작성된 라이브러리

#### 1.2.1 클래스 로더
{% ditaa -T -E %}
+----------------------------------------------------+
|                Class Loader System                 |
|+--------------+  +--------------+  +--------------+|
||   loading    |  |   linking    |  |initialization||
||              |  |              |  |              ||
||+------------+|  |+------------+|  |              ||
||| Bootstrap  ||  ||   verify   ||  |              ||
||+-----+------+|  |+-----+------+|  |              ||
||      |       |  |      |       |  |              ||
||      v       +->|      v       +->|              || 
||+------------+|  |+------------+|  |              ||
||| extension  ||  ||  Prepare   ||  |              ||
||+-----+------+|  |+-----+------+|  |              ||
||      |       |  |      |       |  |              ||
||      v       |  |      v       |  |              ||
||+------------+|  |+------------+|  |              ||
|||Application ||  ||  Resolve   ||  |              ||
||+------------+|  |+------------+|  |              ||
|+--------------+  +--------------+  +--------------+|
+----------------------------------------------------+
{% endditaa %}

- 클래스 로더 
	- 로딩, 링크, 초기화 순으로 진행된다. 
	- 로딩 
		- 클래스 로더가 .class 파일을 읽고 그 내용에 따라 적절한 바이너리 데이터를 만들고 "메소드" 영역에 저장. 
		- 이때 메소드 영역에 저장하는 데이터 
			- FQCN(Fully Qualified Class Name)
			- class | interface | enum 
			- 메소드와 변수 
		- 로딩이 끝나면 해당 클래스 타입의 Class 객체를 생성하여 “힙" 영역에 저장. 
	- 링크 
		- Verify, Prepare, Reolve(optional) 3단계로 나눠져 있다. 
		- Verify : .class 파일 형식이 유효한지 체크한다. 
		- Prepare : 클래스 변수(static 변수)와 기본값에 필요한 메모리 
		- Resolve : 심볼릭 메모리 레퍼런스를 메소드 영역에 있는 실제 레퍼런스로 교체한다. 
	- 초기화 
		- Static 변수의 값을 할당한다. (static 블럭이 있다면 이때 실행된다.) 
	- 클래스 로더는 계층 구조로 이뤄져 있으며 기본적으로 3가지 클래스 로더가 제공된다. 
		- 부트스트랩 클래스로더 : JAVA_HOME/lib에 있는 코어 자바 API를 제공한다. 최상위 우선순위를 가진 클래스 로더 
		- 플랫폼 클래스로더 : JAVA_HOME/lib/ext 폴더 또는 java.ext.dirs 시스템 변수에 해당하는 위치에 있는 클래스를 읽는다. 
		- 애플리케이션 클래스로더 : 애플리케이션 classpath(애플리케이션 실행할 때 주는 -classpath 옵션 또는 java.class.path 환경 변수의 값에 해당하는 위치)에서 클래스를 읽는다.

## 2. 바이트 코드 조작

### 2.1 코드 커버리지

- 코드 커버리지 : 테스트 코드가 확인한 소스 코드를 %로 나타낸 수치
	- jaCoCo
	- https://www.eclemma.org/jacoco/trunk/doc/index.html 
	- http://www.semdesigns.com/Company/Publications/TestCoverage.pdf  
	  <br>
		```xml
		<plugin> 
			<groupId>org.jacoco</groupId> 
			<artifactId>jacoco-maven-plugin</artifactId> 
			<version>0.8.4</version> 
			<executions> 
				<execution> 
					<goals> 
						<goal>prepare-agent</goal> 
					</goals> 
				</execution> 
				<execution> 
					<id>report</id> 
					<phase>prepare-package</phase> 
					<goals> 
						<goal>report</goal> 
					</goals> 
				</execution> 
			</executions> 
		</plugin>
		```
		
		```bash
		mvn clean verify
		```
		
		커버리지 만족 못할 시 빌드 실패하도록 설정
		```xml
		<plugin> 
			<groupId>org.jacoco</groupId> 
			<artifactId>jacoco-maven-plugin</artifactId> 
			<version>0.8.4</version> 
			<executions> 
				<execution> 
					<goals> 
						<goal>prepare-agent</goal> 
					</goals> 
				</execution> 
				<execution> 
					<id>report</id> 
					<phase>prepare-package</phase> 
					<goals> 
						<goal>report</goal> 
					</goals> 
				</execution> 
				<execution> 
					<id>jacoco-check</id> 
					<goals> 
						<goal>check</goal> 
					</goals> 
					<configuration> 
						<rules> 
							<rule> 
								<element>PACKAGE</element> 
								<limits> 
									<limit> 
										<counter>LINE</counter> 
										<value>COVEREDRATIO</value> 
										<minimum>0.50</minimum> 
									</limit> 
								</limits> 
							</rule> 
						</rules> 
					</configuration> 
				</execution> 
			</executions> 
		</plugin>
		```
		
### 2.2 바이트 코드 조작 라이브러리

- [ASM](https://asm.ow2.io/) : visitor 패턴과 Adapter 패턴을 알아야 하고, 사용하기 어려움
- [Javassist](https://www.javassist.org/)
- **[Bytebuddy](https://bytebuddy.net/#/)** : api, guide 쉽게 잘 되어 있음. 추천
 
### 2.3 javaagent
- javaagent


### 2.4 정리
- 바이트 코드 조작 툴의 활용 예
	- 프로그램 분석
		- 코드에서 버그 찾는 툴
		- 코드 복잡도 계산
	- 클래스 파일 생성
		- 프록시
		- 특정 API 호출 접근 제한
		- 스칼라 같은 언어의 컴파일러
	- 그 밖에도 자바 소스 코드를 건드리지 않고 코드 변경이 필요한 경우
		- 프로파일러
		- 최적화
		- 로깅
		- ...
- 스프링이 컴포넌트 스캔하는 방법
- 빈으로 등록할 후보 클래스 정보를 찾는데 사용
- ClassPathScanningCandidateComponentProvider -> SimpleMetadataReader
- ClassReader와 Visitor를 사용해서 클래스에 있는 메타 정보를 읽어온다.
- 
- simple metadatareader가 class reader와 visitor 구현체를 사용해서 class와 메소드에 붙어있는 애노테이션을 추출한다. 이때  ASM을 사용한다.
- classPathscaningcand compprovider가 Asm을 사용하고 있다.
- class reader도 Asm을 사용한다.
- 참고)
	- https://www.youtube.com/watch?v=39kdr1mNZ_s
	- ASM, Jvassist, ByteBuddy, CGlib
	- 프록시는 하기의 기능에 사용되고 있다.
		- Spring AOP
		- 하이버네이트 레이지 로딩 객체
		- mock

## 3. Reflection


### 3.1 Reflection API

- 리플렉션의 시작은 Class<T>
	- https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html
- Class<T>에 접근하는 방법
	- 모든 클래스를 로딩한 다음 Class<T>의 인스턴스가 생긴다. "타입.class"로 접근할 수 있다.
		- Class<Book> bookClass = Book.class;
	- 모든 인스턴스는 getClass() 메소드를 가지고 있다. "인스턴스.getClass()"로 접근할 수 있다.
		- Class<? extends Book> bookClass = book.getClass();
	- 클래스를 문자열로 읽어오는 방법
		- Class.forName("FQCN")
		- classpath에 해당 클래스가 없다면 ClassNotFoundException 발생
			- Class<?> aClass1 = Class.forName("me.hoonti06.Book");

- Class<T>를 통해 할 수 있는 것
	- 필드(목록) 가져오기 (getFields(), getDeclaredFields())
	- 메소드(목록) 가져오기 (getMethod())
	- 상위 클래스 가져오기 (getSuperClass())
	- 인터페이스(목록) 가져오기 (getInterfaces())
	- 애노테이션 가져오기
	- 생성자 가져오기
	- ...

### 3.2 정리 및 활용

- 리플렉션 사용 시 주의할 것
	- 지나친 사용은 성능 이슈를 야기할 수 있다. 반드시 필요한 경우에만 사용할 것
	- 컴파일 타임에는 확인되지 않고 런타임 시에만 발생하는 문제를 만들 가능성이 있다.
	- 접근 지시자를 무시할 수 있다.
- 스프링
	- 의존성 주입
	- MVC뷰에서 넘어온 데이터를 객체에 바인딩할 때
- 하이버네이트
	- @Entity 클래스에 Setter가 없다면 리플렉션을 사용한다.
- JUnit
	- https://junit.org
- 참고
	- 
## 4. Dinamic Proxy

- 다이나믹 프록시는 reflect의 일부
 
### 4.1 JPA

- 스프링 데이터 JPA의 동작 방법
	- 스프링 데이터 JPA에서 인터페이스 타입의 인스턴스는 누가 만들어주는 것인가?
		- Spring AOP를 기반으로 동작하며 RepositoryFactorySupport에서 프록시를 생성한다.



