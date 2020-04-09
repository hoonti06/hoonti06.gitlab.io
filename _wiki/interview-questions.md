---
layout    : wiki
title     : 면접 질문
summary   : 
date      : 2020-03-26 09:25:56 +0900
updated   : 2020-04-09 21:37:16 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
## 1. 프로그래밍 언어

- 객체 지향 프로그래밍(Object Oriented Programming, OOP, 객체 '위주')
	- 정의 : 상태(데이터, 변수)와 행위(데이터 처리, 메소드)를 묶어 객체를 만들고 객체들의 상호작용으로 프로그램을 구현하는 방식
	- 언어 : Java, C++, C#
	- 특징 : 캡슐화, 상속, 다형성
	- 장점 : 모듈화되어 있기 때문에 코드의 재사용, 유지보수가 용이
	- 단점 : 설계의 어려움, 캡슐화 등으로 처리 속도가 상대적으로 느리다.
	- 참고)
		- 클래스(Class) : 변수와 메소드의 집합. 설계도 또는 틀.
		- 객체(Object) : 코드 상에서 자료형이 임의의 클래스로 선언된 식별자를 말한다.
		- 인스턴스(Instance) : 메모리에 할당된 객체를 말한다.
		
		```{.java .numberLines}
		/* 클래스 */
		public class Car {
		  ...
		}
		/* 객체와 인스턴스 */
		public class Main {
			public static void main(String[] args) {
				Car truck, fireEngine; // '객체'

				// 인스턴스화
				truck = new Car(); // Car 클래스의 '인스턴스'(객체를 메모리에 할당)
				fireEngine = new Car(); // Car 클래스의 '인스턴스'(객체를 메모리에 할당)
			}
		}
		```

- 절차 지향 프로그래밍(Procedural Programming)
	- 정의 : 일이 진행되는 순서대로 프로그램을 구현하는 방식
	- 언어 : C, Pascal
	- 장점 : 컴퓨터의 처리구조와 비슷해 실행 속도가 빠르다.
	- 단점 : 프로그래밍 과정 하나하나 코드로 작성해야 하기 때문에 프로그램 분석 및 유지보수가 어렵다.
 
 
- 함수형 프로그래밍
	- 정의 : 상태값을 갖지 않는 함수 값들의 연속으로 프로그램을 구현하는 방식
	- 언어 : LISP, Clojure, Haskell(순수 함수형 언어)
	- 장점 : 프로그램의 실행에 영향을 미치는 Side effect를 미연에 방지. 테스트 용이. 객체 지향보다 코드가 간결. 자료형에 구애 받지 않는다.
	- 단점 : 상태를 조작할 수 없다.
	- 참고)
		- 순수 함수
			- 동일한 입력에는 항상 같은 값이 나와야 한다.
			- 외부의 상태를 변경하지 않기 때문에 평가 시점이 중요하지 않다.(비절차형)
			- 함수의 실행은 프로그램의 실행에 영향을 미치는 Side dffect가 없어야 한다.
			  (e.g> 함수 내부에서 인자의 값이나 프로그램의 상태 등을 변경하는 것)


- 캡슐화(Encapsulation)
	- 변수와 함수(메소드)를 하나의 단위로 묶는 것(데이터의 번들링). 보통 클래스를 통해 구현
	- 모듈화 향상, 인터페이스 간결
	- 정보 은닉(Information hiding)
		- 내부 구현을 숨겨 모듈 내의 응집도를 높이고, 모듈간의 결합도를 낮춰 유연성과 유지보수성을 높인다.
		- 정보 은닉은 캡슐화로부터 파생된 보조 개념(캡슐화 != 정보 은닉)
 
 
- 상속(Inheritance)
	- 상위 클래스의 특성과 기능을 이용하거나 확장할 수 있다.
	- 같은 타입으로 묶을 수 있다.
	- 캡슐화를 유지하면서도 클래스의 재사용 용이


- 다형성(Polymorphism)
	- 하나의 변수, 또는 함수(메소드)가 상황에 따라 다르게 해석되는 것
	- 장점
		- 하나의 타입으로 관리할 수 있다.
		- 메소드의 활용 범위를 넓힐 수 있다.
	- 서브타입 다형성
		- 기초 클래스 또는 인터페이스를 구현하는 상위 클래스를 생성하고 해당 클래스를 상속받는 다수의 하위 클래스들을 만들어 상위 클래스의 포인터나 참조 변수 등이 하위 클래스의 객체를 참조하는 것
		- 상위 클래스의 메소드 위에 하위 클래스의 메소드를 덮어쓰는 오버라이딩을 통해 상위 클래스의 참조 변수가 참조하는 하위 클래스의 메소드가 호출된다.
	- 매개변수 다형성
		- 타입을 매개변수로 받아 새로운 타입을 되돌려주는 기능
		- C++의 템플릿(Template), Java의 제네릭(Generic)
	- 임시 다형성
		- 함수 오버로딩 : 매개변수가 다른 동일한 이름의 함수를 여러 개 생성하는 것. 본질적으로는 같다.
		- 연산자 오버로딩 : 기본 연산자가 수행되는 클래스에 따라 다르게 동작하도록 하는 것. C++, C#에서 제공
	- 강제 다형성
		- 묵시적 형 변환 : 손실이 적은 방향인 작은 자료형에서 큰 자료형으로 이루어진다.
		- 명시적 형 변환 : 원하는 형태를 명시하여 형을 변환할 수 있다.


- 추상화
	- 핵심적인 개념 또는 기능 등을 간추려 내는 것
	- 클래스간의 공통점을 찾아서 공통의 조상을 만드는 작업(구체화 : 상속을 통해 클래스를 구현, 확장하는 작업)
	- 추상 클래스, 추상 메소드
 
- java
	- 'Write once run anywhere'
	- OS로부터 독립적(JVM)
	- JVM
	- JDK
	- 데이터 타입
		- 기본형(primitive type) 8개
			- boolean, char, byte, short, int, long, float, double
			- Call by value
		- 참조형(reference type)
			- 기본형 외의 모든 타입(String, Class, Interface, Array 등)
			- Call by reference
	- static
		- 클래스 메소드 : 인스턴스 없이 호출 가능한 함수
		- 클래스 변수 : 해당 클래스의 모든 인스턴스가 공유하는 변수
	- 추상 클래스
		- 추상클래스 abstract로 정의된 클래스 (추상 메소드가 0개 또는 하나 이상)
		- 멤버 변수, 멤버 함수 가질 수 있다.
		- 템플릿 메소드 패턴
	- 인터페이스
		- 구현할 클래스의 뼈대, 특정 메소드를 구현하도록 강제
		- 멤버 변수, 멤버 함수를 가질 수 없고, default, static, abstract 메소드를 가질 수 있음
		- 여러 클래스의 사용 방법이 같음을 보장 -> 하나의 규약, 협업
		- default 메소드 vs static 메소드
			- default 메소드는 객체로 호출
			- default 메소드는 overriding 가능
			- static은 ClassName.MethodName()으로 호출

	- 추상 클래스 vs 인터페이스
		- 추상클래스 abstract로 정의된 클래스 (추상 메소드가 0개 또는 하나 이상)
		- 근본적인 차이점은 사용 목적
			- 클래스는 기본적으로 상속을 통해 기능을 확장하려는 목적(부모 클래스가 자식 클래스를 포함하는 관계)
			- 인터페이스는 해당 인터페이스를 구현한 객체들에 대해 동일한 동작을 약속하게 하기 위함
		- 인터페이스는 클래스의 단일 상속을 보완하기 위해 존재하는 것이 아님.
		- 인터페이스는 상속 관계와 같은 깊은 관계성이 없는 클래스들끼리 묶을 때 사용될 수 있다.


	- Generics(제네릭스) : 컬렉션 클래스에 한 종류의 타입을 사용하게끔 지정함. 형변환의 번거로움을 줄인다.
		- 타입 안정성을 제공 ( 의도하지 않은 타입의 저장을 막음, 저장된 객체를 꺼내올 때 타입과 다른 타입으로 형변환 되어 발생하는 오류를 줄임)
		- 타입체크와 형변환을 생략하므로 코드가 간결
	- 쓰레드의 구현
		- Runnable 인터페이스를 구현. // 또는 Thread 클래스 상속
		ex) Runnable r = new ThreadEx();
		Thread t = new Thread(r);
		t.start();

		class ThreadEx implements Runnable { 
			public void run(){ 
				... 
			} 
		}
	- java 콜렉션 대표 인터페이스 3개
 
	- 접근제어자 종류 특성 설명
		- public : 모든 클래스에서 접근 가능
		- protected : 동일 패키지 또는 외부 패키지의 해당 클래스를 상속 받은 클래스
		- default : 패키지 내에서만 접근 가능
		- private : 해당 클래스에서만 접근 가능

	- toString 메소드 : 인스턴스에 대한 정보를 문자열로 제공하기 위한 목적으로 정의됨. 인스턴스를 출력하게되면 toString이 콜됨.
	- String과 StringBuffer의 차이
	- wait(), notify()
	- 'final' keyword
		- class : 상속 X
		- method : overriding X
		- variable : update X (C언어의 const)



- 생성자
- java vs C++
- C vs C++
 
- volatile
	- 컴파일러는 해당 변수를 최적화에서 제외하여 항상 메모리에 접근하도록 한다.
 
- 에러와 예외 차이
- 예외 Exception- try, catch, finally( 예외에 관계없이 항상 마지막에 수행 ) : 프로그램 실행 시 발생할 수 있는 예외의 발생에 대비한 코드를 작성, 비정상적인 종료를 막음.
- Throw : 예외를 발생시키는 키워드.
 
- 동적 로딩(dynamic loading)
	- 실행 도중 그때 그때 필요한 클래스만 로딩하여 사용
 
- Wrapper 클래스
	- primitive type 변수를 객체로 다루기 위한 클래스

- 내부 클래스(Inner class)
	- 클래스 안에 클래스를 선언한 것.
	- 내부 클래스에서 외부 클래스의 멤버들을 쉽게 접근 가능
	- 코드의 복잡성을 줄인다.(캡슐화)

- 익명 클래스(Anonymous class) 
	- 클래스의 선언과 동시에 단 하나의 객체를 생성하는 1회용 클래스
	- GUI 이벤트 처리를 위해 주로 사용


- 컬랙션 클래스 : 백터, 리스트와 같이 많은 데이터를 저장할 수 있는 클래스


- Deep copy vs Shallow Copy
	- Deep copy는 원본과 동일한 값을 갖는 새 객체를 생성하는 것
	- Shallow copy는 단순히 참조만 복사하는 것
 

- Iterator : 컬렉션에 저장된 요소를 읽어들이는 표준화된 방법. Iterator 인터페이스를 이용하여 접근 가능

- 정규식(Regular expression, Regex) : 특정한 규칙을 가진 문자열 집합을 표현하는 데 사용하는 형식 언어



- 이벤트(event) : 사용자 또는 코드를 통해 발생하는 사건

- Adapter 클래스란?
- 애플릿(Applet)이란?
- 직렬화(Serialization)
- 관심사의 분리(Seperation of Concerns)
- 팩토리란?
- Properties : <String, String>값을 저장하는 컬렉션 클래스. 주로 환경설정과 관련된 속성을 저장하는데 사용한다.
- IoC컨테이너란? (Inversion of Control)
- DI(Dependency Injection) 의존관계 주입
- Open-closed 원칙
- Callback
- Proxy(프록시)
- 리플렉션(Reflection)
	- ....실행 중에 객체의 Class에 대한 정보를 얻어오는 것?
- Cross-cutting Concerns란? ( 횡단관심사 )
- AOP란? ( Aspect Oriented Programming) : 관점지향 프로그래밍
- 스프링 @ MVC 장점
- SDK
	- Software Development kit, 소프트웨어 개발 도구 모음
 
- 프레임워크 vs 라이브러리
	- 프레임워크 : 큰 틀을 제공하여 그 틀 안에 맞춰서 코드를 작성해야 한다.
	- 작동할 때 코드 실행 흐름을 보면 프레임워크가 내 코드를 호출
	- 라이브러리느 사용할 수 있는 함수들의 모음, 내가 라이브러리를 호출해서 능동적으로 사용해야 함
- 에코시스템
	- 여러 서브 프로젝트들이 서로 상호작용하면서 하나의 생태계를 꾸린다.
 
 

## 2. WEB
- [[OSI-7layers]]{OSI 7layers}

- [[TCP-IP]]{TCP/IP}
 
- [[TCP-IP]]{TCP vs UDP}
 
- 같은 네트워크
	- 리피터나 스위치 등으로 연결되어 서로 동일한 네트워크 번호를 갖는 host들을 같은 네트워크라고 부를 수 있다.
	- 라우터가 브로드 캐스트 영역(네트워크 영역)을 나누는 역할을 한다.

- 이더넷 vs 토큰링
	- 둘 다 네트워크를 구축하는 방식
	- 이더넷(Ethernet)
		- CSMA/CD 방식
		- 사무실, 학교, PC방 등의 LAN(근거리 통신망) 환경에서 거의 절대 다수를 차지
		- OSI 7layer의 물리 계층(Physical, L1)에서 신호와 배선, 데이터 링크 계층(Data link, L2)에서 MAC 패킷과 프로토콜의 형식을 정의
		- 네트워크를 살펴봐서 아무도 통신하고 있지 않으면 그때 자신의 데이터를 실어 보낸 다음 잘 전송됐는지 확인해보는 방식
		- 만약 동시에 여러 기기가 데이터를 실어보내려 하면 충돌(Collision)이 발생하고 자신이 보내려던 데이터를 임의의(랜덤) 시간을 기다리다 다시 시도한다.
	- 토큰링
		- 한 네트워크에 단 하나의 토큰이 존재하고 토큰을 가진 기기만 네트워크에 데이터를 실어보낼 수 있다.(전송할 데이터가 있더라도 자신의 차례를 기다려야 한다)

- MAC : 물리적 주소
 
- ARP(Address Resolution Protocol)
	- 논리적 주소(IP)를 물리적 주소(MAC)로 대응시키기 위해 사용되는 프로토콜
	- ARP 캐시를 먼저 조회한다.
	- 브로드캐스트로 같은 네트워크 상에 있는 모든 Host에게 메시지를 보낸다.
	- 브로드캐스트는 MAC주소가 자신의 것과 달라도 무조건 Network Layer로 올린다.
	- 수신 IP 주소가 자신과 다르면 무시하고, 자신의 것과 같으면 유니캐스트로 ARP reply를 보낸다.
	- ARP reply에 있는 송신 MAC 주소를 통해 보낼 곳의 MAC 주소를 획득한다.
	- 참고)
		- 같은 네트워크 상에 있으면 보낼 곳의 MAC 주소이지만, 다른 네트워크라면 그 네트워크와 통하는 라우터의 MAC주소이다. 그 라우터에 보낼 곳의 MAC주소가 있거나 아니면 그 다음 라우터의 MAC 주소가 있을 것이다.
 
- NAT(Network Address Translation, 네트워크 주소 변환)
	- Packet을 중계할 때 IP헤더에 기제된 IP 주소와 포트 번호를 바꾸어주는 것
	- 송신자의 IP 주소를 Private(사설) IP에서 Public(공인) IP 주소로 바꿔주고, port 또한 미사용 번호로 적당히 바꿔준다.
	- mapping table에 LAN측 정보(사설 IP와 포트 번호)에 인터넷측 정보(공인 IP와 적당히 바뀐 포트 번호)가 mapping되어 있다.
	- 공인 IP의 수가 부족하여 이를 해결하기 위한 목적

- 유니캐스트 vs 브로드캐스트 vs 멀티캐스트
	- 이더넷의 특성에 따라 유니캐스트나 브로드캐스트 둘 다 모든 host에게 데이터를 전송한다.
	- 유니캐스트는 1대1 통신. 송신측이 수신측의 주소(MAC)를 프레임에 넣어 로컬 네트워크 상에 있는 모든 host에게 보낸다. 모든 host들은 프레임에 들어있는 MAC주소와 자신의 MAC주소를 비교한다. 같으면 위(CPU)로 올리고 다르면 버린다. CPU로 가지 않으니 성능 저하 X
	- 브로드캐스트는 로컬 랜에 붙어있는 모든 네트워크 장비들에게 보내는 통신
	- 브로드캐스트의 수신측 MAC주소는 FFFF.FFFF.FFFF로 정해져 있다. 자신의 MAC주소와 달라도 위(CPU)로 올린다. 인터럽트 발생, 성능 저하
	- 멀티캐스트는 보내고 싶은 그룹 멤버에게만 한 번에 보낼 수 있다. 라아우터나 스위치에서 이 기능을 지원해주어야만 가능하다.
	- 유니캐스트는 자신의 MAC주소가 아니면 버린다. (CPU의 성능 저하가 없다.)
	- 브로드캐스트는 자신의 MAC주소와 다르더라도 위로 올린다. (인터럽트가 걸리기 때문에 CPU의 성능 저하가 존재한다.)
 
- DHCP(Dynamic HOst Configuration Protocol)
	- 같은 네트워크 내에서 host의 IP 주소가 같아선 안된다. 또한 네트워크 별로 동일한 네트워크 번호, 동일한 서브넷 마스크를 가져야 한다. 클러이언트 PC가 켜지면서 네트워크에 브로드캐스트를 보낸다. DHCP 서버는 그 요청을 받고 자신이 관리하는 IP 주소 중 아직 배정되지 않은 하나를 클라이언트에게 전달한다. 요즘은 라우터에서도 이 기능을 제공해준다.
 
- LAN(Local Area Network)
	- 어느 한정된 공간에서 구성된 네트워크
- WAN(Wide Area Network)
	- 멀리 떨어진 곳을 연결하는 네트워크
	
- 리피터 vs 스위치
	- 리피터 : 신호를 증폭하여 중계. Physical Layer
	- 스위치 : MAC 주소를 기억해서 목적지 포트로만 이더넷 프레임을 전송. Data Link Layer
 
- 수신 MAC 주소는 router의 MAC 주소이다.
- router는 다시 다른 네트워크에 브로드캐스트로 다음 router의 MAC주소를 받던지 해당 네트워크에 수신 IP에 해당하는 host가 있으면 해당 host의 MAC주소를 받아오던지 해서 자기 자신이 저장해놓을 것이다.
 
- Circuit switchig vs Packet switching(사실 잘 모르겠음...)
	- Network Layer에서 일어나는 통신 과정의 종류(-> TCP, UDP(Transport Layer)와는 관계가 없다는 얘기임)
	- Packet switching
		- 고정된 경로 X
		- 패킷 단위로 독립적으로 전송
		- 종류
			- virtual Circuit 
				- 데이터 전송 전 논리적 연결(회선) 설정(연결 지향성)
				- 모든 패킷을 전송하면 가상 회선이 해제되고, 패킷들은 순서대로 도착
				- 논리적 연결이기 때문에 점유하는 것이 아니라서 경로의 일부가 공유될 수 있음  
				- e.g> ATM Network, X.25
			- Datagram 
				- 패킷이 독립적으로 전송된다. 이를 데이터 그램이라 한다.
				- 하나의 메시지에서 분할된 여러 패킷은 서로 다른 경로로 전송될 수 있다.(비연결 지향성)
				- 패킷의 전송 순서와 수신 순서가 다를 수 있다.
				- e.g> IP
	- Circuit switching
		- 목적지로 전송하기 전에 먼저 회선을 설정하고 해당 경로를 점유
		- 다시 경로를 찾기 위한 노력 X
		- e.g> 전화망(하지만 전화 네트워크도 Packet switching으로 전환되는 추세)


- [[HTTP]]
	- 클라이언트와 서버 사이에 이루어지는 요청과 응답 프로토콜
	- 특징 : Connectless, Stateless, Cookie, Session, URL
	- method
		- Get : 정보를 요청하기 위해 사용
		- Post : 
	- 접속 단계
		1. 브라우저가 URL의 첫 부분을 해독하고 서버와 접촉
		2. 브라우저가 URL의 나머지 부분(parameter)을 서버에 전달
		3. 서버는 URL을 경로와 자원 이름으로 번역
		4. 서버는 해당 문서를 브라우저에 전송
		5. 서버가 연결을 끊는다
		6. 브라우저가 전송받은 문서를 보여준다.
- Get vs Post
 
- Cookie vs Session

- [[REST]](Representational State Transfer : 대표적인 상태 전달)
	- 웹의 장점을 크게 활용할 수 있는 소프트 아키텍처 스타일의 하나
	- 
	- RESTful

- CGI(Common Gateway Interface)
	- 초기 웹 프로그래밍 기술
	- 웹 서버에서 동적인 페이지를 보여주기 위해 임의의 프로그램을 실행할 수 있도록 한다.
	- 프로세스 단위로 실행되기 때문에 사용자가 많을 경우 비효율적
	- C, Perl

- Sevlet
	- 웹에서 클라이언트의 요청을 처리하고 결과를 다시 클라이언트에게 전송하는 Servlet 클래스의 구현 규칙을 지킨 자바 프로그래밍 기술
	- 특성
		- 클라이언트의 요청에 동적으로 작동하는 웹 어플리케이션 컴포넌트
		- html을 사용하여 요청에 응답
		- Java Thread를 이용하여 동작
		- MVC 패턴에서 Controller로 이용
		- HTTP 프로토콜 서비스를 지원하는 javax.servlet.http.HttpServlet 클래스를 상속받는다. UDP보다 속도가 느리다.
		- HTML 변경 시 Servlet을 재컴파일해야 하는 단점


- JSP(Java Server Page)
	- 

- DNS 서버
	- 
- 리졸버
- web browswer이 첫번째 하는 일
	- URL을 해석
- GET 
- POST
- Web.xml
- Session
- forward와 redirect
- jsp 내장 객체
- 속성과 스코프
- include 액션태그와 include 지시어(디렉티브)의 비교
- 자바빈(JavaBean)
- 쿠키, 세션
- EL(Expression Language)
- JSTL(JSP standard Tag Library)
- WAS란? (Web Application Server)
- jQuery란?
- 크로스 브라우징이란?
- jQuery 최적화란?
- MVC
	- Model, View, Controller 3가지 영역으로 분리하여 개발하는 것
	- 영역간의 결합도를 낮추어 분업화 및 유지보수에 용이
- AJAX란?
- HTML5란?
- CRUD
	- 기본적인 데이터 처리 기능의 묶음
	- Create, Read, Update, Delete
- iBatis란?
- Spring이란?
- IP vs Port
- 트래픽(traffic) : 서버의 데이터 전송량
- https://demoversion.tistory.com/13

## 3. 데이터베이스

1. DBMS
2. 기본키 (Primary Key)
3. 외부키(Foreign Key)
4. SQL(Standard Query Language)
5. 간단 쿼리 예제

SELECT * from 테이블명 where id = 'id';

SELECT * from 테이블명 [group by {컬럼}] [HAVING {조건}] [ORDER BY {컬럼} ASC,DESC]

INSERT into 테이블명 values{ }

INSERT into 테이블명 [{컬럼..}] VALUES[{값..}]

UPDATE 테이블명 SET 컬럼1=값1 WHERE 조건

DELETE from 테이블명 WHERE 조건

- JDBC(Java Database Connectivity)
- PreparedStatement : 동적으로 변수에 값을 바인딩함.
- Connection Pool : DB 커넥션을 매번 생성하게되면 시간이 많이 듬. 커넥션을 미리 생성해두고 재사용하는 매커니즘.
- Procedure vs Function
	- Procedure
		- 일련의 쿼리를 마치 하나의 함수처럼 실행하기 위한 쿼리의 집합
		- 서버에서 수행(속도가 빠름)
		- 리턴값이 없어도 되고 여러 개도 가능하다(in, out으로 처리)
		- select로 호출 불가능(call) 
	- Function
		- 클라이언트에서 수행(속도 느림)
		- 리턴값이 필수이고 하나이다. 파라미터 넘기는 값은 IN만 존재
		- select로 호출 가능하다.
		- 주로 간단한 계산 수행

- 트리거
	- 특정한 변경 등의 이벤트가 발생했을 때 자동적으로 호출하는 일종의 프로시저
	- 구성
		- 사건(event): 트리거를 가동
		- 조건(condition): 트리거 수행 여부 검사
		- 동작(action): 트리거가 수행해야 할 내용

- PL/SQL Cursor란?
- Inner join(natural), outer join 차이
- NOSQL이란?

- [[transaction]]{트랜잭션(transaction)}



## 4. 자료구조

- Heap(힙)
	- 최댓값 또는 최솟값이 root에 위치하여 O(1)의 속도로 검색이 가능한 완전 이진 트리
	- Max heap, Min heap
	- 최대값 및 최소값을 O(1)의 속도로 함. (Max Heap, Min Heap)
	- Max heap의 경우 부모 노드는 자식보다 무조건 커야 한다. (Min heap은 그 반대)
	- 힙은 트리 구조이지만 완전 이진 트리의 특성을 활용하여 배열에 저장하는 것이 더 효율적(인덱스의 규칙 이용)
	- 삽입
		1. 삽입할 데이터를 완전 이진트리를 만족하는 비어있는 자리에 놓는다.
		2. 새로운 노드와 그것의 부모노드를 계속 비교하여 부모가 더 크다는 조건을 만족할 때까지 반복
	- 삭제(최댓값, 최솟값 삭제)
		1. 루트 노드를 삭제한다
		2. 마지막 레벨의 마지막 노드를 루트에 올려 놓는다.
		3. 힙의 조건을 만족할때까지 교환을 반복한다.

 
- 링크드 리스트 vs 배열
	- 배열 : 랜덤 접근 가능. 삽입, 삭제 느림
	- 링크드 리스트 : 랜덤 접근 불가능. 삽입, 삭제 빠름

## 5. OS
- Word
	- CPU가 한 번에 처리할 수 있는 데이터의 크기(=레지스터 하나의 크기)
	- 32bit vs 64bit
 
- RISC vs CISC

- 동기화(Synchronization)

- 스레드(Thread) vs 프로세스
	- 프로세스 : 실행중인 프로그램
	- 스레드 : 프로세스의 자원을 이용해서 실제로 작업을 수행하는 것.
	- 스레드의 개수는 제한되어 있지 않으나, 프로세스의 메모리 한계(호출 스택의 크기)가 정해져 있기 때문에 스레드의 개수 또한 제한된다.

 
- 멀티스레딩
	- CPU 사용률 향상
	- 자원을 보다 효율적으로 사용
	- 사용자에 대한 응답 향상
	- 작업의 분리, 코드 간결

- 멀티 스레드 vs 멀티 프로세스
 
- Deadlock(교착상태) : 2개 이상의 쓰레드가 자원을 점유한 상태에서 서로 상대편이 점유한 자원을 사용하려고 기다리고 있는 상태.

- context switching
	- https://jeong-pro.tistory.com/93
- 데몬 쓰레드

## 6. 소프트웨어 공학
- UML(Unified Modeling Language)
- Agile 개발
- TDD
	- Test Driven Development
	- 테스트 코드를 통해 개발하는 방법

- 디자인 패턴
	- 데코레이터 패턴
	- Strategy 패턴 & DI
	- Front Controller Pattern
	- 퍼사드 패턴(Facade Pattern)
	- 어댑터 패턴(Adapter Pattern)
	- 커맨드 패턴(Command Pattern)
	- 싱글톤 패턴(Singleton Pattern)
	- Abstract Factory Pattern
	- 옵저버 패턴(Observer Pattern)
	- 템플릿 메소드 패턴

## 7. IT상식, 기타

- 동시에 많은 사람들이 대용량의 데이터를 읽으려고 할 때 속도 개선할 수 있는 방법은?
- 특정 에러가 발생했거나 갑자기 느려졌을 때 해결해 나가는 방법. (로그도 안 남았을 때 조치 방법)
- 소스를 작성하고 분기처리를 할 때의 주의점
- 인터럽트
- RISC, CISC

