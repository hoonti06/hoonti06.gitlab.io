---
layout    : wiki
title     : getter setter 컴파일 에러
summary   : gradle lombok 의존성
date      : 2021-06-02 12:26:55 +0900
updated   : 2021-06-02 22:22:22 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

maven에서 gradle로 변경하여 build를 하는데, setter와 getter에 'error: cannot find symbol'이라는 compile 에러가 발생했다.  

<br>
처음에는 setter와 getter만 에러가 발생하는 건지 모르고 삽질하다가 어느 블로그를 통해 lombok 문제였음을 알게 되었다.  

<br>
build.gradle에 다음과 같이 lombok 의존성을 추가해주면 된다.  
```groovy
dependencies {
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
}
```
