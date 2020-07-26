---
layout    : category
title     : Effective Java 3/E 내용 정리
summary   : 
date      : 2020-07-07 19:55:31 +0900
updated   : 2020-07-25 14:49:00 +0900
tag       : java book-contents-summary
public    : true
published : true
parent    : [[book-contents-summary]]
latex     : false
---

## [item16] public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라.

### 패키지 바깥에서 접근할 수 있는 클래스라면 접근자를 제공하라
#### 퇴보한 클래스
```{.java .numberLines}
class Point {
	public double x;
	public double y;
}
```
- 단점
	- 내부 표현을 바꾸려면 API를 수정해야 함
	- 불변식 보장 X
	- 외부에서 필드에 접근할 때 부수 작업 수행 못함  
<br>

#### 캡슐화한 클래스

```{.java .numberLines}
class Point {
	private double x;
	private double y;
	
	public Point(double x, double y) {
		this.x = x;
		this.y = y;
	}
	
	public double getX() { return x; }
	public double getY() { return y; }
	
	public void setX(double x) { this.x = x; }
	public void setY(double Y) { this.y = y; }
}
```
- 장점
	- 내부를 언제든 바꿀 수 있는 유연성

### package-private(default) 클래스나 private 중첩(nested) 클래스는 데이터 필드를 노출해도 문제가 없다.
- 클래스 선언 및 사용하는 코드 면에서 접근자 방식보다 훨신 깔끔
- 해당 클래스를 포함하는 패키지 안에서만 동작하는 코드이기에 패키지 바깥 코드에 전혀 손대지 않고 데이터 표현 방식 변경이 가능
- private 중첩 클래스는 이 클래스를 포함하는 외부 클래스까지로 수정 범위가 더 좁다
<br>
 
### public 클래스의 필드를 직접 노출시킨 사례
- java.awt.package의 Point와 Deimension (아직도 해결되지 못했다, item67)
<br>

### public 클래스의 final 필드를 직접 노출했을 때

- 불변식은 보장할 수 있다.
- 단점
	- 내부 표현을 바꾸려면 API를 수정해야 함
	- 외부에서 필드에 접근할 때 부수 작업 수행 못함  

```{.java .numberLines}
public final class Time {
	private static final int HOURS_PER_DAY = 24;      // 이거랑 책이랑 어떤게 가독성이 높은지, 더 많이 쓰이는지
	private static final int MINUTES_PER_HOUR = 60;
	
	public final int hour;
	public final int minute;
	
	public Time(int hour, int minute) {
		if (hour < 0 || hour >= HOURS_PER_DAY)
			throw new IllegalArgumentException("시간 : " + hour);
		if (minute < 0 || minute >= MINUTES_PER_HOUR)
			throw new IllegalArgumentException("분 : " + minute);
			
		this.hour = hour;
		this.minute = minute;
	}
	...
}
```

### 핵심 정리
- public 클래스는 절대 가변 필드를 직접 노출해서는 안된다.
- 불변 필드의 노출도 안 하는 것이 좋다.
- package-private(default) 클래스나 private 중첩 클래스에서는 (불변이든 아니든) 필드를 노출하는 것이 나을 때도 있다.

### 참고 자료
- [중첩(Nested) 클래스](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html)
- Nested 클래스는 item24에 소개된다.
- java.awt.Component.getSize()
	- Component.getSize()가 width, height를 필드로 가지고 있는 Dimension을 return하는데, 이때 Dimension을 new를 통해 새로운 인스턴스를 생성해서 return 하게 된다. -> 성능 저하가 일어난다.
		- Dimension의 필드(height, width)가 public으로 되어 있기 때문에 바로 접근이 가능하여 새로운 인스턴스를 생성해 return하도록 만든 듯 싶다.
		- [java7 component getSize()](https://docs.oracle.com/javase/7/docs/api/java/awt/Component.html#getSize())
		- [java8 component getSize()](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#getSize--)
		- [java14 component getSize()](https://docs.oracle.com/en/java/javase/14/docs/api/java.desktop/java/awt/Component.html#getSize())
		- [java14 component getWidth()](https://docs.oracle.com/en/java/javase/14/docs/api/java.desktop/java/awt/Component.html#getWidth())
			- getSize() 대신 getWidth(), getHeight()를 쓰라고 권유하고 있다.  

---

## [item22] 인터페이스는 타입을 정의하는 용도로만 사용하라

### 인터페이스
- 자신을 구현한 클래스의 instance를 참조할 수 있는 타입 역할
- 클래스가 어떤 인터페이스를 구현한다는 것은 자신의 instance로 무엇을 할 수 있는지를 클라이언트에 얘기해주는 것

### 상수 인터페이스 안티 패턴
상수 인터페이스 : 메서드 없이, static final 필드로만 이루어진 인터페이스

```{.java .numberLines}
public interface PhysicalConstants {
	static final double AVOGADROS_NUMBER   = 6.022_140_857e23; // [1], [2]
	static final double BOLTZMANN_CONSTANT = 1.380_648_52e-23; 
	static final double ELECTRON_MASS      = 9.109_383_56e-31;
}
```
[1] : interface의 field는 public static final이 default이다. ([JLS-9](https://docs.oracle.com/javase/specs/jls/se7/html/jls-9.html#jls-9.3))  
[2] : 숫자 사이의 밑줄('_')은 아무런 영향을 주지 않고 가독성을 높인다.  
<br>  

- java 7에 추가  
- 숫자 끝에 사용 불가  
- [guide 문서](https://docs.oracle.com/javase/7/docs/technotes/guides/language/underscores-literals.html)


클래스 내부에서 사용하는 상수 : 외부 인터페이스가 아닌 내부 구현에 해당 => 상수 인터페이스는 내부 구현을 클래스의 API로 노출하는 행위  
코드가 내부 구현에 해당하는 이 상수들에 종속되게 한다.  
이 상수들을 안 쓰게 되더라도 [[binary-compatibility]]{바이너리 호환성}을 위해 여전히 상수 인터페이스를 구현하고 있어야 한다.  
(final이 아닌 클래스가 상수 인터페이스를 구현한다면 모든 하위 클래스의 이름공간이 그 인터페이스가 정의한 상수들로 오염되어 버린다.)  


인터페이스를 잘못 활용한 예    
<br>   
- java.io.ObjectStreamConstants

### '상수 공개' 목적의 해결 방법
- 특정 클래스나 인터페이스와 강하게 연관된 상수라면 그 클래스나 인터페이스 자체에 추가
	- ex> Integer와 Double의 MIN_VALUE, MAX_VALUE
- 열거 타입([item34](https://github.com/JAVA-JIKIMI/EFFECTIVE-JAVA3/wiki/item-34))
- 인스턴스화할 수 없는 유틸리티 클래스([item4](https://github.com/JAVA-JIKIMI/EFFECTIVE-JAVA3/wiki/item-4))
 

```{.java .numberLines}

import package effectivejava.chapter4.item22.constantutilityclass.PhysicalConstants.*; // [1]
// package effectivejava.chapter4.item22.constantutilityclass;

public class PhysicalConstans {
	private PyysicalConstants(){} // 인스턴스화 방지
	
	public static final double AVOGADROS_NUMBER   = 6.022_140_857e23;
	public static final double BOLTZMANN_CONSTANT = 1.380_648_52e-23;
	public static final double ELECTRON_MASS      = 9.109_383_56e-31;
}
```
[1] : 정적 임포트(static import)를 통한 클래스 이름 생략 가능  
PhysicalConstants.AVOGADROS_NUMBER -> AVOGADROS_NUMBER


### 요약
인터페이스는 타입을 정의하는 용도로만 사용해야 한다. 상수 공개용 수단으로 사용하지 말자


언급할 것
- 숫자 사이의 밑줄('_') (java 7)
- 바이너리 호환성
- 필드가 interface는 public 없고, util class에는 public으로 선언
- PhysicalConstants.AVOGADROS_NUMBER

- 질문
- 바이너리 호환성에서 recompile에 대해 언급하고 있는데, .class 파일은 binary 파일이 아니지 않나?
 
## [item23] 멤버 클래스는 되도록 static으로 만들라
- 중첩 클래스(nested class) : 다른 클래스 안에 정의된 클래스
	- 중첩 클래스는 자신을 감싼 바깥 클래스에서만 쓰여야하며, 그 외의 쓰임새는 톱레벨 클래스로 만들어야 한다.
	- 종류 : 정적 멤버 클래스, (비정적) 멤버 클래스, 익명 클래스, 지역 클래스

 
## [item28] 배열보다는 리스트를 사용하라
### 배열과 제네릭은 잘 어우러지지 못한다.
#### 배열과 제네릭 타입의 중요한 차이
1. 배열은 공변(함께 변한다는 뜻)이지만, 제네릭은 불공변이다.
	- Sub가 Super의 하위 타입이면, Sub[]도 Super[]의 하위 타입이다.
	```java
	Object[] objectArray = new Long[1]; // Long이 Object의 하위 타입
	objectArray[0] = "Long에 String을 넣을 수 없어"; // 런타임에 ArrayStoreException 발생
	// 런타임에야 버그의 존재를 알게 된다.
	```
	- 서로 다른 타입 Type1, Type2가 있을 때, List<Type1>은 List<Type2>의 상위 타입도, 하위 타입도 아니다.([JLS-4.10](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.10))
	```java
	List<Object> ol = new ArrayList<Long>(); // 호환되지 않는 타입, Compile 에러
	ol.add("Long에 String을 넣을 수 없어");
	// 위 코드는 컴파일되지 않는다.
	```

2. 배열은 실체화(reify)된다. ([JLS-4.7](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.7))
	- 배열은 런타임에도 자시이 담기로 한 원소의 타입을 인지하고 확인하기 때문에 ArrayStoreException 발생도 가능한 것이다. 
	- 제네릭은 타입 정보가 런타임에는 소거(erasure)된다.([JLS-4.6](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.6), 제네릭 지원되기 전의 하위 호환성 목적)
#### 제네릭 배열을 생성하지 못한다.
- 'new List<E>[]'(제네릭 타입), 'new List<String>[]'(매개변수화 타입), 'new E[]'(타입 매개변수) 식으로 작성하면 컴파일 에러 발생한다.
- 제네릭 배열 생성을 못하는 이유는 타입 안전하지 않기 때문이다.
	- 허용한다면 컴파일러가 자동 생성한 형변환 코드에서 런타임에 ClassCastException이 발생할 수 있어, 이는 제네릭 타입 시스템 취지에 어긋난다.
	```java
	List<String>[] stringLists = new List<String>[1]; // (1), 컴파일 에러 발생, 하지만 허용된다고 가정
	List<Integer> intList = List.of(42);			  // (2)
	Object[] objects = stringLists;					  // (3)
	objects[0] = intList;							  // (4)
	String s = stringLists[0].get(0);				  // (5)
	```
		- 배열은 공변이니, (3)은 (1)에서 생성한 List<String>의 배열을 Object 배열에 할당하는 것이 가능하다.  
		- 제네릭은 소거 방식이니, (4)는 (2)에서 생성한 List<Integer>의 인스턴스를 Object 배열의 첫 원소로 저장할 수 있다.	
		- 런타임에는 List<Integer> 인스턴스의 타입은 단순 List가 되고, List<Integer>[] 인스턴스의 타입은 List[]가 되어, (4)에서도 ArrayStoreException이 발생하지 않는다.
		- List<String> 인스턴스만 담겠다고 선언한 stringLists 배열에 List<Integer> 인스턴스가 저장되어 있고, (5)는 이 배열의 처음 리스트에서 첫 원소를 꺼내려 한다.  
		  컴파일러는 꺼낸 원소를 자동으로 String으로 형변환하는데, 이 원소는 Integer이므로 런타임에 ClassCastException이 발생한다. 이를 방지하기 위해서 제네릭 배열 생성되지 않도록 (1)에서 컴파일 에러를 내는 것이다. 
	
	
	
```{.java .numberLines}
// 제네릭 쓰지 않고 구현
public class Chooser {
	public final Object[] choiceArray;
	
	public Chooser(Collection choices) {
		choiceArray = choices.toArray();
	}
	public Object choose() {
		Random rnd = ThreadLocalRandom.current();
		return choiceArray[rnd.nextInt(choiceArray.length)];
	}
}
```

```{.java .numberLines}
// 제네릭 구현을 위한 첫 시도(컴파일 에러 발생)
public class Chooser<T> {
	public final T[] choiceArray;
	
	public Chooser(Collection<T> choices) {
		choiceArray = choices.toArray();
	}
	public Object choose() {
		Random rnd = ThreadLocalRandom.current();
		return choiceArray[rnd.nextInt(choiceArray.length)];
	}
}
```

```{.java .numberLines}
// 리스트 기반 Chooser (타입 안정성 확보)
public class Chooser<T> {
	public final List<T> choiceList;
	
	public Chooser(Collection<T> choices) {
		choiceList = new ArrayList<>(choices);
	}
	public Object choose() {
		Random rnd = ThreadLocalRandom.current();
		return choiceList.get(rnd.nextInt(choiceList.size()));
	}
}
```

### 핵심 정리
- 배열과 제네릭은 매우 다른 규칙이 적용된다.
	- 배열은 공변과 실체화(런타임에 타입 안전)
	- 제네릭은 불공변과 타입 정보 소거(컴파일 타임에 타입 안전)
- 둘을 섞어 쓰다 컴파일 오류나 경고를 만나면, 배열을 리스트로 대체하는 방법을 가장 먼저 적용해보자.
