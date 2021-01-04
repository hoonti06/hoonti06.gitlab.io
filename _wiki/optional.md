---
layout    : wiki
title     : Optional
summary   : 
date      : 2020-08-31 21:37:26 +0900
updated   : 2021-01-04 00:44:38 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## Optional

> API Note:
> Optional is primarily intended for use as a method return type where there is a clear need to represent "no result," and where using null is likely to cause errors. A variable whose type is Optional should never itself be null; it should always point to an Optional instance.
> 
> '결과 없음(no result)'을 명확히 나타낼 필요가 있고, null을 리턴하면 에러가 발생할 가능성이 높은 상황에서 `메서드의 리턴 타입`으로 사용하는 것이 Optional의 처음 의도다. Optional 타입의 변수는 값이 절대 null 이어서는 안 되며, 항상 Optional 인스턴스를 가리켜야 한다.

- Optional<T> 클래스는 'T'타입의 객체를 포장해 주는 Wrapper class 이다.  
- 따라서, Optional 인스턴스는 모든 타입의 참조 변수를 저장할 수 있다.
- Optional 객체를 사용하면 제공되는 메소드로 예상치 못한 NullPointerException 예외를 회피할 수 있다.
즉, 복잡한 조건문 없이도 null 값으로 발생하는 예외를 처리할 수 있게 된다.


### 생성
- of
  - 메서드 선언(declaration)
	```java
	static <T> Optional<T> of(T value)
	```
  - 값이 null일 경우 NullPointerException 발생
  - 즉, 원자값이 반드시 있어야 하고, 없으면 예외를 발생시키고 싶을 떄 사용
  - 예시
	```java
	Optional<String> opt = Optional.of("test");
	```

- ofNullable
  - 메서드 선언(declaration)
	```java
	static <T> Optional<T> ofNullable(T value)
	```
  - 값이 null일 수도 있을 때 사용  
  - 값이 null일 경우 비어있는 Optional 인스턴스를 리턴하고, 중간 및 종단 처리 메소드 체이닝을 통해 원하는 값 도출 가능  
  - 체이닝을 하더라도 값이 null일 경우 중간 연산은 수행되지 않으며 종단 연산만 수행된다.
  - 예시
	```java
	Optional<String> opt = Optional.ofNullable("test");
	```
- empty 
  - 메서드 선언(declaration)
	```java
	static <T> Optional<T> empty()
	```
  - 비어있는 Optional 인스턴스를 임의로 생성한다.
  - 조건에 따라 분기를 수행하거나, 리턴 값이 없을 경우 사용한다.
  - 예시
	```java
	Optional<String> opt = Optional.empty();
	```  
<br>

### 중간 처리
생성된 Optional 인스턴스에 메소드를 연결하여 원하는 연산을 수행할 수 있다.  
각 메소드들은 다시 Optional 인스턴스를 리턴하기 때문에 체이닝 연산을 통해 반복 연결이 가능하다.

- filter
  - 메서드 선언(declaration)
  ```java
  Optional<T> filter(Predicate<? super T> predicate)
  ```
  - filter는 값을 받아서 boolean 값을 리턴하는 Predicate 함수형 인터페이스를 인자로 받는다.
  - 그 결과가 true면 값이 존재하는 Optional 인스턴스를, false면 빙 Optional 인스턴스를 리턴한다.
  - 예시
	```java
	Optional.ofNullable("111").filter(v -> "111".equals(v));
	```

- map
  - 메서드 선언(declaration)
  ```java
  <U> Optional<U> map(Function<? super T,? extends U> mapper)
  ```
  - 인자와 리턴값을 모두 지정하는 Function 함수형 인터페이스를 인자로 받는다.
  - 아래 예시의 Integer의 parseInt 함수는 이미 인자와 리턴값이 고정되어 있기 때문에, 타입 추론을 통해 Function 인터페이스의 인자와 리턴 타입이 자동 설정된다.
  - map은 Optional로 감싸진 값을 내부에 구현한 Function 인터페이스를 통해 변환해서 리턴하는 역할을 한다.
  - 예시
	```java
	Optional.ofNullable("001").map(Integer::parseInt);
	```
 
- flatMap
  - 메서드 선언(declaration)
  ```java
  <U> Optional<U> flatMap(Function<? super T,? extends Optional<? extends U>> mapper)
  ```
  - map과 비슷하지만, Function 함수형 인터페이스의 리턴을 Optional로 해야 한다.
  - 예시
	```java
	Optional.ofNullable("001").flatMap(v -> Optional.of(Integer.parseInt(v)));
	```

- or
  - 메서드 선언(declaration)
  ```java
  Optional<T> or(Supplier<? extends Optional<? extends T>> supplier)
  ```
  - 값이 존재하면 해당 값을 감싸는 Optional 인스턴스를, 그렇지 않으면 suppier 함수형 인터페이스로 생성된 Optional 인스턴스를 리턴한다.
  - 리턴 타입이 Optonal이기 때문에 계속해서 orElse와 같은 Optional 클래스의 메서드들을 연쇄적으로 호출할 수 있게 된다.
  - 기존의 orElseGet나 orElse가 주로 메서드 채인(Chain)의 최말단에서 최종적으로 Optional 객체가 담고 있는 값을 얻기위해서 사용됐다고 한다면, or은 주로 메서드 채인의 중간에서 Optionl 객체가 비어있을 경우 값을 채워주기 위한 용도로 사용할 수 있다.
  - 예시
	```java
	String coffeeToMake = Optional
	  .ofNullable(order)
	  .map(Order::getCoffee)
	  .orElse("Americano");
	System.out.println("만들 커피 : " + coffeeToMake);
	```

### 종단 처리
Optional을 끝낸다는 것이기 때문에, 뭔가 리턴하는 작업이 있다면 Optional 인스턴스가 아닌, 값 자체를 리턴한다.
 
- ifPresent
  - 메서드 선언(declaration)
  ```java
  void ifPresent(Consumer<? super T> action)
  ```
  - Optional 값이 있을 경우 수행할 로직을 정의할 수 있다.
  - 정의되는 작업은 Consumer 함수형 인터페이스로, 리턴 값 이 없는 순수 소비 로직이어야 한다.
  - 리턴 값이 있는 작업을 하고 싶다면 map을 활용하면 된다.
  - 예시
	```java
	Optional.ofNullable("111").ifPresent(v -> {
		// todo
	})
	```
 
- ifPresentOrElse
  - 메서드 선언(declaration)
  ```java
  void ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction)
  ```
  - ifPresent와 달리, 값이 존재하지 않을 때에도 수행할 로직을 추가할 수 있다.
  - 예시
	```java
	Optional.ofNullable(order)
	.map(Order::getCoffee)
	.ifPresentOrElse(
	  coffee -> System.out.println("만들 커피: " + coffee),
	  () -> System.out.println("만들 커피: " + user.getFavoriteCoffee())
	);
	```

 
- isPresent
  - 메서드 선언(declaration)
  ```java
  bolean isPresent()
  ```
  - Optional 인스턴스가 비어있다면 false를, 그 반대라면 true를 리턴한다.
  - 예시
	```java
	if(Optional.ofNullable("111").isPresent()){
		// todo
	}
	```

- get
  - 메서드 선언(declaration)
  - 실제 값을 리턴한다. 그 값이 null이면 null을 그대로 리턴하기 때문에 exception이 발생할 수 있다.
  - 예시
	```java
	City city = Optional.ofNullable(city).get()
	```

- orElse
  - 메서드 선언(declaration)
  ```java
  T orElse(T other)
  ```
  - 값이 존재하면 실제 값을, 그렇지 않으면 other를 리턴한다. default 값을 설정할 수 있다.
  - 예시
	```java
	return Optional.ofNullable(null).orElse("zzz");
	```
 
- orElseGet
  - 메서드 선언(declaration)
  ```java
  T orElseGet(Supplier<? extends T> supplier)
  ```
  - orElse와 비슷하지만, 인자가 객체가 아닌 Supplier 함수형 인터페이스이다. 즉, 값을 구하기 위한 별도 로직을 추가로 정의할 수 있다.
  - 예시
	```java
	return Optional.ofNullable(null).orElseGet(() -> {
		String returnStr = "default";
		// todo
		return returnStr;
	});
	```

- orElseThrow
  - 메서드 선언(declaration)
  ```java
  <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X extends Throwable // Java8
  T orElseThrow() // Java10
  ```
  - Optional 객체가 비어있다면 사용자가 정의한 예외를 발생시킨다.
  - 인자가 없는 메서드의 경우 
  - 예시
	```java
	return Optional.ofNullable(null).orElseThrow(() -> {
		return new NullPoitnerException();
	});
	
	return Optional.ofNullable(null).orElseThrow();
	```

- stream
  - 메서드 선언(declaration)
  ```java
  Stream<T> stream()
  ```
  - 옵셔널 객체를 스트림 객체로 바로 사용할 수 있다.
  - 예시
	```java
	Stream<Optional<String>> optionalStream =
		Stream.of(Optional.of("Americano"), Optional.of("Latte"), Optional.empty(), Optional.of("Cappuccino"));
	List<String> validCoffeeList = optionalStream
		.flatMap(Optional::stream)
		.collect(Collectors.toList());
	System.out.println("만들 커피 목록: " + validCoffeeList);
	```
	
## etc
- ofNullable이 있는데, of가 존재하는 이유
  - of를 쓴다는 것은 값이 null이 아니라는 것을 확신한다는 것이다. 이러한 상황에서 ofNullable를 사용하여 null임에도 에러 없이 조용히 잘못된 상태로 돌아가게 되는 것이다.
 

## 참고
- https://docs.oracle.com/javase/9/docs/api/java/util/Optional.html
- http://homoefficio.github.io/2019/10/03/Java-Optional-%EB%B0%94%EB%A5%B4%EA%B2%8C-%EC%93%B0%EA%B8%B0/
- https://m.blog.naver.com/PostView.nhn?blogId=vefe&logNo=221727362911&proxyReferer=https:%2F%2Fwww.google.com%2F
- https://www.daleseo.com/java9-optional/
  - or
- https://stackoverflow.com/a/31696584
  - ofNullable이 있는데, of가 존재하는 이유
- https://stackoverflow.com/a/59767176
  - 
