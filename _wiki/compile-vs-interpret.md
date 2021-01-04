---
layout    : wiki
title     : 
summary   : 
date      : 2020-09-21 21:28:33 +0900
updated   : 2021-01-04 10:11:09 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 인터프리트(Interpret)
- 고급 언어(high-level programiing language)로 작성된 소스코드(원시코드, 사람이 읽을 수 있는 언어로 작성된 코드) 명령어들을 한 번에 한 줄씩 읽어들여 중간 코드로 변환한 다음, 변환한 것을 바로 실행하는 것
- 현대에 들어 많은 인터프리터가 JIT 컴파일 등의 기술로 실시간 컴파일을 수행하므로, 컴파일러와 인터프리터 사이의 기술적 구분은 사라져 가는 추세

## 컴파일(Compile)
- 고급 언어(high-level programming language)로 이루어진 소스코드를 저급 언어(low-level programming language)로 변환하는 것
  - 저레벨 언어로는 어셈블리어(assembly language), 기계어(machine code)가 있다.
- 결과 코드를 object code라고 한다. 
  - E.g. java의 byte code(.class), C의 object code(.o)

## 링크(link)
- 여러 개로 분리된 소스 파일들의 컴파일된 결과물들로 최종 실행 가능한 파일을 만들기 위해 필요한 부분을 찾아 연결해주는 작업
  - A와 B 소스파일 각각을 컴파일만 하면 A가 B에 존재하는 함수를 찾지 못해 호출할 수 없기 때문에 A와 B를 연결해주는 작업이 필요하다.
- 정적 링크(static link)와 동적 링크(dynamic link)가 있다.
  - 정적 링크(static link)
    - 컴파일된 소스 파일을 연결해서 실행 가능한 파일을 만드는 것이고
  - 동적 링크(dynamic link)
    - 동적링크란 프로그램 실행 도중 프로그램 외부에 존재하는 코드를 찾아서 연결하는 작업을 말한다.
    - 자바의 경우, JVM이 프로그램 실행 도중 필요한 클래스를 찾아서 클래스패스에 로드해주는 것이 동적 링크의 예이다.

## 빌드(Build)
- 소스 코드 파일을 실행 가능한 소프트웨어 산출물로 만드는 일련의 과정
- 빌드의 단계 중 컴파일이 포함이 되어 있기 때문에 컴파일은 빌드의 부분집합이라 할 수 있다.
- 빌드 과정을 도와주는 도구를 빌드 툴이라 한다.
  - E.g. ant, maven, gradle

## JIT(Just In Time) 컴파일러
- 중간 코드를 OS에 특화된 코드(machine code)로 변환하여 실행한다.
- 같은 코드를 매번 해석하는 대신 처음 실행될 때 인터프리트를 하면서 자주 쓰이는 코드를 캐싱하고, 캐싱된 코드를 가져다 쓰기 때문에 인터프리터의 느린 실행 속도를 개선할 수 있다
- Java의 경우 인터프리터가 바이트 코드를 한 줄씩 실행하는데, 반복되는 코드를 발견하면 JIT 컴파일러가 반복되는 코드를 모두 네이티브 코드(machine code)로 바꿔둔다(컴파일한다). 그 다음부터 인터프리터는 미리 컴파일된 네이티브 코드를 바로 사용한다.

## byte 코드
- 특정 하드웨어가 아닌 가상 컴퓨터에서 돌아가는 실행 프로그램을 위한 이진 표현법
- 역사적으로 대부분의 명령 집합이 0개 이상의 매개 변수를 갖는 1바이트 크기의 동작 코드(opcode)로 구성되었기 때문에 바이트코드라 불리게 되었다.
- java byte 코드는 java 언어와 기계어 사이의 중간 코드

## reference
- https://freezboi.tistory.com/39


- https://gracefulprograming.tistory.com/16
  -  C 컴파일 과정 나중에 꼭 확인하기 
- https://gracefulprograming.tistory.com/16
  -  C 컴파일 과정 나중에 꼭 확인하기 
- https://sodocumentation.net/ko/java/topic/5152/jit--just-in-time--%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC
  - JIT 이미지
