---
layout    : category
title     : Effective Java 3/E 내용 정리
summary   : 
date      : 2020-07-07 19:55:31 +0900
updated   : 2020-08-04 03:22:39 +0900
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
	APPLE_FUJI == ORANGE_NAVEL // 경고 메시지 하나 뜨지 않는다.
	```
- 포현력도 좋지 않다.
- namespace를 지원하지 않아 접두어를 쓰는 등의 방법으로 이름 충돌을 방지해야 한다
- 컴파일하면 그 값이 클라이언트 파일에 그대로 새겨진다.(JSL-13.1)
	- 상수의 값이 바뀌면 클라이언트도 반드시 다시 컴파일해야 함
- 정수 대신 문자열 상수를 사용하는 변형 패턴(문자열 열거 패턴, string enum pattern)도 존재한다

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
```{.java .numberLines}
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
	private final double mass;            // 질량(단위: 킬로그램)
	private final double radius;          // 반지름(단위: 미터)
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
	- 정의된 상수 개수가 영원히 불변일 필요는 없다. (상수 추가돼도 바이너리 호환 가능)

### 참고
- https://woowabros.github.io/tools/2017/07/10/java-enum-uses.html



## footnotes
[^1]: 제네릭은 타입을 컴파일러에게 알려주기 때문에, 컴파일러가 알아서 형변환 코드를 추가한다.
