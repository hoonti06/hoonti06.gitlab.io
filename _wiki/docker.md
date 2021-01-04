---
layout    : wiki
title     : Docker
summary   : 
date      : 2019-08-20 14:37:47 +0900
updated   : 2021-01-04 09:58:01 +0900
tag       : docker
public    : true
published : true
parent    : [[]]
latex     : false
---
* TOC
{:toc}

## 1. Docker
Docker는 가상 머신이 아니다.  
가상머신은 운영체제 위에 하드웨어를 에뮬레이션하고 그 위에 운영체제를 올려 프로세스를 실행하는 반면에, 도커 컨테이너는 하드웨어 에뮬레이션 없이 리눅스 kernel을 공유해서 바로 프로세스를 실행한다. 

ubuntu에서 centos docker container를 올릴 수 있는 이유
명령 체계도 다르고, 패키기 관리 방식, UI 등 다르지만 Linux kernel이 동일한 뿌리를 두기 때문이다. 


docker container 구현 기술 중 기반 기술인 namespace는 Linux의 영역 중 user space를 격리시키는 기술이다.
user space영역을 가상화시켜 분리하는 기술이므로 동일한 kernel space를 사용하게 되는 것. 이 방식은 기존의 Hypervisor 기술과는 완전히 다른 방식

docker host의 kernel에 완전히 의존적일 수 밖에 없기 때문에 kernel 레벨의 작업을 하게 되면 모든 container가 영향을 받을 수 있다.

kernel 3.10이상의 버전만을 지원한다.

Docker Host의 OS가 kernel 3.13.0 버전의 Ubuntu 14.04 LTS이고, CentOS 6.6(default kernel version : 2.6.32) Container를 올리게 되면 CentOS 6.6에 kernel 버전을 3.13.0으로 upgrade한 OS를 사용하는 듯한 환경이 될 것이다.

[도커를 써야하는 이유](https://www.44bits.io/ko/post/why-should-i-use-docker-container)


## 2. Dockerfile
[https://rampart81.github.io/post/dockerfile_instructions/](https://rampart81.github.io/post/dockerfile_instructions/)
Dockerfile은 Docker 이미지를 생성하기 위한 파일이다. 특정 명령어를 통해 Docker 이미지를 구성하기 위한 행위를 수행할 수 있다.
From
ENV
ARG
COPY
RUN



## 2.1. Dockerfile Command

## 3. docker-compose
[설치](https://docs.docker.com/compose/install/)

## 4. command





## 출처
[도커 컨테이너는 가상머신인가요? 프로세스인가요?](https://www.44bits.io/ko/post/is-docker-container-a-virtual-machine-or-a-process)
[Docker host에 다양한 linux 배포판(distro) container 들이 올라갈 수 있는 이유](https://bluese05.tistory.com/10)



## footnotes
