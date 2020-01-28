---
layout    : wiki
title     : Spring boot
summary   : 
date      : 2020-01-27 12:31:49 +0900
updated   : 2020-01-28 15:37:41 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 1. 프로젝트 구조

- maven 기본 프로젝트 구조와 동일
	- 소스 코드 (src\main\java)
	- 소스 리소스 (src\main\resource)
	- 테스트 코드 (src\test\java)
	- 테스트 리소스 (src\test\resource)
 
- main application 위치
	- 기본 페키지(default package)
		- component-scan을 해야하기 때문이다.(기본 패키지의 하위가 scan 대상)

## 2. 원리

### 2.1 의존성 관리 

#### 2.1.1 이해

{% mermaid %}
graph BT
	A[current project] -- parent --> B[spring-boot-starter-parent]
	B -- parent --> C["spring-boot-dependencies(최상위)"]
{% endmermaid %}
spring-boot-dependencies의 pom.xml 내부 dependency management에  버전들이 정의되어 있다. 이 버전들을 current project의 pom.xml에 명시하여 dependency를 사용하면 된다.


