---
layout    : wiki
title     : docker buildkit
summary   : 
date      : 2021-08-25 10:52:39 +0900
updated   : 2021-08-25 18:23:47 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

buildkit은 docker build의 향상 기능으로, docker 버전 18.09 부터 탑재되었다

## buildkit builds 활성화

2가지 방법이 있다(<https://docs.docker.com/develop/develop-images/build_enhancements/#to-enable-buildkit-builds>).
1. docker build 명령어 실행 시 `DOCKER_BUILDKIT=1`을 포함시킨다.
 
	```sh
	DOCKER_BUILDKIT=1 docker build .
	```

2. default로 buildkit을 활성화하기 위해 daemon configuration 파일인 `/etc/docker/daemon.json`에 다음과 같이 설정하고 daemon을 재기동한다.  
 
	```json
	{ "features": { "buildkit": true } }
	```

## buildkit 사용 방법 	

먼저, syntax를 설정해주어야 builkit에서 제공하는 옵션 기능들을 사용할 수 있다.
Dockerfile 상위에 다음과 같은 코드를 추가한다. 

```Dockerfile
# syntax=docker/dockerfile:1 
```

<br>
Docker 공식 reference에서 `docker/dockerfile:1` 버전 사용을 추천하는데, 그 이유는 <https://docs.docker.com/engine/reference/builder/#official-releases>에 나와 있다.  
특정 버전인 `1.2` 버전을 사용하면 `1.2.x` patch 버전까지만 업데이트된 버전으로 적용되고 `1.3` 버전이 릴리즈되어도 적용되지 않는다. 하지만, `1` 버전을 사용하면 `1.X` minor와 patch release까지 최신 업데이트된 버전으로 적용된다.

<br>
`labs` 버전도 있지만 실험적인 버전이므로 stable한 버전이 아니다. 


## 기능

### cache
Docker 빌드시 다운로드 받아야 하는 의존성과 패키지 등을 caching하여 리빌드시 재다운로드하지 않고 cache된 데이터를 활용할 수 있다.

다음과 같이 gradle과 mvn의 의존성 데이터가 저장되는 directory를 `target`으로 caching할 수 있다.

```Dockerfile
RUN --mount=type=cache,target=/root/.gradle ./gradlew clean build
RUN --mount=type=cache,target=/root/.m2 ./mvnw install -DskipTests
```

### secret
`--secret` flag를 통해 Docker 빌드시 사용될 시크릿 정보를 전달할 수 있다. 

```Dockerfile
# syntax=docker/dockerfile:1

FROM alpine

# shows secret from default secret location:
RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret

# shows secret from custom secret location:
RUN --mount=type=secret,id=mysecret,dst=/foobar cat /foobar
```

- 참고
	- <https://docs.docker.com/develop/develop-images/build_enhancements/#new-docker-build-secret-information>
	- <https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/syntax.md#run---mounttypesecret>

### ssh
ssh를 사용하여 빌드시 private 데이터에 접근할 수 있다.

```Dockerfile
# syntax=docker/dockerfile:1
FROM alpine

# Install ssh client and git
RUN apk add --no-cache openssh-client git

# Download public key for github.com
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

# Clone private repository
RUN --mount=type=ssh git clone git@github.com:myorg/myproject.git myproject
```

- 참고
	- <https://docs.docker.com/develop/develop-images/build_enhancements/#using-ssh-to-access-private-data-in-builds>
	- <https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/syntax.md#run---mounttypessh>

