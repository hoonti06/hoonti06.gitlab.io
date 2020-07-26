---
layout    : wiki
title     : Head First Design Pattern 내용 정리
summary   : 
date      : 2020-07-19 13:16:11 +0900
updated   : 2020-07-27 01:55:29 +0900
tag       : design-pattern book-contents-summary
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
 
 
## Decorator 패턴

### 구현할 프로그램 주제
커피 전문점의 커피 관리 시스템

### 상속을 통한 구현

{% plantuml %}
+class Beverage {
	-description
	-milk
	-soy
	-mocha
	-whip
	
	+getDescription()
	+cost()
	
	+hasMilk()
	+setMilk()
	+hasSoy()
	+setSoy()
	+hasMocha()
	+setMocha()
	+hasWhip()
	+setWhip()
}

+class HouseBlend extends Beverage {
	+cost()
}

+class DarkRoast extends Beverage {
	+cost()
}

+class Decaf extends Beverage {
	+cost()
}

+class Espresso extends Beverage {
	+cost()
}
{% endplantuml %}

### OCP(Open-Closed Principle)
- 가장 중요한 디자인 원칙 중 하나
- **클래스는 확장에 대해서는 열려 있어야 하지만 코드 변경에 대해서는 닫혀 있어야 한다.**
- 기존 코드는 건드리지 않고, 새로운 기능을 추가하여 확장하는 데 있어 유연하다.
	- Ex> 옵저버 패턴에서 옵저버를 추가하면 Subject 자체에 코드를 추가하지 않으면서도 확장이 가능

### 데코레이터 패턴
- 상속을 써서 음료 가격과 첨가물 가격을 합한 총 가격을 계산하는 방법은 좋은 방법이 아니다.
- 특정 음료에서 시작해서, 첨가물로 그 음료를 장식(Decorate)할 것이다.
- Ex> 다크 로스트 커피
	1. DarkRoast 객체를 가져온다.
	2. Mocha 객체로 장식한다.
		- 데코레이터인 Mocha 객체의 형식은 이 객체가 장식하고 있는 객체(Beverage)를 `반영`('같은 형식을 갖는다.')
	3. Whip 객체로 장식한다.
		- Whip도 데코레이터라서 DarkRoast의 형식(Beverage)을 반영하고, 따라서 cost() 메소드를 가지고 있다. 
		- Mocha와 Whip으로 싸여 있는 DarkRoast는 여전히 Beverage 객체이기 때문에 cost() 뿐만 아니라, DarkRoast가 할 수 있는 건 뭐든 할 수 있다.
	4. cost() 메소드를 호출한다. 이때 첨가물의 가격을 계산하는 일은 해당 객체들에게 위임한다.
		- Whip의 cost()를 호출하면 Mocha의 cost()를 호출하고, Mocha의 cost()는 DarkRoast의 cost()를 호출한다.	
		- DarkRoast의 cost() 결과에 Mocha의 값을 더한 결과가 Mocha의 cost()의 리턴값이 된다.
		- Mocha의 cost()의 리턴값에 Whip의 값을 더해 최종 리턴값이 형성된다.
- 정리
	- 데코레이터의 Super 클래스는 자신이 장식하고 있는 객체의 Super 클래스와 같다.
	- 한 객체를 여러 개의 데코레이터로 감쌀 수 있다.
	- 데코레이터는 자신이 감싸고 있는 객체와 같은 Super 클래스를 가지고 있기 때문에 원래 객체가 들어갈 자리에 객체를 집어넣어도 상관 없다.
	- 데코레이터는 **자신이 장식하고 있는 객체에게 어떤 행동을 위임하는 것 외에 원하는 추가적인 작업을 수행할 수 있다.**
	- 객체는 언제든지 감쌀 수 있기 때문에 실행중에 필요한 데코레이터를 마음대로 적용할 수 있다.
- 정의
	- 객체에 추가적인 요건을 동적으로 첨가한다. 데코레이터는 Sub 클래스를 만드는 것을 통해 기능을 유연하게 확장할 수 있는 방법을 제공

{% plantuml %}
+abstract class Component {
	+methodA()
	+methodB()
}

+class ConcreteComponent extends Component {
	+methodA()
	+methodB()
}

+abstract class Decorator extends Component {
	+methodA()
	+methodB()
}

+class ConcreteDecoratorA extends Decorator {
	-Component wrappedObj
	+methodA()
	+methodB()
	+newBehavior()
}

+class ConcreteDecoratorB extends Decorator {
	-Component wrappedObj
	-Object newState
	+methodA()
	+methodB()
}
{% endplantuml %}

{% plantuml %}
+abstract class Beverage {
	-String description
	+{abstract} getDescription()
	+{abstract} cost()
}

+class HouseBlend extends Beverage {
	+cost()
}

+class DarkRoast extends Beverage {
	+cost()
}

+class Espresso extends Beverage {
	+cost()
}
+class Decaf extends Beverage {
	+cost()
}

+abstract class CondimentDecorator extends Beverage {
	+getDescription()

}

+class Milk extends CondimentDecorator {
	-Beverage beverage;
	+cost()
	+getDescription()
}

+class Mocha extends CondimentDecorator {
	-Beverage beverage;
	+cost()
	+getDescription()
}

+class Soy extends CondimentDecorator {
	-Beverage beverage;
	+cost()
	+getDescription()
}

+class Whip extends CondimentDecorator {
	-Beverage beverage;
	+cost()
	+getDescription()
}
{% endplantuml %}

- 상속을 이용해서 타입을 맞추는 것. 상속을 통해 행동을 물려 받는 것이 목적이 아님
- 데코레이터 객체와 자신이 감싸고 있는 객체랑 같은 `인터페이스`를 가져야 원래 있던 구성요소가 들어갈 자리에 데코레이터 자신이 들어갈 수 있다.
- Beverage라는 추상 클래스의 서브 클래스를 만드는 것이 행동을 상속 받기 위해서가 아닌 형식을 맞추기 위함이었고, 행동은 기본 구성요ㅅ하고 다른 테코레이터 등을 인스턴스 변수에 저장하는 식으로 연결하게 된다.
- 상속만 썼다면 행동이 컴파일 시에 정적으로 결정되어 버리고 만다. 구성을 활용하면 실행중에 데코레이터를 마음대로 조합해서 사용할 수 있는 장점을 갖는다.
- 자바의 인터페이스를 써도 된다.

## 객체지향 원칙
- 바뀌는 부분은 캡슐화한다.
- 상속보다는 구성을 활용한다.
- 구현이 아닌 인터페이스에 맞춰서 프로그래밍한다.
- 서로 상호작용을 하는 객체 사이에서는 가능하면 느슨하게 결합하는 디자인을 사용해야 한다.
- OCP(Open-Close Principal) : 클래스는 확장에 대해 열려 있고, 변경에 대해서는 닫혀 있어야 한다.

```java
public abstract class Beverage {
	String description = "제목 없음";
	
	public String getDescription() {
		return description; 
	}
	public abstract double cost();
}
//

public abstract class CondimentDecorator extends Beverage {
	public abstract String getDescription();
}
//

public class Espresso extends Beverage {
	public Expresso {
		description = "에스프레소";
	}
	public double cost() {
		return 1.99;
	}
}
//

public class HouseBlend extends Beverage {
	public HouseBlend {
		description = "하우스블렌드커피";
	}
	public double cost() {
		return .89;
	}
}
//

public class Mocha extends CondimentDecorator {
	Beverage beverage;
	
	public Mocha(Beverage beverage) {
		this.beverage = beverage;
	}
	public String getDescription() {
		return beverage.getDescription() + ", 모카";
	}
	public double cost() {
		return .20 + beverage.cost();
	}
}
```  
<br>


```{.java .numberLines}
public class StarbuzzCoffee {
	public static void main(String args[]) {
		Beverage beverage = new Espresso();
		
		Beverage beverage2 = new DarkRoast();
		beverage2 = new Mocha(beverage2);
		beverage2 = new Mocha(beverage2);
		beverage2 = new Whip(beverage2);
		
		Beverage beverage3 = new HouseBlend();
		beverage3 = new Soy(beverage3);
		beverage3 = new Mocha(beverage3);
		beverage3 = new Whip(beverage3);
	}
}
```

- 데코레이터로 감싸면 그 커피가 원래 어떤 커피인지 모른다.
	- 구상(concrete) 구성요소의 형식을 알아내어 그걸 바탕으로 어떤 작업을 처리하는 데에는 데코레이터가 맞지 않다.
	- 추상(abstract) 구성요소 형식을 바탕으로 돌아가는 코드에 적합하다.
- 데코레이터가 감싸고 있는 객체에 대해 어떻게 데코레이트가 되어있는지, 몇 단계인지 등 내부를 알 수 없다.
	- 데코레이터는 그 데코레이터가 감싸고 있는 객체에 행동을 추가하기 위한 용도
	- 여러 단계의 데코레이터를 파고 들어가서 정보를 얻고 그걸 바탕으로 어떤 작업을 해야 한다면 데코레이터 패턴과 맞지 않다.
- 데코레이터 패턴은 클라이언트 쪽에서는 데코레이터를 사용하고 있다는 것을 알 수 없다는 장점이 있다.
	- 특정 형식에 의존하는 코드에 데코레이터 패턴을 적용하면 문제가 발생한다.
- 구성 요소를 초기화하는데 필요한 코드가 훨씬 복잡해진다는 단점이 있다.
	- 데코레이터를 쓰면 구성요소 인스턴스만 생성해서 끝나지 않고, 꽤 많은 데코레이터로 감싸야 하는 경우가 있다.
	- 이를 해결하기 위해 팩토리 패턴과 빌더 패턴을 사용할 수 있다.
- 데코레이터 패턴의 예시 java.io의 inputStream
{% plantuml %}
+abstract class InputStream { 
}

+class FileInputStream extends InputStream { 
}
+class StringBufferrInputStream extends InputStream { 
}
+class ByteArrayInputStream extends InputStream { 
}
+abstract class FilterInputStream extends InputStream { 
}

+class PushbackInputStream extends FilterInputStream { 
}
+class BufferedInputStream extends FilterInputStream { 
}
+class DataInputStream extends FilterInputStream { 
}
+class LinueNumberInputStream extends FilterInputStream { 
}

{% endplantuml %}

- 상속을 통해 확장할 수도 있지만, 디자인의 유연성 면에서 보면 별로 좋지 않다.
- 기존 코드를 수정하지 않고도 행동을 확장하는 방법이 필요
- 구성과 위임을 통해 실행중에 새로운 행동을 추가 할 수 있다.
- 상속 대신 데코레이터 패턴을 통해 행동을 추가할 수 있다.
- 데코레이터 패턴에서는 구상 구성요소를 감싸주는 데코레이터들을 사용
- 데코레이터 클래스의 형식은 그 클래스가 감싸고 있는 클래스의 형식을 반영
- 데코레이터에서는 자기가 감싸고 있는 구성요소의 메소드를 호출한 결과에 새로운 기능을 더함으로써 행동을 확장
- 구성요소를 감싸는 데코레이터의 개수에는 제한이 없으나, 매우 많이 추가될 경우 코드가 복잡해질 수 있다.
- 구성요소의 클라이언트 입장에서는 데코레이터의 존재를 알 수 없다. (클라이언트에서 구성 요소의 구체적 형식에 의존하게 되는 경우는 예외)

```{.java .numberLines}
public class Soy extends CondimentDecorator {
	Beverage beverage;
	
	public Soy(Beverage beverage) {
		this.beverage = beverage;
	}
	public String getDescription() {
		return beverage.getDescription() + ", 두유";
	}
	public int getSize() {
		return beverage.getSize();
	}
	public double cost() {
		return .20 + beverage.cost();
	}
	
	public double cost() {
		double cost = beverage.cost();
		
		int size = getSize();
		switch (size) {
		Beverage.TALL:
			cost += .10;
			break;
		Beverage.GRANDE:
			cost += .15;
			break;
		Beverage.VENTI:
			cost += .20;
			break;
		}
	}
}
```  
