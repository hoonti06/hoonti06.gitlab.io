---
layout    : wiki
title     : JAVA
summary   : 
date      : 2020-04-09 09:26:31 +0900
updated   : 2020-04-14 23:41:34 +0900
tag       : java
public    : true
published : true
parent    : programming-language
latex     : false
---

## 0. 개요
'write once run anywhere'
객체 지향 프로그래밍 언어로서, JVM을 통해 구동되어 OS에 독립적으로 수행된다.

## 1. 특징
## 1.1 데이터 타입
- 기본형(primitive type) 8개
	- 논리형 : boolean(1)
	- 문자형 : char(2)
	- 정수형 : byte(1), short(2), int(4), long(8)
	- 실수형 : float(4), double(8)
- 참조형(reference type)
	- 기본형 외의 모든 타입(String, Class, Interface, Array 등)
	- 객체의 참조값(reference value)
		- 객체를 구분하기 위한 유일한 key
		- JVM에서 자동으로 생성
		- hash code
		- 4byte

- JAVA는 call by value만 지원
	- 기본형은 함수 호출 시 매개변수(parameter)에 인자값을 복사
	- 참조형은 함수 호출 시 매개변수(parameter)에 참조값(인자값)을 복사
		- argument 변수 자체의 참조값이 아닌, argument 변수가 참조하는 객체의 참조값이 매개변수에 복사된다.
		- parameter에 저장된 참조 객체의 참조값으로 객체에 대한 수정을 할 수 있지만, 새로운 객체를 담는 등의 행위는 argument 변수에 영향을 끼치지 않는다.
		- argument 변수와 parameter는 완전히 다른 변수이다.

	```{.java .numberLines}
	public static void main(String[] args) {
		Dog aDog = new Dog("Max");
		Dog oldDog = aDog;

		// we pass the object to foo
		foo(aDog);
		// aDog variable is still pointing to the "Max" dog when foo(...) returns
		aDog.getName().equals("Max"); // true
		aDog.getName().equals("Fifi"); // false
		aDog == oldDog; // true
	}

	public static void foo(Dog d) {
		d.getName().equals("Max"); // true
		// change d inside of foo() to point to a new Dog instance "Fifi"
		d = new Dog("Fifi");
		d.getName().equals("Fifi"); // true
	}
	```

	- 참고)
		- 아규먼트(argument) : 함수에 전달되는 변수 또는 값
		- 매개변수(parameter) : 함수 호출 시에 메모리에 할당되는, 인자값을 저장하는 local 변수
## 2. JVM


## 2.1 Garbage Collecter
## 2.2 JIT

## 3. JDK
