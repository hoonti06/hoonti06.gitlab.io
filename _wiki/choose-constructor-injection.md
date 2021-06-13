---
layout    : wiki
title     : 생성자 주입을 선택해라
summary   : DI 권장 방식
date      : 2021-06-07 01:00:39 +0900
updated   : 2021-06-10 19:52:42 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 의존 관계 주입 방식

의존관계 주입 방식에는 총 3가지가 있다.
1. Constructor(생성자) 주입
2. Setter 주입
3. Field 주입

<br>
## 생성자 주입
이 중에서 권장되는 방식은 생성자 주입이다. @Autowired 어노테이션을 통한 Field 주입을 하게 되면 Intellij에서 다음과 같이 주의를 준다.  

![]( /wiki-img/choose-constructor-injection/120931508-dae71d80-c72c-11eb-96c8-1e5b678d50c7.png )  

<br>
왜 생성자 주입을 권장하는지에 대해 알아보자

<br>
### 불변
- 대부분의 의존관계 주입은 한 번 일어나면 애플리케이션 종료 시까지 의존관계를 변경할 일이 없고, 오히려 변하면 안 된다.
- setter 주입을 하기 위해서는 setter를 public으로 열어두어야 한다.
- 누군가 실수로 변경할 수도 있고, 변경하면 안 되는 메서드를 열어두는 것은 좋은 설계가 아니다.
- 생성자 주입은 생성할 때 딱 한 번만 호출되고 그 이후에 호출되는 일이 없기 때문에 불변으로 설계할 수 있다.
 
<br>
### 누락
프레임워크 없이 순수 Java 코드를 유닛 테스트할 때, setter 주입의 경우 
```java
public class OrderServiceImpl implements OrderService {
	private MemberRepository memberRepository;
	private DiscountPolicy discountPolicy;
	
	@Autowired
	public void setMemberRepository(MemberRepository memberRepository) {
		this.memberRepository = memberRepository; 
	}
	@Autowired
	public void setDiscountPolicy(DiscountPolicy discountPolicy) {
		this.discountPolicy = discountPolicy; 
	}
	//...
}
```
- @Autowired 가 프레임워크 안에서 동작할 때는 의존관계가 없으면 오류가 발생하지만, 지금은 프레임워크 없이 순수한 자바 코드로만 단위 테스트를 수행하고 있다.

다음과 같이 테스트를 수행하면  
```java
@Test
void createOrder() {
	OrderServiceImpl orderService = new OrderServiceImpl();
	orderService.createOrder(1L, "itemA", 10000); 
}
```
실행은 되지만 NPE가 발생한다. 그 이유는 memberRepository, discountPolicy 모두 의존관계 주입이 누락되었기 때문이다.


**생성자 주입**을 사용하면 생성자의 파라미터로 주입 데이터를 전달해야 하기 때문에 컴파일 오류가 발생한다.

<br>
### final 키워드
- 생성자 주입을 사용하면 Field에 `final` 키워드를 사용할 수 있다. 그래서 생성자에서 혹시라도 값이 설정되지 않는 오류를 컴파일 시점에서 발경할 수 있다.

```java
@Component
public class OrderServiceImpl implements OrderService { 
	private final MemberRepository memberRepository;
	private final DiscountPolicy discountPolicy;
	
	@Autowired
	public OrderServiceImpl(MemberRepository memberRepository, 
	                        DiscountPolicy discountPolicy) {
		this.memberRepository = memberRepository; 
		// discountPolicy 값 설정 누락
	}
	//...
}
```

필수 필드 discountPolicy 값을 설정하는 부분이 누락되어 컴파일 오류가 발생한다**(컴파일 오류는 세상에서 가장 빠르고, 좋은 오류다!)**.
> java: variable discountPolicy might not have been initialized  


- 참고: 수정자 주입을 포함한 나머지 주입 방식은 모두 생성자 이후에 호출되므로, 필드에 final 키워드를 사용할 수 없다. 오직 생성자 주입 방식만 final 키워드를 사용할 수 있다.


### 정리
- 생성자 주입 방식은 프레임워크에 의존하지 않고 순수한 자바 언어의 특징을 잘 살리는 방법이기도 하다.
- 기본으로 생성자 주입을 사용하고, 필수 값이 아닌 경우에는 setter 주입 방식을 옵션으로 부여한다. 생성자 주입과 setter 주입을 동시에 사용할 수 있다.
- **항상 생성자 주입을 선택해라!** 그리고 필요하면 setter 주입을 선택하고, 필드 주입은 사용하지 않는 게 좋다.


## 생성자 주입 코드 트렌드
final keyword와 생성자 주입을 같이 사용하게 되면, 생성자 코드와 주입받은 값을 대입하는 코드 등을 작성해야 한다. 이러한 번거로운 작업을 없애기 위해 다음과 같이 코드를 작성한다.

```java
@Component
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
	private final MemberRepository memberRepository;
	private final DiscountPolicy discountPolicy;
	
	// ...
}
```
- lombok의 @RequiredArgsConstructor와 final keyword를 사용하게 되면 final인 Feild들을 파라미터로 하는 생성자를 자동으로 생성해준다.
- lombok이 java의 어노테이션 프로세 기능을 이용하여 컴파일 시점에 생성 코드를 자동으로 생성해준다.
- 최근에는 생성자를 딱 1개 두고, @Autowired를 생략하는 방법을 주로 사용한다. 여기에 Lombok 라이브러리의 @RequiredArgsConsructor와 함께 사용하면 된다.

### lombok 라이브러리 적용 방법

- gradle 설정(build.gradle)
	```groovy
	//lombok 설정 추가 시작 configurations 
	{
		compileOnly {
			extendsFrom annotationProcessor
		} 
	}
	//lombok 설정 추가 끝

	dependencies {
		// ...
		
		//lombok 라이브러리 추가 시작
		compileOnly 'org.projectlombok:lombok' 
		annotationProcessor 'org.projectlombok:lombok'
		testCompileOnly 'org.projectlombok:lombok' 
		testAnnotationProcessor 'org.projectlombok:lombok' 
		//lombok 라이브러리 추가 끝
	}
	```
- preferences -> Annotation Processors 검색 -> Enable annotation processing 체크


## Reference
- 스프링 핵심 원리 - 기본편
