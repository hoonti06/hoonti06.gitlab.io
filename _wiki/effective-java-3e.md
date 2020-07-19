---
layout    : wiki
title     : Effective Java 3/E 내용 정리
summary   : 
date      : 2020-07-07 19:55:31 +0900
updated   : 2020-07-18 02:13:58 +0900
tag       : 
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
[1] : interface의 field는 public static final이 default이다. ([jLS-9](https://docs.oracle.com/javase/specs/jls/se7/html/jls-9.html#jls-9.3))  
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
- 
