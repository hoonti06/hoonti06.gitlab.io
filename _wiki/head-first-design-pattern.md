---
layout    : wiki
title     : Head First Design Pattern 내용 정리
summary   : 
date      : 2020-07-19 13:16:11 +0900
updated   : 2020-07-19 23:21:24 +0900
tag       : design-pattern
public    : true
published : true
parent    : [[book-contents-summary]]
latex     : false
---

## Strategy 패턴
### 구현할 프로그램 주제
오리 연못 시뮬레이션 프로그램  

### 상속을 통한 구현
```java
// Duck.java
public abstract class Duck {
	public abstract void display();
	
	public void quack() { /* 꽥꽥 */ }
	public void swim() { /* 수영 */ }
	public void fly( /* 날기 */ } // 기존 클래스에 메소드 추가
}

// MallardDuck.java
public class MallardDuck extends Duck {
	@override public void display() { /* 물오리 모양 */ }
}

// RedheadDuck.java
public class RedheadDuck extends Duck {
	@override public void display() { /* 붉은머리 오리 모양 */ }
}

// RubberDuck.java
// 고무 오리
public class RubberDuck extends Duck {
	@override public void display() { /* 고무 오리 */ }
	
	@override public void quack() { /* 삑삑 */ }
	@override public void fly() { /* 아무것도 안함 */ }
}

// DecoyDuck.java
// 나무로 된 가짜 오리
public class DecoyDuck extends Duck {
	@override public void display() { /* 나무 모양 오리 */ }
	
	@override public void quack() { /* 아무것도 안함 */ }
	@override public void fly() { /* 아무것도 안함 */ }
}
```
- Duck의 행동(method)을 제공하는데 있어 상속 사용의 단점
	- Sub 클래스에서 코드가 중복된다.
		- 매번 메소드를 아무것도 하지 않는 메소드로 override
	- 모든 오리의 행동을 알기 힘들다.
	- 실행 시에 특징을 바꾸기 어렵다.
	- Super 클래스의 코드를 변경했을 때 다른 Sub 클래스에 원치 않는 영향을 줄 수 있다.


### 인터페이스를 통한 구현
{% plantuml %}
+abstract class Duck {
	+{abstract} display()
	+swim()
}

+class MallardDuck extends Duck implements Flyable, Quackable {
	+display()
	+fly()
	+quack()
}

+class RedheadDuck extends Duck implements Flyable, Quackable {
	+display()
	+fly()
	+quack()
}

+class RubberDuck extends Duck implements Quackable {
	+display()	
	+quack()
}

+class DecoyDuck extends Duck {
	+display()
}


+interface Flyable {
	+fly()
}

+interface Quackable {
	+quack()
}
{% endplantuml %}

필요한 클래스에서만 인터페이스를 구현하는 방법이 있지만, 복잡해지고 비효율적이다.

### Strategy 패턴 사용을 통한 구현
- 바뀌는 부분과 그렇지 않은 부분 분리하기(디자인 원칙1)
	- 바뀌는 부분 : fly(), quack()
	- fly(), quack() method를 나머지 코드에 영향을 주지 않도록 Duck 클래스로부터 분리한다.
	- 각 행동을 나타낼 클래스 집합을 새로 만들어 [[OOP#2.1. 캡슐화(encapsulation)]]{캡슐화}한다.
		- \<\<interface\>\> FlyBehavior
		- \<\<interface\>\> QuackBehavior
 
- 오리의 행동 디자인하는 방법
	- fly행동과 quack행동을 구현하는 클래스 집합의 디자인
		- 유연성(행동을 동적으로 변경 가능, setter)
	- 구현이 아닌 인터페이스에 맞춰서 프로그래밍(디자인 원칙2)
		- '인터페이스에 맞춰서 프로그래밍한다'의 의미
			- 상위 형식에 맞춰 [[OOP#2.3. 다형성(Polymorphism)]]{다형성}을 활용해야 한다는 것
			- 변수를 선언할 때는 보통 추상 클래스나 인터페이스 같은 상위 형식으로 선언해야 한다. 객체를 변수에 대입할 때 상위 형식을 구체적으로 구현한 형식이라면 어떤 객체든 집어 넣을 수 있다.

				```java
				// Animal.java
				public abstract class Animal {
					makeSound()
				}

				// Dog.java
				public class Dog extends Animal {
					makeSound() { bark(); }
					bark() { /* 멍멍 */ }
				}

				// Cat.java
				public class Cat extends Animal {
					makeSound() { meow(); }
					meow() { /* 야옹 */ }
				}

				// Main.java
				public class Main {
					public static void main(String[] args) {
						//1. 구현에 맞춰 프로그래밍
						Dog d = new Dog();
						d.bark();

						//2. 인터페이스/상위 형식에 맞춰 프로그래밍
						Animal animal = new Dog();
						animal.makeSound();

						//3. 상위 형식의 인스턴스를 만드는 과정을 직접 코드로 만드는 대신 
						//   구체적으로 구현된 객체를 실행 시에 대입 (DI)
						//   가작 바람직한 방법
						a = getAnimal();
						a.makeSound();
					}
				}
				```  

<br>  

- Duck의 행동을 구현하는 방법
	- 장점
		- Duck 클래스 밖에 있기 때문에 다른 형식의 객체에서도 fly행동과 quack 행동을 재사용할 수 있다. 
			- ex> 
				- fly() : Eagle 클래스
				- quack() : 오리 소리를 내는 기계
		- 기존의 행동 클래스를 전혀 건드리지 않고도 새로운 행동을 추가할 수 있다.
 
{% plantuml %}
+interface FlyBehavior {
	+fly()
}

+class FlyWithWings extends FlyBehavior {
	+fly() {\n// 날기 구현\n}
}

+class FlyNoWay extends FlyBehavior {
	+fly() {\n// 아무것도 안함\n}
}


+interface QuackBehavior {
	+quack()
}

+class Quack extends QuackBehavior {
	+quack() {\n// 꽥꽥 소리\n}
}

+class Squeak extends QuackBehavior {
	+quack() {\n// 삑삑 소리\n}
}

+class MuteQuack extends QuackBehavior {
	+quack() {\n// 아무것도 안함\n}
}
{% endplantuml %}  

<br>  


- Duck 행동 통합하기
	- Duck에서 fly 행동과 quack 행동을 Duck클래스 내부에서 정의한 메소드를 사용 및 구현하는 것이 아닌, 다른 클래스에 위임한다

{% plantuml %}
+abstract class Duck {
	-FlyBehavior flyBehavior
	-QuackBehavior quackBehavior
	+{abstract} display()
	+swim()
	+performQuack()
	+performFly()
	+setQuackBehavior()
	+setFlyBehavior()
}

+class MallardDuck extends Duck {
	+display() {\n// 물오리 모양\n}
}

+class RedheadDuck extends Duck {
	+display() {\n// 붉은머리 오리 모양\n}
}


+class RubberDuck extends Duck {
	+display() {\n// 고무 오리 모양\n}
}


+class DecoyDuck extends Duck {
	+display() {\n// 가짜 오리 모양\n}
}
{% endplantuml %}
 
<br>  



```java
public interface FlyBehavior {
	public void fly();
}
//

public class FlyWithWings implements FlyBehavior {
	public void fly() {
		// 날기 구현
	}
}
//

public class FlyNoWay implements FlyBehavior {
	public void fly() {
		// 아무것도 안함
	}
}
```  
<br>

```java
public interface QuackBehavior {
	public void quack();
}
//

public class Quack implements QuackBehavior {
	public void quack() {
		// 꽥꽥 소리
	}
}
//

public class Squeak implements QuackBehavior {
	public void quack() {
		// 삑삑 소리
	}
}
//

public class MuteQuack implements QuackBehavior {
	public void quack() {
		// 아무것도 안함
	}
}
```  
<br>

```java
public abstract class Duck {

	FlyBehavior flyBehavior;
	QuackBehavior quackBehavior;
	
	public Duck() {}
	public void swim() { /* 수영 */ }
	public abstract void display();
	public void performFly() {
		flyBehavior.fly();
	}
	public void performQuack() {
		quackBehavior.quack();
	}
	public void setFlyBehavior(FlyBehavior fb) {
		flyBehavior = fb;
	}
	public void setQuackBehavior(QuackBehavior qb) {
		quackBehavior = qb;
	}
}
//

public class MallardDuck extends Duck {
	// 날 수 있고 꽥꽥 소리를 냄
	public MallardDuck () {
		flyBehavior = new FlyWithWings();
		quackBehavior = new Quack();
	}
	@override public void display() { /* 물오리 모양 */ }
}
//

public class RedheadDuck extends Duck {
	public RedheadDuck () { ... }
	@override public void display() { /* 붉은머리 오리 모양 */ }
}
//

// 고무 오리
public class RubberDuck extends Duck {
	public RubberDuck () { ... }
	@override public void display() { /* 고무 오리 */ }
}
//

// 나무로 된 가짜 오리
public class DecoyDuck extends Duck {
	public DecoyDuck () { ... }
	@override public void display() { /* 나무 모양 오리 */ }
}
//

// 모형 오리
public class ModelDuck extends Duck {
	// 날지도 못하고 소리를 못냄
	public ModelDuck () {
		flyBehavior = new FlyNoWay();
		quackBehavior = new MuteQuack();
	}
	@override public void display() { /* 나무 모양 오리 */ }
}
```  
<br>

```{.java .numberLines}
public class DuckSimulator {
	public static void main(String[] args) {
		Duck mallard = new MallardDuck();
		mallard.performQuack(); // 꽥꽥 소리
		mallard.performFly(); // 날기
		
		
		Duck model = new ModelDuck();
		model.performQuack(); // 소리 내지 못함
		model.performFly(); // 날지 못함
		
		// 동적으로 행동을 지정할 수 있다.
		model.setFlyBehavior(new FlyRocketPowered()); // 로켓으로 날기 능력 발생
		model.performFly(); // 로켓으로 날기 수행
	}
}
```

- [[OOP#2.2 상속(Inheritance)]]{상속(Inheritance)}
	- A is B
- 구성(Composition)
	- A has B
	- '두 클래스(Duck, FlyBehavior)를 이런 식으로 합치는 것'을 '구성을 이용하는 것'이라고 한다.
- Duck 클래스에서는 행동을 상속받는 대신, 행동 객체를 따로 구성
- 디자인 원칙3 : 상속보단 구성을 활용한다.
- 디자인 패턴은 라이브러리보다 높은 단계에 속함
- 디자인 패턴은 클래스와 객체를 구성하여 어떤 문제를 해결하는 방법을 제공하는 방법론
- 라이브러리 vs 프레임워크
	- 라이브러리 : 
	- 프레임워크 : 
 
- 스트래티지 패턴(Strategy Pattern)
	- 알고리즘군을 정의하고 각각을 캡슐화하여 교환해서 사용할 수 있도록 만든다.
	- 알고리즘을 사용하는 측(클라이언트)과는 독립적으로 알고리즘을 변경할 수 있다.
