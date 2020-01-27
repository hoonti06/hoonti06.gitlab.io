---
layout    : wiki
title     : Spring boot
summary   : 
date      : 2020-01-27 12:31:49 +0900
updated   : 2020-01-27 21:08:43 +0900
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

spring-boot-dependencies(최상위) -> spring-boot-start-parent -> current project

spring-boot-dependenvies에 버전들이 적혀 있다.

dependency management에 정의가 되어 있다.
이것을 current project에서 dependency를 사용하면 된다.


{% mermaid %}
graph TD;
	A[Christmas] -->|Get money| B(Go shopping);
	B --> C{Let me think};
	C -->|One| D[Laptop];
	C -->|Two| E[iPhone];
	C -->|Three| F[fa:fa-car Car];
{% endmermaid %}

{% mermaid %}
graph LR;
A[working directory] --> |add| B[staging area];
B --> |commit| C[local repository];
C --> |merge| A;
C --> |push| D[remote repository];
D --> |fetch| C;
D --> |pull| A;
{% endmermaid %}

