---
layout    : wiki
title     : spring boot dockerfile 작성 방법(gradle)
summary   : 
date      : 2021-08-25 07:29:23 +0900
updated   : 2021-08-25 18:15:27 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

[spring boot referecne]( https://spring.io/guides/topicals/spring-boot-docker/#a-better-dockerfile )을 참고하여 build 및 prod로 배포까지 가능하도록 Dockerfile을 작성했다.

```Dockerfile
FROM openjdk:8-jdk-alpine as build
WORKDIR /workspace/app

COPY . /workspace/app
RUN ./gradlew clean build # or bootJar
RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*.jar)

FROM openjdk:8-jdk-alpine AS local
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/build/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.demo.example.ExampleApplication"]

FROM openjdk:8-jdk-alpine AS prod
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/build/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.demo.example.ExampleApplication"]
```

<br>
처음에는 <https://spring.io/guides/topicals/spring-boot-docker/#_experimental_features>에 나오는 `--mount=type=cache` 기능을 잘 몰라 적용하지 않았다.

<br>
찾아본 결과, 첫 build 시 의존성과 패키지 등을 다운로드 받은 후 해당 디렉터리를 caching할 수 있는 기능이다. rebuild를 할 때 재다운로드 받는 것을 skip할 수 있다.

<br>
아래 명령어를 통해 적용할 수 있다.
```Dockerfile
# syntax=docker/dockerfile:experimental

RUN --mount=type=cache,target=/root/.gradle ./gradlew clean build
```

<br>
더 자세한 내용은 [[docker-buildkit#cache]]에 작성해 놓았다.

