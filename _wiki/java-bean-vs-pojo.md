---
layout    : wiki
title     : Java bean vs POJO
summary   : 
date      : 2021-04-10 22:49:39 +0900
updated   : 2021-04-11 02:13:57 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## Java Bean
- `데이터를 표현`하기 위한 Java 클래스를 만들 때의 규약
- getter와 setter로 구성
- 클래스의 모든 property는 private이며 getter, setter 메소드로 제어한다.
- 인자가 없는 public 생성자가 있어야 한다.
- Serializable 인터페이스를 구현해야 한다.

## POJO(Plain Old Java Object)
- 자바 언어 사양 외에 어떠한 제한에도 묶이지 않은, 특정 기술에 종속되지 않은 순수한 자바 오브젝트
	- 객체지향의 가장 중요한 개념중 하나의 느슨한 의존관계를 역행하는 이런 침투적인 프레임워크의 문제점을 강조하기 위해 탄생된 말
	- 다음을 만족해야 한다
		- 미리 정의된 클래스를 확장하지 않는다
		- 미리 정의된 인터페이스를 구현하지 않는다
		- 미리 정의된 애노테이션을 포함하지 않는다  
	- POJO는 java bean보다 범주가 더 넓은 개념


## reference
- <https://stackoverflow.com/a/3295517>
- <https://stackoverflow.com/a/12518297>
