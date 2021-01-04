---
layout    : category
title     : (도서 내용 정리) Effective Java 3/E
summary   : 
date      : 2020-07-07 19:55:31 +0900
updated   : 2021-01-04 17:33:44 +0900
tag       : java book-contents-summary
public    : true
published : true
parent    : [[book-contents-summary]]
latex     : false
---
* TOC
{:toc}

## [item16] public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라.

### 패키지 바깥에서 접근할 수 있는 클래스라면 접근자를 제공하라
#### 퇴보한 클래스
```java
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

```java
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

```java
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

```java
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
 

```java

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


### 핵심정리
인터페이스는 타입을 정의하는 용도로만 사용해야 한다. 상수 공개용 수단으로 사용하지 말자


## [item23] 멤버 클래스는 되도록 static으로 만들라
- 중첩 클래스(nested class) : 다른 클래스 안에 정의된 클래스
	- 중첩 클래스는 자신을 감싼 바깥 클래스에서만 쓰여야하며, 그 외의 쓰임새는 톱레벨 클래스로 만들어야 한다.
	- 종류 : 정적 멤버 클래스, (비정적) 멤버 클래스, 익명 클래스, 지역 클래스

# 5. 제네릭(generic)
제네릭 지원 전에는 컬렉션에서 객체를 꺼낼 때마다 형변환을 해야 했다. 반면, 제네릭을 사용하면 컬렉션이 담을 수 있는 타입을 컴파일러에 알려주게 된다. 컴파일러는 알아서 형변환 코드를 추가할수 있게 되어, 엉뚱한 타입의 객체를 넣으려는 시도를 컴파일 과정에서 차단한다.
 
## [item28] 배열보다는 리스트를 사용하라
### 배열과 제네릭 타입의 중요한 차이
1. 배열은 `공변`('함께 변한다')이지만, 제네릭은 `불공변`이다.
	- `Sub`가 `Super`의 하위 타입이면, `Sub[]`도 `Super[]`의 하위 타입이다.
	  ```java
	  Object[] objectArray = new Long[1]; // Long이 Object의 하위 타입
	  objectArray[0] = "Long에 String을 넣을 수 없어"; // 런타임에 ArrayStoreException 발생
	  ```
	- 서로 다른 타입 `Type1`, `Type2`가 있을 때, `List<Type1>`은 `List<Type2>`의 상위 타입도, 하위 타입도 아니다.([JLS-4.10](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.10))
	  ```java
	  List<Object> ol = new ArrayList<Long>(); // 호환되지 않는 타입, Compile 에러
	  ol.add("Long에 String을 넣을 수 없어");
	  ```
2. 배열은 `실체화(reify)`된다. ([JLS-4.7](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.7))
	- 배열은 **런타임에도 자신이 담기로 한 원소의 타입을 인지하고 확인한다**는 것
	- `ArrayStoreException` 발생도 가능
	- 제네릭은 타입 정보가 런타임에는 `소거(erasure)`된다.([JLS-4.6](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.6))  
		- **원소 타입을 컴파일타임에만 검사하며 런타임에는 알 수 조차 없다**
		- 제네릭 지원 전 레거시 코드에 대한 **하위 호환성** 목적
	  
### 제네릭 배열을 생성하지 못한다.
- `new List<E>[]`(제네릭 타입), `new List<String>[]`(매개변수화 타입), `new E[]`(타입 매개변수) 식으로 작성하면 컴파일 에러 발생한다.
- 그 이유는 타입 안전하지 않기 때문이다.
	- 허용한다면 컴파일러가 자동 생성한 형변환 코드[^1]에서 런타임에 `ClassCastException`이 발생할 수 있어, 이는 제네릭 타입 시스템의 취지에 어긋난다.
	  ```java
	  List<String>[] stringLists = new List<String>[1]; // (1), 컴파일 에러 발생, 하지만 허용된다고 가정
	  List<Integer> intList = List.of(42);              // (2), List.of()는 JDK 9부터 사용 가능
	  Object[] objects = stringLists;                   // (3)
	  objects[0] = intList;                             // (4)
	  String s = stringLists[0].get(0);                 // (5), 문제 발생
	  ```
		  - 배열은 공변이니, (3)은 (1)에서 생성한 `List<String>`의 배열을 `Object` 배열에 할당하는 것이 가능하다.  
		  - 제네릭은 소거 방식이니, (4)에서는 런타임에 (2)에서 생성한 `List<Integer>`의 인스턴스를 `Object` 배열의 첫 원소로 저장할 수 있다. `List<Integer>` 인스턴스의 타입은 단순 `List`가 되고, `List<Integer>[]` 인스턴스의 타입은 `List[]`가 되어 런타임에 `ArrayStoreException`이 발생하지 않는다.
		  - 제네릭은 소거 방식이니, 런타임에`List<Integer>` 인스턴스의 타입은 단순 `List`가 되고, `List<Integer>[]`와 `List<String>[]` 인스턴스의 타입은 `List[]`가 된다. 그래서 (4)에서는 (2)에서 생성한 `List<Integer>`의 인스턴스를 `Object` 배열의 첫 원소로 저장해도 `ArrayStoreException`이 발생하지 않는다. 
		  - 문제는 (5)에서 발생한다. `List<String>` 인스턴스만 담겠다고 선언한 stringLists 배열에 다른 타입의 인스턴스(`List<Integer>`)가 담겨있는데, 첫 원소를 꺼내려고 한다. 그리고 이를 String으로 형변환하는데, 이 원소는 Integer 타입이므로 런타임에 `ClassCastException`이 발생
	
	
### 실체화 불가 타입
- `E`, `List<E>`, `List<String>` 같은 타입은 `실체화 불가 타입`(non-reifiable type, [JLS-4.7](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.7))이다. 
  - 컴파일타임보다 런타임에 타입 정보를 적게 갖는다
- `소거` 메커니즘으로 인해 매개변수화 타입 가운데 **실체화될 수 있는 타입은 `List<?>`와 `Map<?,?>`같은 비한정적 와일드카드 타입뿐(item26)**

### 배열로 형변환시 오류가 발생한다면
제네릭 배열 생성 오류나 비검사 형변환 경고가 뜨는 경우 대부분 배열인 `E[]` 대신 컬렉션인 `List<E>`를 사용하면 해결된다.

```java
// 제네릭 쓰지 않고 구현
public class Chooser {
	public final Object[] choiceArray;
	
	public Chooser(Collection choices) {
		choiceArray = choices.toArray();
	}

	// 이 메서드를 사용하는 곳에서는 매번 형변환이 필요
	// 런타임에 형변환 오류의 가능성
	public Object choose() {
		Random rnd = ThreadLocalRandom.current();
		return choiceArray[rnd.nextInt(choiceArray.length)];
	}
}
```

```java
// 제네릭 구현을 위한 시도(컴파일 에러, 경고 발생)
public class Chooser<T> {
	public final T[] choiceArray;
	
	public Chooser(Collection<T> choices) {
		// [1] 컴파일 에러, incompatible types: java.lang.Object[] cannot be converted to T[]
		choiceArray = choices.toArray();
		
		// [2] 'Unchecked Cast' 경고, T의 타입을 몰라 이 형변환이 런타임에도 안전한지 보장할 수 없다.
		choiceArray = (T[]) choices.toArray();
	}
	// choose method는 동일
}
```

```java
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
	- **배열**은 '공변'과 '실체화'(런타임에 타입 안전)
	- **제네릭**은 '불공변'과 타입 정보 '소거'(컴파일 타임에 타입 안전)
- 둘을 섞어 쓰다 컴파일 오류나 경고를 만나면, 가장 먼저 **배열을 리스트로 대체**해보자! 


 
## [item34] int 상수 대신 열거 타입을 사용하다

### 정수 열거 패턴
```java
public static final int APPLE_FUJI = 0;
public static final int APPLE_PIPPIN = 1;
public static final int APPLE_GRANNY_SMITH = 2;

public static final int ORANGE_NAVEL = 0;
public static final int ORANGE_TEMPLE = 1;
public static final int ORANGE_BLOOD = 2;
```
- 타입 안전하지 않다.
	```java
	APPLE_FUJI == ORANGE_NAVEL // Warning 조차 뜨지 않는다.
	```
- 포현력도 좋지 않다.
- namespace를 지원하지 않아 접두어를 쓰는 등의 방법으로 이름 충돌을 방지해야 한다
- 컴파일하면 그 값이 클라이언트 파일에 그대로 새겨진다.(JSL-13.1)
	- 상수의 값이 바뀌면 클라이언트도 반드시 다시 컴파일해야 함
- 정수 대신 문자열 상수를 사용하는 변형 패턴, 문자열 열거 패턴(string enum pattern)도 존재한다

### 열거 타입의 특징
- **완전한 형태의 클래스**(C, C++, C#의 enum과는 다르다)
- **상수 하나당 자신의 인스턴스를 하나씩 만들어 public static final 필드로 공개**한다
- 밖에서 접근할 수 있는 생성자를 제공하지 않아 사실상 final
- 클라이언트가 인스턴스를 직접 생성하거나 확장할 수 없다
- 열거 타입 선언으로 만들어진 인스턴스들은 딱 하나씩만 존재
- 컴파일타임 타입 안전성 제공
	- 매개변수로 건네받은 참조는 null 또는 해당 enum 중 하나(다른 타입일 경우 컴파일 에러)
- namespace 존재하여 이름이 같은 상수도 공존 가능
- 필드의 이름만 공개되기 때문에 enum에 상수 추가나 순서 변경이 있더라도 다시 컴파일하지 않아도 된다.
- enum의 toString()은 출력에 적합한 문자열을 내준다.
- 임의의 메서드나 필드를 추가할 수 있고, 임의의 인터페이스를 구현하게 할 수도 있다.
 
### 데이터와 메서드를 갖는 열거 타입
```java
public enum Planet {
	MERCURY(3.302e+23, 2.439e6),
	VENUS(4.869e+24, 6.052e6),
	EARTH(5.975e+24, 6.378e6),
	MARS(6.419e+23, 3.393e6),
	JUPITER(1.899e+27, 7.149e7),
	SATURN(5.685e+26, 6.027e7),
	URANUS(8.683e+25, 2.556e7),
	NEPTUNE(1.024e+26, 2.447e7);

	// 모든 field final
	private final double mass;            // 질량(단위: kg)
	private final double radius;          // 반지름(단위: m)
	private final double surfaceGravity;  // 표면중력(단위: m / s^2)

	// 중력상수 (단위: m^3 / kg s^2)
	private static final double G = 6.67300E-11;

	// 생성자
	Planet(double mass, double radius) {
		this.mass = mass;
		this.radius = radius;
		this.surfaceGravity = G * mass / (radius * radius);
	}

	public double surfaceWeight(double mass) {
		return mass * surfaceGravity;
	}
}
```
- 열거 타입 상수 각각을 특정 데이터와 연결지으려면 생성자에서 데이터를 받아 인스턴스 필드에 저장하면 된다.
- 모든 field는 final이어야 한다. (참고로, field를 private으로 두고 public 접근자 메서드를 두는 게 낫다)
- 자신 안에 정의된 상수들의 값을 배열에 담아 반환하는 정적 메서드 values()를 제공한다. (선언된 순서)
- 상수 이름을 입력받아 그 이름에 해당하는 상수를 변환해주는 valueOf(String)이 자동 생성된다.
- 각 열거 타입 값의 toString()은 상수 이름을 문자열로 반환한다
- 상수가 제거되면 해당 상수를 참조하고 있던 클라이언트는 컴파일할 때 오류가 발생할 것이다.(정수 열거 패턴에서는 이런 걸 기대할 수 없다)

### 상수별 메서드 구현
```java
// 좋지 않은 형태
public enum Operation {
    PLUS, MINUS, TIMES, DIVIDE;
	
	// 상수가 뜻하는 연산 수행
	public double apply(double x, double y) {
		switch(this) {
			case PLUS:   return x + y;
			case MINUS:  return x - y;
			case TIMES:  return x * y;
			case DIVIDE: return x / y;
		}
		throw new AssertionError("알 수 없는 연산: " + this);
	}
}
```
- throw문에 도달할 일이 없지만 생략하면 컴파일되지 않는다.
- 상수가 새로 추가되었을 때 case문이 추가되지 않으면 런타임에 오류가 발생한다.


```java
public enum Operation {
    PLUS("+")   { public double apply(double x, double y) { return x + y; } },
    MINUS("-")  { public double apply(double x, double y) { return x - y; } },
    TIMES("*")  { public double apply(double x, double y) { return x * y; } },
    DIVIDE("/") { public double apply(double x, double y) { return x / y; } };
    
	private final String symbol;
	
	// 생성자
	Operation(String symbol) { this.symbol = symbol; }
    public abstract double apply(double x, double y);
	@override public String toString() { return symbol; }
}

public static void main(String[] args) {
	double x = Double.parseDouble(args[0]);
	double y = Double.parseDouble(args[1]);
	for (Operation op : Operation.values())
		System.out.printf("%f %s %f = %f%n", x, op, y, op.apply(x, y));
}
```
- apply()가 추상 메서드라서 재정의하지 않으면 컴파일 에러가 발생한다.
- 열거 타입 상수끼리 코드를 공유하기 어렵다는 단점이 있다.

### 전략(strategy) 열거 타입 패턴
```java
// 좋지 않은 형태
enum PayrollDay {
	MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;

	private static final int MINS_PER_SHIFT = 8 * 60;

	int pay(int minutesWorked, int payRate) {
		int basePay = minutesWorked * payRate;
		int overtimePay;
		switch(this) {
			case SATURDAY: case SUNDAY: // 주말
				overtimePay = basePay / 2;
				break;
			default: // 주중
				overtimePay = minutesWorked <= MINS_PER_SHIFT ? 0 : 
					(minutesWorked - MINS_PER_SHIFT) * payRate / 2;
		}
		return basePay + overtimePay;
	}
}
```
- 간결하나, 관리 관점에서 위엄한 코드
- 새로운 값을 enum에 추가하려면 case문을 잊지 말고 쌍으로 넣어줘야 하는 것
- 상수별 메서드 구현은 코드가 장황해져 가독성이 크게 떨어지고 오류 발생 가능성이 높다

```java
// 전략(strategy) 열거 타입 패턴 적용
enum PayrollDay {
	MONDAY(WEEKDAY), TUESDAY(WEEKDAY), WEDNESDAY(WEEKDAY), 
	THURSDAY(WEEKDAY), FRIDAY(WEEKDAY),
	
	SATURDAY(WEEKEND), SUNDAY(WEEKEND);

	private final PayType payType;

	PayrollDay(PayType payType) {
		this.payType = payType;
	}

	int pay(int minutesWorked, int payRate) {
		return payType.pay(minutesWorked, payRate);
	}

	// nested class
	enum PayType {
		WEEKDAY {
			int overtimePay(int minutesWorked, int payRate) {
				return minutesWorked <= MINS_PER_SHIFT ? 0 : (minutesWorked - MINS_PER_SHIFT) * payRate / 2;
			}
		},

		WEEKEND {
			int overtimePay(int minutesWorked, int payRate) {
				return minutesWorked * payRate / 2;
			}
		};

		abstract int overtimePay(int minutesWorked, int payRate);
		private static final int MINS_PER_SHIFT = 8 * 60;

		int pay(int minutesWorked, int payRate) {
			int basePay = minutesWorked & payRate;
			return basePay + overtimePay(minutesWorked, payRate);
		}
	}
}
```
- 잔업 수당 계산을 private 중첩 enum 타입인 PayType에 위임한다.
- switch문보다는 복잡하지만 더 안전하고 유연하다

### switch문을 이용한 기능 수행
```java
// Thirdparty에서 가져온 Operation 열거 타입을 이용해야 할 때
public static Operation inverse(Operation op) {
	switch(op) {
		case PLUS:   return Operation.MINUS;
		case MINUS:  return Operation.PLUS;
		case TIMES:  return Operation.DIVIDE;
		case DIVIDE: return Operation.TIMES;
		
		default: throw new AssertionError("알 수 없는 연산: " + op);
	}
}
```
- switch문이 열거 타입의 상수별 동작을 구현하는 데 적합하지 않으나, 상수별 동작을 혼합에 넣을 때는 좋은 선택이 될 수 있다.
 

### 핵심 정리
- 열거 타입이 정수 상수보다 더 읽기 쉽고 안전하고 강력하다
- 각 상수를 특정 데이터와 연결짓거나 상수마다 다르게 동작하게 할 수 있다.
- 하나의 메서드가 상수별로 다르게 동작해야 할 때는 switch문 대신 상수별 메서드 구현을 사용하자
- 상수 일부가 같은 동작을 공유한다면 전략 열거 타입 패턴을 사용하자
- 필요한 원소를 컴파일타임에 다 알 수 있는 상수 집합이라면 항상 열거 타입을 사용하자
	- E.g. 태양계 행성, 체스 말, 메뉴 아이템, 연산 코드, 명령줄 플래그 등
	- 정의된 상수의 개수가 영원히 불변일 필요는 없다. (상수 추가돼도 바이너리 호환 가능)

### 참고
- https://woowabros.github.io/tools/2017/07/10/java-enum-uses.html

## [item40] @Override 애너테이션을 일관되게 사용하라
@Override는 메서드 선언에만 달 수 있으며, 이 애너테이션이 달렸다는 것은 상위 타입의 메서들르 재정의했음을 뜻한다.

```java
// 영어 알파벳 2개로 구성된 문자열을 표현하는 클래스 - 버그 존재
public class Bigram {
	private final char first;
	private final char second;
	
	public Bigram(char first, char second) {
		this.first = first;
		this.second = second;
	}
	public boolean equals(Bigram b) {
		return b.first == first && b.second == second;
	}
	public int hashCode() {
		return 31 * first + second;
	}
	
	public static void main(String[] args) {
		Set<Bigram> s = new HashSet<>();
		for (int i = 0; i < 10; i++)
			for (char ch = 'a'; ch <= 'z'; ch++)
				s.add(new Bigram(ch, ch));
		Sytem.out.println(s.size()); // '260' 출력
	}
}
```
- 똑같은 소문자 2개로 구성된 바이그램 26개를 10번 반복해 집합에 추가한 다음, 그 집합의 크기를 출력한다.  
  Set은 중복을 허용하지 않아 26이 출력될 거 같지만, 실제로는 260이 출력된다.
- equals를 재정의(overriding)한 게 아니라 다중정의(overloading)를 한 것이다.
- Object의 equals를 재정의하려면 매개 변수 타입을 Object로 해야만 했다.
- Object의 equals는 == 연산자와 같이 객체 식별성(identity)만을 확인한다.
- 같은 소문자를 소유한 바이그램 10개 각각이 서로 다른 객체로 인식

```java
// 컴파일 에러가 발생하여 잘못된 코드임을 미리 확인할 수 있다.
@Override public boolean equals(Bigram b) {
	return b.first == first && b.second == second;
}
```

```java
// 올바르게 수정된 코드
@Override public boolean equals(Object o) {
	if (!(o instanceof Bigram))
		return false;
	Bigram b = (Bigram) o;
	return b.first == first && b.second == second;
}
```

### 핵심 정리
상위 클래스의 메서드를 재정의하려는 모든 메서드에 @Override 애너테이션을 달자. 컴파일러가 여러분의 실수를 알려줄 것이다.  
예외는 한 가지뿐이다. 구체 클래스에서 상위 클래스의 추상 메서드를 재정의할 때는 이 애너테이션을 달지 않아도 되나(이 또한, 컴파일러가 알려준다), 단다고 해로울 것도 없다.



## [item47] 반환 타입으로는 스트림보다 컬렉션이 낫다

일련의 원소(원소 시퀀스)를 리턴할 때의 타입
- Collection, Set, List 같은 컬렉션 인터페이스(기본)
- Iterable
- 배열(성능에 민감한 상황)
- 스트림

스트림이 도입되면서 리턴 타입의 선택이 복잡해졌다.  

### 스트림의 반복 지원
스트림은 Iterable을 확장(extends)하지 않아 반복(iteration)을 지원하지 않는다. 따라서, 스트림과 반복을 알맞게 조합해야 좋은 코드가 나온다.

```java
// Stream의 iterator 메서드에 메서드 참조를 건네 스트림의 반복을 지원 - Compile 에러(타입 추론 한계)
for (ProcessHandle p : ProcessHandle.allProcesses()::iterator) { 
	// process 처리
}

// Stream의 iterator 메서드에 메서드 참조를 건네어 스트림의 반복을 지원 - 스트림 반복을 위한 '끔찍한' 우회 방법
for (ProcessHandle p : (Iterable<ProcessHandle>) ProcessHandle.allProcesses()::iterator) {
	// process 처리
}
```  

어댑터 메서드 작성을 통해 개선 가능하다.
```java
// Stream<E>를 Iterable<E>로 중개해주는 어댑터
public static <E> Iterable<E> iterableOf(Stream<E> stream) {
	return stream::iterator;
}

for (ProcessHandle p : iterableOf(ProcessHandle.allProcesses())) {
	// process 처리
}
```

```java
// Iterable<E>를 Stream<E>로 중개해주는 어댑터
public static <E> Stream<E> streamOf(Iterable<E> iterable) {
	return StreamSupport.stream(iterable.spliterator(), false); // 2nd param은 parallel 여부
}
```

공개 API를 작성한다면 스트림 파이프라인 사용자와 반복문 사용자 모두를 배려해야 한다.

### 일반적으로 Collection 또는 그 하위 타입을 쓰는 게 최선이다.
Collection 인터페이스는 Iterable의 하위 타입이고 stream 메서드도 제공하니 **반복과 스트림을 동시에 지원**한다.  
따라서, **원소 시퀀스를 리턴하는 공개 API의 리턴 타입에는 일반적으로 Collection 또는 그 하위 타입을 쓰는 게 최선**이다.  
하지만, **단지 컬렉션을 리턴한다는 이유로 덩치 큰 시퀀스를 메모리에 올려서는 안 된다.**  

리턴할 시퀀스가 크지만 표현을 간결하게 할 수 있다면 전용 Collection을 구현하는 방안도 생각해보자.  

### 전용 Collection 예제
주어진 집합의 멱집합(한 집합의 모든 부분집합을 원소로 하는 집합)을 리턴하는 상황  
원소 개수가 n개 이면 멱집합의 원소 개수는 2^n개(지수배로 증가)  

참고) 
{a, b, c}의 멱집합은 { {}, {a}, {b}, {c}, {a, b}, {a, c}, {b, c}, {a, b, c} }  
<br>

AbstractList를 이용하여 컬렉션 구현
- 각 원소의 인덱스를 비트벡터로 사용(n번째 비트 값은 해당 원소가 n번째 원소 포함 여부)
- 0부터 2^n - 1 까지의 이진수와의 매핑

```java
public class PowerSet {
    public static final <E> Collection<Set<E>> of(Set<E> s) {
       List<E> src = new ArrayList<>(s);
       if(src.size() > 30) { // Collection을 리턴 타입으로 쓸 때의 단점
           throw new IllegalArgumentException("집합에 원소가 너무 많습니다(최대 30개).: " + s);
       }

       return new AbstractList<Set<E>>() {
           @Override
           public int size() {
               return 1 << src.size(); // 2^n
           }

           @Override
           public boolean contains(Object o) {
               return o instanceof Set && src.containsAll((Set) o);
           }

           @Override
           public Set<E> get(int index) {
               Set<E> result = new HashSet<>();
               for (int i = 0; index != 0; i++, index >>=1) {
                   if((index & 1) == 1) {
                       result.add(src.get(i));
                   }
               }
               return result;
           }
       };
    }
}
```

AbstractCollection을 활용하여 Collection 구현체를 작성할 때는 Iterable용 메서드 외의 contains와 size만 더 구현하면 된다.  
contains와 size를 구현하는 게 불가능하다면 컬렉션보다는 스트림이나 Iterable을 리턴하는 편이 낫다(별도의 메서드를 부어 두 방식 모두 제공해도 된다).


### 입력 리스트의 모든 부분리스트를 스트림으로 리턴 예제
부분 리스트를 구하는 방법 
- (a, b, c)의 prefixes - (a), (a, b), (a, b, c)
- (a, b, c)의 suffixes - (c), (b, c), (a, b, c)
- 빈 리스트(empty list)

```java
public class SubList {
    public static <E> Stream<List<E>> of(List<E> list) {
        return Stream.concat(Stream.of(Collections.emptyList()),			// 빈 리스트
                             prefixes(list).flatMap(SubList::suffixes));
    }

    public static <E> Stream<List<E>> prefixes(List<E> list) {
        return IntStream.rangeClosed(1, list.size())
                        .mapToObj(end -> list.subList(0, end));
    }

    public static <E> Stream<List<E>> suffixes(List<E> list) {
        return IntStream.rangeClosed(0, list.size())
                        .mapToObj(start -> list.subList(start, list.size()));
    }
}
```

```java
public static <E> Stream<List<E>> of(List<E> list) {
	return IntStream.range(0, list.size())
		.mapToObj(start -> 
			IntStream.rangeClosed(start + 1, list.size())
				.mapToObj(end -> list.subList(start, end)))
		.flatMap(x -> x);
}
```
스트림 리턴만 제공되니 반복문 사용이 필요할 때에는 Iterable로 변환해주는 어댑터를 이용해야 한다.
(코드가 어수선해지고, 작가 컴퓨터로 2.3배 더 느리다.)
(책에는 안 나온) 직접 구현한 Collection이 스트림보다 1.4배(작가 컴퓨터) 빨랐다(코드는 더 지저분해졌다).


### 핵심 정리
- 원소 시퀀스를 리턴하는 메서드를 작성할 때 스트림 사용자와 반복문 사용자가 모두 있을 수 있기에 양쪽을 만족시키려고 노력하자
- 컬렉션을 리턴할 수 있다면 컬렉션을 이용하자
	- 원소 개수가 적거나 이미 컬렉션에 담아 관리하고 있으면 표준 컬렉션(E.g ArrayList)을 이용하자
	- 그 외에는 전용 컬렉션(E.g 멱집합)을 구현하는 것을 고려하자
- 컬렉션을 리턴할 수 없다면 스트림이나 Iterable 중 더 나은 것을 이용하자
- 만약 나중에 Stream 인터페이스가 Iterable을 지원하도록 수정된다면, 스트림 처리와 반복에 모두 사용 가능하니 안심하고 스트림을 리턴하면 될 것이다.


## [item54] null이 아닌, 빈 컬렉션이나 배열을 반환하라

```java
// 따라 하지 말 것! - 재고가 없다고 특별 취급할 이유는 없다.

private final List<Cheese> cheesesInStock = ...;

/**
 * @return 매장 안의 모든 치즈 목록을 반환한다.
 * 	단, 재고가 하나도 없다면 null을 반환한다.
 */
public List<Cheese> getCheeses() {
	return cheesesInStock.isEmtpy() ? null
		: new ArrayList<>(cheesesInStock);
}
```
```java
// client 측에서 null을 리턴하는 메서드를 사용하기 위해서는 항상 이와 같은 방어코드를 넣어줘야 한다.
List<Cheese> cheeses = shop.getCheeses();
if (cheeses != null && cheeses.contains(Cheese.M\ozzarell
	...
}
```
<br>

### 빈 컨테이너를 할당하여 리턴하는 것이 null 리턴보다 나은 점
- 성능 저하의 주범이라고 확인되지 않았다면 이 정도 성능 차이는 거의 없다.
- 빈 컬렉션과 빈 배열은 새로 할당하지 않고도 리턴할 수 있다.
<br>

### 빈 컬렉션 리턴

```java
// 빈 컬렉션을 리턴하는 올바른 예
public List<Cheese> getCheeses() {
	return new ArrayList<>(cheesesInStock);
}
```
<br>

매번 똑같은 빈 '불변(immutable)' 컬렉션을 리턴하여 최적화
- Colections.emptyList()
- Colections.emptySet()
- Colections.emptyMap()

```java
// 최적화 - 빈 '불변(immutable)' 컬렉션 리턴(꼭 필요할 때만 사용하고, 성능 개선이 되는지 확인 필수)
public List<Cheese> getCheeses() {
	return cheesesInStock.isEmtpy() ? Collections.emptyList()
		: new ArrayList<>(cheesesInStock);
}
```
> 참고)
> - 불변은 Thread-safe하다.
> - 불변에 add와 같은 변화를 시도한다면 UnsupportedOperationException이 발생할 수 있으므로, 조심히 사용해야 한다.

<br>

### 빈 배열 리턴
```java
// 길이가 0일 수도 있는 배열을 리턴하는 올바른 방법
public Cheese[] getCheeses() {
	return cheesesInStock.toArray(new Cheese[0]);
}
```
> 참고)
> - \<T> T[] List.toArray(T[] a) 메서드는 a의 사이즈가 크면 a 안에 원소를 담아 리턴한다.
> - a의 사이즈가 List보다 작으면 T[] 타입을 새로 만들어 그 안에 원소를 담아 반환한다.
> - cheesesInStock의 사이즈가 1 이상이면 배열을 새로 생성해 리턴하고, 사이즈가 0이면 0인 배열을 새로 생성해 리턴한다.
<br>

```java
// 최적화 - 길이 0짜리 배열을 미리 선언해두고 매번 그 배열을 반환(길이 0인 배열은 모두 불변)
private static final Cheese[] EMTPY_CHEESE_ARRAY = new Cheese[0];

public Cheese[] getCheeses() {	
	return cheesesInStock.toArray(EMTPY_CHEESE_ARRAY);
}
```
> 참고)
> - cheesesInStock의 사이즈가 1 이상이면 배열을 새로 생성해 리턴하고, 사이즈가 0이면 EMPTY_CHEESE_ARRAY를 리턴한다.
> - array identity를 사용한다면 문제가 될 수 있기에, 모든 곳에 위 코드로 치환하는 것은 유효하지 않다.(https://shipilev.net/blog/2016/arrays-wisdom-ancients/)

<br>

단순히 성능 개선 목적으로 toArray에 넘기는 배열을 미리 할당하는 건 오히려 [성능이 떨어진다는 연구 결과](https://shipilev.net/blog/2016/arrays-wisdom-ancients/)도 있다.
```java
// 나쁜 예
return cheesesInStock.toArray(new Cheese[cheesesInStock.size()]);
```

<br>

### 핵심 정리
null은 예외처리가 필요하기 때문에, **빈 배열이나 빈 컬렉션을 리턴**하라.



## [item61] 박싱된 기본 타입보다는 기본 타입을 사용하라

- 데이터 타입
  - 기본 타입
  - 참조 타입

- 기본 타입에는 대응하는 참조 타입이 하나씩 있고, 이를 `박싱된 기본 타입`이라고 한다.
  - Integer(int)
  - Double(double)
  - Boolean(boolean)

### 기본 타입과 박싱된 기본 타입의 차이점
- 기본 타입은 값만 가지고 있으나, 박싱된 기본 타입은 값에 더해 식별성(identity)이란 속성을 갖는다(값이 같아도 서로 다르다고 식별될 수 있다).
- 기본 타입의 값은 언제나 유효하나, 박싱된 기본 타입은 유효하지 않은 값(null)을 가질 수 있다.
- 기본 타입이 박싱된 기본 타입보다 시간과 메모리 사용면에서 더 효율적이다.

### 기본 타입과 박싱된 기본 타입의 차이를 무시한 대가
```java
// 문제가 있는 코드1
Comparator<Integer> naturalOrder = (i, j) -> (j < j) ? -1 : (i == j ? 0 : 1);

naturalOrder.compare(new Integer(42), new Integer(42)); // 1

// TMI
naturalOrder.compare(Integer.valueOf(42), Integer.valueOf(42)); // 0
naturalOrder.compare(Integer.valueOf(123456789), Integer.valueOf(123456789)); // 1
```
첫 번째 검사(i < j)에서는 i와 j가 참조하는 오토박싱된 Integer 인스턴스는 기본 타입 값으로 변환되어 잘 동작한다. 
두 번째 검사(i == j)에서 두 '객체 참조'의 식별성을 검사하게 되어 문제가 발생한다.  
i와 j가 서로 다른 Integer 인스턴스라서 비교 결과가 false가 되고, comparator는 1을 리턴한다. 
**박싱된 기본 타입에 == 연산자를 사용하면 대개 내가 원하지 않는 방향으로 가게 된다.**

기본 타입을 다루는 Comparator가 필요하다면 Comparator.NaturalOrder()를 사용하자
```java
List<Integer> values = Arrays.asList(212, 324, 435, 566, 133, 100, 121); 
values.sort(Comparator.naturalOrder()); // 100, 121, 133, 212, 324, 435, 566 (오름차순)
```

```java
// 문제를 수정한 Comparator
Comparator<Integer> naturalOrder = (iBoxed, jBoxed) -> {
	int i = iBoxed, j = jBoxed; // 오토박싱
	return i < j ? -1 : (i == j ? 0 : 1);
}
```

```java
// 문제가 있는 코드2
public class Unbelievable {
	static Integer i;
	
	public static void main(String[] args) {
		if (i == 42)
			System.out.println("Unbelievable");
	}
}
```
i == 42를 검사할 때 NullPointerException을 던진다. 원인은 int가 아니라 Integer인 i의 초깃값이 null이라는 데 있다. 
i == 42에서 Integer와 int를 비교하게 되고, 거의 예외 없이 **기본 타입과 박싱된 기본 타입을 혼용한 연산에서는 박싱된 기본 타입의 박싱이 자동으로 풀린다.** 그리고 null 참조를 언박싱하면 NullPointerException이 발생한다.
```java
// 해결
static int i;
```

```java
// 문제가 있는 코드3
public static void main(String[] args) {
	Long sum = 0L;
	
	for (long i = 0; i <= Integer.MAX_VALUE; i++) {
		sum += i;
	}
	System.out.println(sum);
}
```
컴파일 에러는 없지만, 지역 변수 sum을 박싱된 기본 타입으로 선언하여 for문의 반복 횟수만큼 박싱이 일어나 성능이 느려진다.

### 박싱된 기본 타입을 사용하는 경우
- 컬렉션의 원소, 키, 값
  - 매개변수화 타입이나 매개변수화 메서드의 타입 매개변수로는 박싱된 기본 타입을 써야 한다(Java가 타입 매개변수로 기본 타입을 지원하지 않는다).
    - E.g.
	```java
	Threadlocal<int>     // 불가능
	Threadlocal<Integer> // 가능
	```
- 리플렉션을 통한 메서드 호출
 
### 핵심 정리
- 가능하면 박싱된 기본 타입보다 더 간단하고 빠른 기본 타입을 사용하라.  
- **오토박싱이 박싱된 기본 타입을 사용할 때의 번거로움을 줄여주지만, 그 위험까지 없애주지 않으니 주의해서 사용하자.**  
- 주의해야 할 사항
  - 두 박싱된 기본 타입을 == 연산자로 비교한다면 식별성 비교가 이뤄지고, 이는 원하는 방향이 아닐 가능성이 크다.
  - 같은 연산에서 기본 타입과 박싱된 기본 타입을 혼용하면 언박싱이 이뤄지며, **null 참조를 언박싱하면 NullpointerException이 발생**한다.
  - 기본 타입을 박싱하는 작업은 '불필요한 객체 생성'을 하는 부작용이 발생할 수 있다.


## [item68] 일반적으로 통용되는 명명 규칙을 따르라

자바 플랫폼은 명명 규칙이 잘 정립되어 있고, 규칙은 크게 철자와 문법으로 나뉜다.

<br>

### 철자 규칙
패키지, 클래스, 인터페이스, 메서드, 필드 타입 변수의 이름을 다룬다.  
이 규칙들은 특별한 이유가 없는 한 반드시 따라야 한다.

- 패키지와 모듈
  - 각 요소를 점(.)으로 구분하여 계층적으로 짓는다.
  - 요소들은 모두 소문자 알파벳 혹은 숫자로 이뤄진다.
  - 조직 바깥에서도 사용될 패키지라면 조직의 인터넷 도메인 이름을 역순으로 사용한다.
    - E.g. edu.cmu, com.google. org.eff
    - 예외적으로, 표준 라이브러리와 선택적 패키지들은 각각 java와 javax로 시작한다.

- 클래스와 인터페이스
  - 하나 이상의 단어로 이뤄지며, 각 단어는 대문자로 시작 (E.g. List, FutherTask)
  - 여러 단어의 첫 글자만 딴 약자나 max, min 처럼 널리 통용되는 줄임말을 제외하고는 단어를 줄여쓰지 않는다.
  - 약자의 경우 논란이 있지만 첫 글자만 대문자로 하는 쪽이 많다(이 시작과 끝을 명확히 알 수 있다).
    - HttpUrl vs HTTPURL

- 메서드와 필드
  - 첫 글자를 소문자로 쓴다는 점만 빼면 클래스 명명 규칙과 같다 (E.g. remove, ensureCapacity)
  - 첫 단어가 약자라면 해당 약자는 단어 전체가 소문자여야 한다. (E.g httpUrl)
  - 상수 필드는 예외
    - 상수 필드 : static final 필드 및 불변 참조 타입
    - 단어를 모두 대문자로 쓰며, 단어 사이는 밑줄로 구분한다 (E.g. VALUE, POSITIVE_INFINIY)
	- 이름에 밑줄을 사용하는 요소는 상수 필드가 유일

- 지역변수
  - 다른 멤버와 비슷한 명명 규칙 적용
  - 문맥에서 의미 유추가 쉬워 약어를 써도 좋다 (E.g i, denom, hoseNum)
  - 입력 매개변수도 지역변수의 하나이나, 메서드 설명 문서에까지 등장하는 만큼 신경을 더 써줘야 한다.

- 타입 매개변수
  - 임의의 타입 : T (Type)
  - 컬렉션 원소 타입 : E (Element)
  - 맵의 키와 값 : K와 V (Key, Value)
  - 예외 :  X (eXception)
  - 메서드 리턴 타입 : R (Return)
  - 그 외 임의 타입의 시퀀스 : T, U, V 혹은 T1, T2, T3

<br>

### 문법 규칙
철자 규칙에 비해 더 유연하고 논란도 많다. 

- 클래스
  - 객체 생성 가능 : 보통 단수 명사나 명사구 사용(E.g. Thread, priorityQueue, ChessPiece)
  - 객체 생성 불가능 : 보통 복수형 명사(E.g. Collectors, Collections)
 
- 인터페이스
  - 클래스와 동일하게 짓는다(E.g. Collection, Comparator).
  - able, ible로 끝나는 형용사로 짓는다(E.g. Runnable, Iterable, Accessible)

- 메서드
  - 동작 수행 : 동사, 동사구(E.g. append, drawImage)
  - boolean 타입 리턴 : is, has로 시작하고 명사나 명사구 혹은 형용사로 기능하는 아무 단어나 구로 끝나도록 짓는다
	(E.g. isDigit, isProbablePrime, isEmpty, isEnabled, hasSiblings)
  - 해당 인스턴스의 속성 리턴
    - 보통 명사, 명사구 (E.g. Size, hashCode)
	- get으로 시작하는 동사구로 짓는다 (E.g. getTime)
	  - 주로 JavaBeans 명세에 뿌리를 두고 있다
	  - 클래스가 한 속성의 getter와 setter를 모두 제공할 때도 적합한 규칙 (E.g. getAttribute, setAttribute)
    - get으로 시작하는 형태**만** 써야한다는 주장도 있지만 근거가 빈약하다(명사, 명사구 사용 코드가 더 가독성이 좋다).
      ```java
	  if (car.speed() > 2 * SPEED_LIMIT)
	    generateAudibleAlert("제한 속도 초과");
      ```  
	  
  - 특별한 메서드
    - 객체의 타입을 바꿔, 다른 타입의 또 다른 객체를 반환하는 인스턴스 메서드 : to*Type* (E.g. toString, toArray)
	- 객체의 내용을 다른 뷰로 보여주는 메서드 : as*Type* (E.g. asList)
	- 객체의 값을 기본 타입 값으로 변환하는 메서드 : *type*Value (E.g. intValue)
	- 정적 팩터리 : from, of, valueOf, instance, getInstance, newInstance, get*Type*, new*Type* 등을 사용

- 필드
  - 필드가 직접 노출될 일이 거의 없기 때문에 규칙이 덜 명확하고 덜 중요하다.
  - boolean 타입 : 보통 boolean 접근자 메서드에서 앞 단어를 뺀 형태 (E.g. initialized, composite)
  - 다른 타입의 필드 : 명사나 명사구 (E.g. height, digits, bodyStyle)

- 지역변수
  - 필드와 비슷, 조금 더 느슨

<br>

### 핵심 정리
- 철자 규칙은 직관적이라 모호하지 않은데, 문법 규칙은 더 복잡하고 느슨하다
- 명명 규칙을 체화하자
- 상식이 이끄는대로 따르자
 
## [item75] 예외의 상세 메시지에 실패 관련 정보를 담으라

### 스택 추적(stack strace)
- 예외를 잡지 못해 프로그램이 실패하면 자바 시스템은 그 예외의 **스택 추적(stack trace)** 정보를 자동으로 출력
- 스택 추적은 **예외 객체의 toString 메서드를 호출**해 얻는 문자열로, 예외의 클래스 이름 뒤에 상세 메시지가 붙는 형태
  - toString 메서드에 실패 원인에 대한 정보를 최대한 담는 것이 중요(실패 순간의 상황을 정확히 포착)

<br>

### 실패 메시지 작성 방법 및 주의 사항
- 발생한 예외에 관여된 모든 매개변수와 필드의 값을 실패 메시지에 담아야 한다. 어떤 부분에서 문제가 발생했는지를 알 수 있다.
  - IndexOutOfBoundsException의 상세 메시지는 범위의 최솟값과 최댓값, 그리고 범위를 벗어났다는 인덱스 값을 담아야 한다.
- 스택 추정 정보는 많은 사람이 볼 수 있어, 상세 메시지에 보안 관련 정보(E.g 비밀번호, 암호 키)를 담아서는 안 된다.
- 문서와 소스코드에 대한 정보는 넣지 않는 게 좋다.
  - 스택 추적에는 예외 발생한 파일 이름과 줄번호, 스택에서 호출한 다른 메서드들의 파일 이름과 줄번호까지 정확히 기록되어 있다.
- 최종 사용자에게는 친절한 안내 메시지를 보여주는 반면, 예외 메시지는 가독성보단 담긴 내용이 훨씬 중요하다.
- 필요한 정보를 예외 생성자에서 모두 받아 상세 메시지까지 미리 생성해놓는 방법도 좋다.
  ```java
  // 기존 코드
  public class IndexOutOfBoundsException extends RuntimeException {
    private static final long serialVersionUID = 234122996006267687L;
  
    public IndexOutOfBoundsException() {
    }
  
    public IndexOutOfBoundsException(String s) {
      super(s);
    }
  
    // Since Java9
    public IndexOutOfBoundsException(int index) {
      super("Index out of range: " + index);
    }
  }
  
  // 작가에 의해 수정된 코드
  public class IndexOutOfBoundsException extends RuntimeException {
  
    private final int lowerBound;
    private final int upperBound;
    private final int index;
  
    /**
     * IndexOutOfBoundsException을 생성한다.
     *
     * @param lowerBound 인덱스의 최솟값
     * @param upperBound 인덱스의 최댓값 + 1
     * @param index 인덱스의 실젯값
     */
    public IndexOutOfBoundsException(int lowerBound, int upperBound, int index) {
      // 실패를 포착하는 상세 메시지를 생성한다.
      // 고품질 상세 메시지 생성 코드를 예외 클래스 안으로 모아주어, 메시지 생성 작업을 중복하지 않아도 된다.
      super(String.format("최솟값: %d, 최댓값: %d, 인덱스: %d",
                          lowerBound, upperBound, index));
  
      // 프로그램에서 이용할 수 있도록 실패 정보를 저장해둔다.
      this.lowerBound = lowerBound;
      this.upperBound = upperBound;
      this.index = index;
    }
  }
  ``` 
- 예외는 실패와 관련된 정보를 얻을 수 있는 접근자 메서드를 제공하는 것이 좋다(E.g. lowerBound, upperBound, index).
  - 포착한 실패 정보는 예외 상황 복구에 유용하여 특히 검사 예외에서 빛을 발한다.


## [item82] 스레드 안전성 수준을 문서화하라

자바독이 기본 옵션에서 생성한 API 문서에는 synchronized 한정자가 포함되지 않는다. 메서드 선언에 synchronized 한정자를 선언할지는 구현 이슈일 뿐 API에 속하지 않는다. 따라서 이것만으로는 그 메서드가 스레드 안전하다고 믿기 어렵다.


### 스레드 안전성 수준(안전성 높은 순서로 나열)
- 불변(immutable) 
  - 이 클래스의 인스턴스는 마치 상수와 같아 외부 동기화도 필요 없다
  - E.g. String, Long, BigInteger
- 무조건적인 스레드 안전(unconditionally thread-safe)
  - 이 클래스의 인스턴스는 수정될 수 있지만 내부에서도 충실히 동기화하여 별도의 외부 동기화없이 동시에 사용해도 안전
  - E.g. AtomicLong, ConcurrentHashMap
- 조건부 스레드 안전(conditionally thread-safe)
  - 무조건적인 스레드 안전성과 같지만 일부 메서드는 동시에 사용하려면 외부 동기화가 필요합니다.
  - E.g. Collections.synchronized Wrapper 메서드가 리턴한 컬렉션(이 컬렉션들이 리턴한 반복자는 외부에서 동기화해야 한다)
- 스레드 안전하지 않음(not thread-safe)
  - 이 클래스의 인스턴스는 수정될 수 있고, 동시에 사용하려면 각각의 메서드 호출을 클라이언트가 선택한 외부 동기화 로직으로 감싸야 한다.
  - E.g. ArrayList, HashMap
- 스레드 적대적(thread-hostile)
  - 외부 동기화로 감싸더라도 멀티스레드 환경에서 안전하지 않습니다.
  - 이러한 클래스는 동시성을 고려하지 않고 만들다보면 우연히 만들어집니다.


### 조건부 스레드 안전 클래스의 문서화
- 조건부 스레드 안전한 클래스는 주의하여 문서화해야 한다.
  - 어떠한 순서로 호출할 때 외부 동기화 로직이 필요한지, 그리고 그 순서로 호출하려면 어떤 락을 얻어야만 하는지 알려주어야 한다.
  - 일반적으로 인스턴스 자체를 락으로 얻지만, 예외도 있다.  
  ```java
  // synchronizedMap이 반환한 맵의 콜렉션 뷰를 순회하려면, 뷰(인스턴스 자체)가 아닌 반드시 그 맵을 락으로 사용해 수동으로 동기화하라
  
  Map<K, V> m = Collections.synchronizedMap(new HashMap());
  Set<K> s = m.keySet();  // 동기화 블록 밖에 있어도 된다.
      ...
  synchronized (m) {  // s가 아닌 m을 사용해 동기화해야 한다.
      for (K key : s)
  	    key.f();
  }
  
  // 이대로 따르지 않으면 동작을 예측할 수 없다
  ```

- 클래스의 스레드 안전성은 보통 클래스의 문서화 주석에 기재
- 독특한 특성의 메서드라면 해당 메서드의 주석에 기재
- 열거타입은 굳이 불변이라고 쓸 필요 없음
- 리턴 타입만으로는 명확히 알 수 없는 정적 팩터리는 자신이 리턴하는 객체의 스레드 안전성을 반드시 문서화해야 한다(Collections.synchronizedMap이 좋은 예)


### 외부에서 사용할 수 있는 lock의 주의점
- 클래스가 외부에서 사용할 수 있는 lock을 제공하면 클라이언트에서 일련의 메서드 호출을 원자적으로 할 수 있다.
- 내부에서 처리하는 고성능 동시성 제어 메커니즘과 혼용할 수 없게 된다.
- 클라이언트가 공개된 lock 오래 쥐고 놓지 않는 서비스 거부 공격(denial-of-service attack)을 수행할 수 있다.
  - 이 공격을 막기 위해서는 공개된 lock이나 마찬가지인 synchronized 메서드 대신 비공개 lock 객체를 사용해야 한다.

### 비공개 lock 객체 관용구
```java
private final Object lock = new Object();

public void someMethod() {
    synchronized(lock) {
        ...
    }
}
```
- lock 필드를 항상 final로 선언하라
  - lock 객체가 우연히라도 교체되는 일 예방
  - 일반적인 감시 lock, java.util.concurrent.locks 패키지에서 가져온 lock 모두 해당
- 비공개 lock 객체 관용구는 무조건적 스레드 안전 클래스에서 사용할 수 있다
  - 조건부 스레드 안전 클래스에서는 특정 호출 순서에 필요한 락이 무엇인지를 클라이언트에게 알려줘야 하므로 이 관용구를 사용할 수 없다.

## [item89] 인스턴스 수를 통제해야 한다면 readResolve 보다는 열거 타입을 사용하라

### 싱글턴 클래스
```java
// 생성자 호출을 막아 인스턴스가 오직 하나만 만들어짐을 보장
public class Elvis {
    public static final Elvis INSTANCE = new Elvis();
    private Elvis() { ... }
	
	public void leaveTheBuilding() { ... }
}
```
- 이 클래스에 implements Serializable을 추가하는 순간 더 이상 싱글턴이 아니게 된다.
  - 커스텀 직렬를 쓰더라도, 명시적 readObject를 제공하더라도 소용없다.
- 어떤 readObject를 사용하든 이 클래스가 초기화될 때 만들어진 인스턴스와는 별개인 인스턴스가 리턴된다.

- readResolve 기능을 이용하면 readObject가 만들어내 인스턴스를 다른 것으로 대체할 수 있다. 

### Serialaizable을 구현한 싱글턴 클래스의 readResolve 적용
```java
public class Elvis implements Serializable {
    public static final Elvis INSTANCE = new Elvis();
    private Elvis() { ... }
	public void leaveTheBuilding() { ... }
	
	// 진짜 Elvis를 리턴하고, 가짜 Elvis는 가비지 컬렉터에 맡긴다.
    private Object readResolve() {
        return INSTANCE;
    }
}
```
- 역직렬화한 객체의 클래스가 readResolve 메서드를 정의해 뒀다면, 역직렬화 후 새로 생성된 객체를 인수로 이 메서드가 호출되고, 이 메서드가 리턴한 객체 참조가 새로 생성된 객체를 대신해 리턴된다. 
- readResolve를 인스턴스 통제 목적으로 사용한다면 클래스 내부의 객체 참조 타입 인스턴스 필드는 직렬화될 필요가 없으므로 transient를 선언해야 한다.
  - 싱글턴에서는 readResolve 메서드가 최초 생성된 인스턴스를 리턴하게 만들어 readObject 메서드가 만들어낸 새로운 인스턴스가 필요 없고, 인스턴스 변수 역시 직렬화할 필요가 없기 때문이다.
```java
public class Elvis implements Serializable {
    public static final Elvis INSTANCE = new Elvis();
	
	// 객체 참조 타입 인스턴스 필드
    private String[] favoriteSongs = {"Hound Dog", "Heartbreak Hotel"};
  
    private Elvis() {
    }
  
    public void printFavorites() {
        System.out.println(Arrays.toString(favoriteSongs));
    }
  
    private Object readResolve() {
        return INSTANCE;
    }
}
```

### 싱글턴을 원소 하나짜리 열거 타입으로 구현
```java
public enum Elvis {
    INSTANCE;
    private String[] favoriteSongs = {"Hound Dog", "Heartbreak Hotel"};
    public void printFavorites() {
        System.out.println(Arrays.toString(favoriteSongs));
    }
}
```
- 열거 타입 싱글턴이 전통적인 싱글턴보다 우수하다.
- 직렬화와 인스턴스 통제가 모두 필요한 클래스를 작성해야 하는데, 컴파일 타임는 어떤 인스턴스들이 있는지 알 수 없는 경우 열거 타입으로 표현 불가능하기 때문에 readResolve를 사용해야 한다.


## readResolve 메서드의 접근성
- final 클래스
  - 이 메서드는 private이어야 한다.
- final 아닌 클래스
  - private : 하위 클래스에서 사용할 수 없다.
  - package-private : 같은 패키지에 속한 하위 클래스에서만 사용 가능
  - protected, public : 하위 클래스에서 재정의하지 않았다면, 하위 클래스의 인스턴스를 역직렬화하면 상위 클래스의 인스턴스를 생성하여 ClassCastException을 일으킬수 있다.

### 핵심 정리
- 불변식을 통해 인스턴스를 통제해야 한다면 가능한 한 열거 타입을 사용하자
- 여의치 않은 상황에서 직렬화와 인스턴스 통제가 모두 필요하다면 readResolve 메서드를 작성해야 하고, 그 클래스에서 모든 참조 타입 인스턴스 필드를 transient로 선해야한다.

## footnotes
[^1]: 제네릭은 타입을 컴파일러에게 알려주기 때문에, 컴파일러가 알아서 형변환 코드를 추가한다.
