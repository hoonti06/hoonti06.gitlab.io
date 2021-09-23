---
layout    : wiki
title     : docker buildkit 빌드 실패
summary   : 
date      : 2021-08-28 12:44:47 +0900
updated   : 2021-09-23 23:43:37 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

`/etc/docker/daemon.json`에도 buildkit을 활성화하는 코드를 추가했고, docker-compose build 실행 명령어 앞에 DOCKER_BUILDKIT=1을 포함시켜봐도 다음과 같이 에러가 발생한다면  

![]( /wiki-img/docker-buildkit-failed-to-build/131205243-8a36e071-4c25-4857-9e93-7c81b2f1a4b7.png ) 


<br>
docker/dockerfile:1 이미지를 pull하면 된다(참고 : <https://stackoverflow.com/a/63827425>)
```
docker pull docker/dockerfile:1
```
