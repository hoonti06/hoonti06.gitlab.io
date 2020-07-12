---
layout    : wiki
title     : 
summary   : 
date      : 2020-07-07 19:55:31 +0900
updated   : 2020-07-09 09:16:12 +0900
tag       : 
public    : true
published : true
parent    : [[]]
latex     : false
---

## public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라.

### 1. 데이터 캡슐화

#### 1.1 퇴보한 클래스
```java
class Point {
	public double x;
	public double y;
}
```

#### 1.2 캡슐화

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

1. 패키지 바깥에서 접근할 수 있는 클래스는 접근자를 제공하여 내부를 언제든 바꿀 수 있는 유연성

### 2. package-private(default) 클래스 혹은 private 중첩 클래스는 데이터 필드를 노출해도 문제가 없다.

 - 클래서 선언 및 사용하는 코드 면에서 접근자 방식보다 훨신 깔끔(수정 범위가 좁기 때문)
 - public 클래스의 필드를 노출시킨 사례
	- java.awt.package의 Point와 Deimension (아직도 해결되지 못했다, (item67)[https://~~~])

- public 클래스의 final 필드를 직접 노출했을 때
	- 불변식은 보장할 수 있다.
	- 단점
		- API를 변경 않고는 표현 방식 변경 못함
		- 필드를 읽을 때 부수 작업을 수행할 수 없음

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

3. 핵심 정리
- public 클래스는 절대 가변 필드를 직접 노출해서는 안된다.
- 불변 필드라면 노출해도 덜 위험하지만 완전히 안심할 수 없다.
- package-private(default) 클래스나 private 중첩 클래스에서는 (불변이든 아니든) 필드를 노출하는 것이 나을 때도 있다.


