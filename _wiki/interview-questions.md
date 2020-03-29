---
layout    : wiki
title     : 면접 질문
summary   : 
date      : 2020-03-26 09:25:56 +0900
updated   : 2020-03-29 20:20:26 +0900
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
	- 변수와 메소드를 하나의 단위로 묶는 것(데이터의 번들링). 보통 클래스를 통해 구현
	- 모듈화 향상, 인터페이스 간결
	- 정보 은닉(Information hiding)
		- 내부 구현을 숨겨 모듈 내의 응집도를 높이고, 모듈간의 결합도를 낮춰 유연성과 유지보수성을 높인다.
		- 정보 은닉은 캡슐화로부터 파생된 보조 개념(캡슐화 != 정보 은닉)
 
 
- 상속(Inheritance)
	- 하위 클래스가 상위 클래스의 특성과 기능을 물려받는 것
	- 캡슐화를 유지하면서도 클래스의 재사용 용이


- 다형성(Polymorphism)
	- 하나의 변수, 또는 함수(메소드)가 상황에 따라 다르게 해석되는 것
	- 서브타입 다형성
		- 기초 클래스 또는 인터페이스를 구현하는 상위 클래스를 생성하고 해당 클래스를 상속받는 다수의 하위 클래스들을 만들어 상위 클래스의 포인터나 참조 변수 등이 하위 클래스의 객체를 참조하는 것
		- 상위 클래스의 메소드 위에 하위 클래스의 메소드를 덮어쓰는 오버라이딩을 통해 상위 클래스의 참조 변수가 참조하는 하위 클래스의 메소드가 호출된다.
	- 매개변수 다형성
		- 타입을 매개변수로 받아 새로운 타입을 되돌려주는 기능
		- C++의 템플릿(Template), Java의 제네릭(Generic)
	- 임시 다형성
		- 함수 오버로딩 : 동일한 이름의 함수를 매개변수에 따라 다르게 동작하도록 한다.
		- 연산자 오버로딩 : 기본 연산자가 수행되는 클래스에 따라 다르게 동작하도록 하는 것. C++, C#에서 제공
	- 강제 다형성
		- 묵시적 형 변환 : 손실이 적은 방향인 작은 자료형에서 큰 자료형으로 이루어진다.
		- 명시적 형 변환 : 원하는 형태를 명시하여 형을 변환할 수 있다.


- 추상화
	- 핵심적인 개념 또는 기능 등을 간추려 내는 것
	- 클래스간의 공통점을 찾아서 공통의 조상을 만드는 작업(구체화 : 상속을 통해 클래스를 구현, 확장하는 작업)
	- 추상 클래스
		- 미완성 클래스
	- 추상 메소드
 
- java
	- 'Write once run anywhere'
	- 8개 primitive type
		- boolean, char, byte, short, int, long, float, double
	- static
		- 클래스 메소드 : 인스턴스 없이 호출 가능한 함수
		- 클래스 변수 : 해당 클래스의 모든 인스턴스가 공유하는 변수
	- 클래스 vs 인터페이스
		- 단일 상속, 다중 상속
	- 추상 클래스 vs 인터페이스

- 생성자
- java vs C++
- C vs C++
- volatile
	- 컴파일러의 최적화를 생략하는 키워드
- 에러와 예외 차이
- 예외 Exception- try, catch, finally( 예외에 관계없이 항상 마지막에 수행 ) : 프로그램 실행 시 발생할 수 있는 예외의 발생에 대비한 코드를 작성, 비정상적인 종료를 막음.
- Throw : 예외를 발생시키는 키워드.
- toString 메소드 : 인스턴스에 대한 정보를 문자열로 제공하기 위한 목적으로 정의됨. 인스턴스를 출력하게되면 toString이 콜됨.
- String과 StringBuffer의 차이
 
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

31. 컬렉션 프레임웍 : 많은 데이터를 저장하는 클래스들을 표준화한 것.

컬랙션 클래스 : 백터, 리스트와 같이 많은 데이터를 저장할 수 있는 클래스

32. 동기화(Synchronization) : 멀티쓰레드 프로그래밍에서는 하나의 객체를 여러 쓰레드가 동시에 접근. 데이터의 일관성을 위해서 동기화가 필요.

33. Deep copy , Shallow Copy
34. LinkedList

35. Iterator

36. 이진 검색 트리
37. Properties : <String, String>값을 저장하는 컬렉션 클래스. 주로 환경설정과 관련된 속성을 저장하는데 사용한다.

38. 정규식 ( regular expression ) : 특정한 규칙을 가진 문자열 집합을 표현하는데 사용하는 형식 언어.

c[a-z]* => c, ca, co, car, combat, count...

39. Generics(제네릭스) : 컬렉션 클래스에 한 종류의 타입을 사용하게끔 지정함. 형변환의 번거로움을 줄인다.

- 타입 안정성을 제공 ( 의도하지 않은 타입의 저장을 막음, 저장된 객체를 꺼내올 때 타입과 다른 타입으로 형변환 되어 발생하는 오류를 줄임)

- 타입체크와 형변환을 생략하므로 코드가 간결

40. 스레드(Thread)

- 프로세스 : 실행중인 프로그램

- 스레드 : 프로세스의 자원을 이용해서 실제로 작업을 수행하는 것.

- 스레드의 개수는 제한되어 있지 않으나, 프로세스의 메모리 한계(호출 스택의 크기)가 정해져 있기 때문에 스레드의 개수 또한 제한된다.

41. 멀티스레딩

- CPU 사용률 향상

- 자원을 보다 효율적으로 사용

- 사용자에 대한 응답 향상

- 작업의 분리, 코드 간결

42. Deadlock(교착상태) : 두 쓰레드가 자원을 점유한 상태에서 서로 상대편이 점유한 자원을 사용하려고 기다리고 있는 상태.

43. 쓰레드의 구현

- Runnable 인터페이스를 구현. // 또는 Thread 클래스 상속

ex) Runnable r = new ThreadEx();

Thread t = new Thread(r);

t.start();

- class ThreadEx implements Runnable{ public void run(){ ... } }
- context switching
- 데몬 쓰레드
- 동기화

- wait(), notify()

- 이벤트(event)란 ?

49. Adapter 클래스란?
50. 애플릿(Applet)이란?
51. 직렬화(Serialization)
52. UML( Unified Modeling Language )
53. Agile 애자일 개발
54. java 콜렉션 대표 인터페이스 3개
55. 접근제어자 종류 특성 설명
56. 관심사의 분리(Seperation of Concerns)
57. 팩토리란?
58. IoC컨테이너란? ( Inversion of Control )
59. DI(Dependency Injection) 의존관계 주입
60. Open-closed 원칙
61. Strategy 패턴 & DI
62. 콜백이란?
63. Proxy(프록시)란?
64. 데코레이터 패턴
65. 리플렉션이란?
66. Cross-cutting Concerns란? ( 횡단관심사 )
67. AOP란? ( Aspect Oriented Programming) : 관점지향 프로그래밍
68. Front Controller Pattern
69. 스프링 @ MVC 장점
70. Facade Pattern
71. Adapter Patter
72. Command Pattern
73. Singleton 패턴
74. Abstract Factory Pattern
75. 옵저버 패턴
76. 템플릿 메소드 패턴
 
- 32bit vs 64bit
 

## 2. WEB
- REST 서비스란?
- CGI(Common Gateway Interface )
- JSP
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
- AJAX란?
- HTML5란?
- iBatis란?
- Spring이란?

## 3. 데이터베이스

1. DBMS
2. 기본키 (Primary Key)
3. 외부키(Foreign Key)
4. SQL(Standard Query Language)
5. 간단 쿼리 예제

SELECT * from 테이블명 where id = 'id';

SELECT * from 테이블명 [group by {컬럼}] [HAVING 조건][ORDER BY {컬럼} ASC,DESC]

INSERT into 테이블명 values{ }

INSERT into 테이블명 [{컬럼... }] VALUES[{값..}]

UPDATE 테이블명 SET 컬럼1=값1 WHERE 조건

DELETE from 테이블명 WHERE 조건

6. JDBC(Java Database Connectivity)
7. PreparedStatement : 동적으로 변수에 값을 바인딩함.
9. Connection Pool : DB 커넥션을 매번 생성하게되면 시간이 많이 듬. 커넥션을 미리 생성해두고 재사용하는 매커니즘.
10. Procedure(PL/SQL) 이란?
10. Procedure vs Function
11. PL/SQL Cursor란?
- Inner join(natural), outer join 차이
- NOSQL이란?
- 동시에 많은 사람들이 글을 등록 수정하면서 생기는 insert, update 처리를 충돌나지 않게 하는 방법.

- 트랜잭션(transaction)
	- 여러 개의 작업을 하나의 논리적인 작업 단위로 묶어주는 것. 
	- 병럴 처리에 의한 부정합 방지 목적
	- ACID
		- Atomicity(원자성) : 모두 반영되거나 모두 반영되지 않는다.
		- Consistency(일관성) : 트랜잭션 수행 전, 후에 데이터 모델의 모든 제약 조건(기본키, 외래키, 도메인, 도메인 제약조건 등)을 만족하는 것을 통해 보장 
		- Isolation(고립성) : 트랜잭션 수행 도중 다른 트랜잭션이 끼어들지 못한다.(트랜잭션 밖에 있는 어떤 연산도 중간 단계의 데이터를 볼 수 없다)
		- Durability(지속성) : 성공적으로 수행된 트랜잭션은 영원히 반영(보장)된다.

- 격리 수준()

## 4. 자료구조

- Heap(힙)

- 완전 이진트리. complete binary tree

- 최대값 및 최소값을 O(1)의 속도로 함. (Max Heap, Min Heap)

- 부모는 자식보다 무조건 커야된다(Max Heap), Min Heap은 반대

- 힙은 트리구조이지만 배열에 저장하는 것이 더 효율적이다. ( 인덱스의 규칙 이용 )

- 삽입 : 1) 삽입할 데이터를 완전 이진트리를 만족하는 비어있는 자리에 놓는다.

2) 새로운 노드와 그것의 부모노드를 계속 비교하여 부모가 더 크다는 조건을 만족할 때까지 반복

- 제거 : 1) 루트노드를 삭제한다

2) 마지막 레벨의 마지막 노드를 루트에 올려놓는다.

3) 힙의 조건을 만족할때까지 교환을 반복한다.

- 리스트와 배열 장단점

## 5. IT상식, 기타

- 동시에 많은 사람들이 대용량의 데이터를 읽으려고 할 때 속도 개선할 수 있는 방법은?
- 특정 에러가 발생했거나 갑자기 느려졌을 때 해결해 나가는 방법. (로그도 안 남았을 때 조치 방법)
- 소스를 작성하고 분기처리를 할 때의 주의점
- 인터럽트
- RISC, CISC

