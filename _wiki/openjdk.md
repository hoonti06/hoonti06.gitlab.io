---
layout    : wiki
title     : openjdk 종류
summary   : 
date      : 2021-09-26 11:23:19 +0900
updated   : 2021-10-11 14:08:11 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## openjdk
- Adoptium(AdoptOpenJDK)
	- 21년 7월 24일부로 Eclipse Foundation으로 이동하게 되어 이름도 Adoptium으로 바뀐다.
	- [AdoptOpenJDK](https://adoptopenjdk.net/ )에서는 JVM을 2가지 제공한다.
		- HotSpot
			- OpenJDK community
			- 가장 많이 사용
			- OracleJDK에서 사용
		- OpenJ9
			- Eclipse community
			- 적은 메모리(memory footprint) 소모와 빠른 시작(fast start-up)
			- IBM JDK에서 사용
	- [Adoptium](https://adoptium.net/ )에서는 JVM 선택이 따로 없다.
		- <https://adoptium.net/supported_platforms.html>를 보니 HotSpot인 듯 하다
	- AdoptOpenJDK의 경우 <https://adoptopenjdk.net/quality.html>를 보면 TCK 사용에 대한 합의를 못 했다고 나온다.
	- Adoptium의 경우 TCK 인증을 받았다고 main에 써져 있다.

- Azul Zulu
	- Azul Systems에서 TCK(Technology Certification Kit) 인증을 받은 구현체
	- 개인과 기업 모두 무료로 사용할 수 있고, 기술 지원에 한해서만 유료 서비스 제공

- [Amazon Corretto](https://aws.amazon.com/ko/corretto/ )
	- Amazon이 제공
	- TCK 인증

## openjdk docker image
- [openjdk](https://hub.docker.com/_/openjdk )
	- java8의 경우 openjdk:8-jdk-alpine이 존재하지만, java11은 alpine이 없다(근데, 8-jdk-slim은 push된지 한달이 안 됐는데 8-jdk-alpine은 push된지 2년이 넘었다..)

- AdoptOpenJDK는 DockerHub의 2개 계정에서 image를 제공한다.
	- official images
		- DockerHub에서 관리
		- [adoptopenjdk](https://hub.docker.com/_/adoptopenjdk )는 21년 8월 1일부로 공식적으로 deprecated되었고, 대신 [eclipse-temurin](https://hub.docker.com/_/eclipse-temurin )을 사용한다.
	- non-official images
		- AdoptOpenJDK에서 관리
		- 버전별로 존재
			- [adoptopenjdk/openjdk11](https://hub.docker.com/r/adoptopenjdk/openjdk11 )
			- [adoptopenjdk/openjdk8](https://hub.docker.com/r/adoptopenjdk/openjdk8 )
		- adoptopenjdk/openjdk8:alpine-slim, adoptopenjdk/openjdk11:alpine-slim이 존재한다(push된지 1주일이 안 되었다).

- [eclipse-temurin](https://hub.docker.com/_/eclipse-temurin )
	- Adoptium에서 관리
	- 8과 11은 apline을 제공하지 않고, 17은 apline을 제공한다.

- [azul](https://hub.docker.com/u/azul )
	- OS마다 repo가 따로 있고, alpine도 있다.
	- azul/zulu-openjdk-alpine:8과 azul/zulu-openjdk-alpine:11을 제공한다.

- [amazoncorretto](https://hub.docker.com/_/amazoncorretto )
	- amazoncorretto:8-alpine과 amazoncorretto:11-alpine이 존재한다(push된지 한 달이 안 되었다).
