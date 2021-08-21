---
layout    : wiki
title     : kurento java tutorial 코드 compile 에러
summary   : 
date      : 2021-07-19 19:53:44 +0900
updated   : 2021-07-19 21:17:05 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

<https://doc-kurento.readthedocs.io/en/stable/tutorials/java/tutorial-groupcall.html>

우선, kurento 서버를 docker image로 실행시켰다.  

```sh
docker run --rm -p 8888:8888/tcp -p 5000-5050:5000-5050/udp -e KMS_MIN_PORT=5000 -e KMS_MAX_PORT=5050 kurento/kurento-media-server:latest
```

<br>
그리고 [kurento에서 제공하는 tutorial code](https://github.com/Kurento/kurento-tutorial-java )에서 [group call](https://github.com/Kurento/kurento-tutorial-java/tree/master/kurento-group-call )을 intellij에서 실행하는데, 다음과 같은 컴파일 에러가 발생했다.  

![]( /wiki-img/kurento-tutorial-java-compile-error/126152609-f73db00f-ac78-4787-ae7b-22c4995860d4.png )  


<br>
찾아보니 <https://stackoverflow.com/a/56785132>에서 `Use '--release' option for cross-compilation (Java 9 and later)`을 uncheck하라고 되어 있어 그대로 했더니 잘 실행되었다.  

![]( /wiki-img/kurento-tutorial-java-compile-error/126153274-69a92937-b74e-4399-9d22-743fd17885ea.png )


<br>
왜 해당 항목을 uncheck해야 잘 되는지 이것저것 확인해보니 다음과 같이 해당 프로젝트가 jdk 1.8로 compile하도록 설정되어 있었다.  

![]( /wiki-img/kurento-tutorial-java-compile-error/126152616-5208314b-e919-4a45-b57f-9b802d8e757e.png )


<br>
그런데 project structure를 확인해보니 Project SDK와 Platform setting에 jdk 11로 되어있었던 것이다.  

![]( /wiki-img/kurento-tutorial-java-compile-error/126153811-d9715062-6942-4644-8427-72a6dffae9dc.png )


<br>
Project SDK와 Platform setting을 jdk 1.8로 변경하였더니 uncheck하지 않고도 잘 실행되었다.  

<br>
추가적으로, 다음과 같이 `Per-module bytecode version`과 `Override compiler parameters per-module`에 설정되어 있는 module을 제거한 뒤,  

![]( /wiki-img/kurento-tutorial-java-compile-error/126152616-5208314b-e919-4a45-b57f-9b802d8e757e.png )

<br>
pom.xml에 다음 코드를 추가하여도 잘 동작했다.

```xml
<build>
	...
	<plugins>
		...
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<configuration>
				<source>1.8</source>
				<target>1.8</target>
			</configuration>
		</plugin>
	</plugins>
```
