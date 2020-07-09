---
layout    : wiki
title     : Effective Java 3/E 내용 정리
summary   : 
date      : 2020-07-07 19:55:31 +0900
updated   : 2020-07-13 23:19:52 +0900
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
