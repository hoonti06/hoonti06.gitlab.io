---
layout    : wiki
title     : 람다 vs 클로저
summary   : 
date      : 2020-08-31 20:21:53 +0900
updated   : 2021-01-04 10:10:29 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## lambda vs closure

## 람다 대수
1. 람다 대수는 이름을 가질 필요가 없다. (익명 함수)
2. 두 개 이상의 입력이 있는 함수는 최종적으로 1개의 입력만 받는 람다 대수로 단순화 될 수 있다. (커링)

## 익명 함수
익명 함수는 람다 대수로부터 영향을 받아 만들어진 프로그래밍에서 함수를 표현하는 방식의 일종.
Java8부터 지원하게 된 람다가 이 익명 함수(Lambda abstraction)의 일종

## Java의 람다(lambda)
익명 클래스보다 더 간략하게 사용할 수 있도록 하여 함수형 프로그래밍을 할 수 있도록 도와주는 기능이다.  
함수를 변수처럼 사용하여 파라미터 다른 메소의 인자로 전달할 수 있고, 리턴 값으로 함수를 받을 수도 있다.  
자바의 람다식은 함수형에 대해 새로 전의한 것이 아닌, 기존에 존재하는 interface의 형태를 빌어 람다식을 표현하기 때문에 함수형 프로그래밍의 장정을 완전히 가지지는 못한다.  


- 기존의 익명 클래스방식
```java
new Thread(new Runnable() { 
	public void run() {
		System.out.println("Annoymous Thread");
	}
}).start();
```

- 람다방식
```java
new Thread(() -> System.out.println("Lambda Thread")).start();
```

위에서 람다식에 해당하는 부분은 아래과 같다.
``` java
()->System.out.println("Lambda Thread")
```
- () 는 파라미터에 해당하는데, run() 이라는 익명클래스의 메소드가 아무런 파라미터를 취하지 않는다는 의미이다.
- -> 는 람다식 시작 전에 나타나는 람다식 시작 토큰이다. 뒤에는 한줄짜리 람다식혹은 { } 안에 포함된 여러 람다식들이 올수 있다.
- System.out.println("Lambda Thread") 는 람다식의 내용 부분으로, 이 안에는 파라미터 값이 사용될수 있다. 

람다식은 Interface 형태로 변수로 할당될 수 있다.
즉, 람다식 또한 객체의 형태를 취하고 있다는 의미이고, 
람다식에서는 함수의 이름을 사용해서 로직을 선언하지 않기 때문에, 인터페이스에서도 함수의 이름이 필요가 없을것 같지만, 예전 자바의 모든 것을 뒤엎을수는 없기 때문에 기존의 객체 형태롤 통해 일종의 절충을 하였고, 그것이 @FunctionalInterface 라는 어노테이션이다.


```java
// Runnable.java

package java.lang;

// 인터페이스 위에 @FunctionalInterface 어노테이션을 통해 함수형 인터페이스임을 선언
@FunctionalInterface
public interface Runnable {
	public abstract void run();
}
```

```java
// Test.java

public class Test {
	private static Runnable lambdaTest(Runnable runnable) {
		runnable.run();
		return ()->System.out.println("return lambda");
	}

	public static void main(String argsp[]) {
		lambdaTest(()->System.out.println("input lambda")).run();
	}
}
/* 
결과)
input lambda
return lambda
*/
```

JDK에서 기본적으로 지원하는(built-in) 표준 함수형 인터페이스가 있다.

- java.util.function.UnaryOperator<T>
  - 함수 시그니처
  ```java
  T apply(T t)
  ```
  - 인수가 1개이며, 리턴값과 인수의 타입이 같다.

- java.util.function.BinaryOperator<T>
  - 함수 시그니처
  ```java
  T apply(T t1, T t2)
  ```
  - 인수가 2개이며, 리턴값과 인수의 타입이 같다.
 
- java.util.function.Predicate<T>
  - 함수 시그니처
  ```java
  boolean test(T t)
  ```
  - 임의의 타입 <T> 형태의 객체입력을 받아 그값을 처리한 후 결과가 true인지 false 인지를 리턴한다.

- java.util.function.Function<T,R>
  - 함수 시그니처
  ```java
  R apply(T t)
  ```
  - 첫번째 임의의 형태<T>의 입력값을 받아 처리한후 두번째 임의의 형태<R>의 값으로 출력한다. 

- java.util.function.Supplier<R>
  - 함수 시그니처
  ```java
  T get()
  ```
  - 입력값은 따로 없지만, 출력값<R>의 형태를 지정할수 있다.

- java.util.function.Consumer<T>
  - 함수 시그니처
  ```java
  void accept(T t)
  ```
  - 임의형태의 입력값<T>을 받아 처리하고 출력은 하지 않는 형태의 인터페이스이다.




## 클로저(closure)
보통의 함수는 외부에서 인자를 받아서 로직을 처리하지만, 클로저는 자신을 둘러싼 context 내의 변수에 접근할 수 있다.  
즉, 외부 범위의 변수를 함수 내부로 바인딩하는 기술이다.

특이한 점은 자신을 둘러싼 외부 함수가 종료되더라도 이 값이 유지된다는 것이다. 함수에서 사용하는 값들은 클로저가 생성되는 시점에서 정의되고 함수 자체가 복사되어 따로 존재하기 때문이다.

```java
// anonymous 클래스의 closure 
private static Function<String, Integer> function() {
	int a = 100;
	return new Function<String, Integer>() {
		@Override
			public Integer apply(String s) {
				return Integer.parseInt(s) * a;
			}
	};
}

Function<String, Integer> function = function();
Integer apply = function.apply("3");
System.out.println(apply);
```

```java
// lambda closure
private static Function<String ,Integer> function(){
	int a = 100;
	return s -> Integer.parseInt(s) * a;
}

Function<String, Integer> function = function();
Integer apply = function.apply("3");
System.out.println(apply);
```

## 람다 vs 클로저
- 클로저는 외부에 의존성이 있고, 람다는 외부에 의존성이 없는 스태틱 메소드와 비슷하다.
- 람다는 클로저를 포함하는 더 큰 개념이라고 볼 수 있다.  
  - 람다가 자신의 범위 밖에 있는 변수를 사용하면 그것은 람다인 동시에 클로저이다.












```python
function add(x)
	function addX(y)
		return y + x
return addX
```
함수 addX 내부에서 x 는 현재 함수를 둘러싸고 있는 외부 컨텍스트에 존재합니다. add 에서 이 함수가 리턴되는데 x 의 값(value)이나 참조(reference)를 복사한 클로저가 리턴됩니다. 함수를 일급 객체 (first-class citizens) 로 취급하는 언어에서는 이를 변수로 받아서 사용이 가능합니다. 넣어주는 x 값에 따라 함수가 생성되는 것을 볼 수 있습니다.

```python
variable add1 = add(1) // return y + 1
variable add5 = add(5) // return y + 5

assert add1(3) = 4
assert add5(3) = 8
```

자바 속 클로저

```java
public class ClosureTest {
	private Integer b = 2;

	private Stream<Integer> calculate(Stream<Integer> stream, Integer a) {
		return stream.map(t -> t * a + b);
	}

	public static void main(String[] args) {
		List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
		List<Integer> result = new ClosureTest()
			.calculate(list.stream(), 3)
			.collect(Collectors.toList());
		System.out.println(result); // [5, 8, 11, 14, 17]
	}
}
```
calculate 메소드에서 map 메소드를 호출하고 있습니다. 내부에서 외부 변수인 a와 b를 참조하고 있습니다. 이 때 a와 b 는 컴파일러가 final 로 간주한다. 내부에서 필요로 하는 정보를 넘길 때 값이 변경되면 의도하지 않은 결과가 나올 수 있기 때문에, 해당 값은 변하지 않아야 합니다. 따라서 컴파일러는 해당 값을 상수로 취급한다(effectively final). 값을 변경하려고 하면 다음과 같은 컴파일 에러를 볼 수 있습니다.
```java
private Stream<Integer> calculate(Stream<Integer> stream, Integer a) {
  a = 10; // 값 변경 불가
  // Variable used in lambda expression should be final or effectively final
  return stream.map(t -> t * a + b);
}
```


## 람다 vs 클로저
람다와 클로저는 모두 익명의 특정 기능 블록이다.
차이점은 클로저는 외부 변수를 참조하고, 람다는 매개변수만 참조한다는 것이다.
클로저는 외부에 의존성이 있고, 람다는 외부에 의존성이 없는 static 메소드와 비슷합니다.

다음 예제는 폴링 후 조건에 따라 대기하는 메소드입니다. Predicate 를 이용해 검증하고 결과에 따라 짧은 시간 동안 멈춥니다.
```java
// Lambda
(server) -> server.isRunning();

// Closure, 외부의 server 라는 변수를 참조
() -> server.isRunning();
```
클로저는 외부에 의존성이 있고, 람다는 외부 의존성이 없는 static 메서드와 비슷하다.

```java
static <T> void waitFor(T input, Predicate<T> predicate) throws InterruptedException {
	while (!predicate.test(input)) {
		Thread.sleep(250);
	}
}


waitFor(new HttpServer(), (server) -> !server.isRunning());
```
매개변수를 참조하고 있기 때문에 그 외의 외부 변수에 대한 참조가 없다.  
람다는 컴파일러가 런타임에 제공되는 server라는 변수를 참고할 필요가 없다.


```java
static <T> void waitFor(Condition condition) throws InterruptedException {
	while (!condition.isSatisfied()) {
		Thread.sleep(250);
	}
}

@FunctionalInterface
interface Condition {
	boolean isSatisfied();
}
```

```java
void closure() throws InterruptedException {
	HttpServer server = new HttpServer();
	waitFor(() -> !server.isRunning());
}
```

## 참고
- https://futurecreator.github.io/2018/08/09/java-lambda-and-closure/
- https://m.blog.naver.com/2feelus/220695347170
  - lambda
- https://stackoverflow.com/questions/3805474/what-is-a-closure-does-java-have-closures
  - closure
- https://hyunseob.github.io/2016/09/17/lambda-anonymous-function-closure/
  - closure + javacript examples
- https://hyunseob.github.io/2016/08/30/javascript-closure/
  - javascript closure


