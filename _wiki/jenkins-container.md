---
layout    : wiki
title     : jenkins를 docker container로 구축하는 방법
summary   : 
date      : 2021-08-15 15:48:25 +0900
updated   : 2021-08-18 09:54:25 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

jenkins는 /var/jenkins_home/workspace/{jobName}에 git을 checkout 받게 된다

jenkins pipeline에서 docker와 docker-compose 명령어를 실행시키기 위해서는 다음과 같은 설정이 필요하다
- docker는 host의 docker.sock을 volume으로 mount한다.
- docker-compose는 jenkins container 내부에서 설치해야 해야 한다.
 
 
그래서 jenkins offical image를 base로 하여 user를 root로 한 후 apt-get을 통해 docker-compose를 설치하는 Dockerfile을 작성한다.

```Dockerfile
FROM jenkins/jenkins

USER root
RUN apt-get update && apt-get install -y docker-compose
```

host의 docker.sock을 volume으로 mount하도록 docker-compose.yml을 작성한다.

```yml
version: "3.4"
services:
  jenkins:
    container_name: jenkins
    build:
      dockerfile: Dockerfile
      context: ./
    user: root
    ports: 
      - "9090:8080"
    volumes:
      - ./jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
```

docker run 명령어로는 다음과 같이 작성할 수 있다.
```sh
docker run -d -u root -p 9090:8080 --name=jenkins \
-v ./jenkins_home:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
my_jenkins/latest
```

jenkins의 pipeline job에서 다음과 같이 docker 명령어의 PATH를 environment에 추가한 후 docker-compose, docker  명령어를 실행시키면 된다.

```groovy
pipeline {
	agent any

		environment {
			PATH = "$PATH:/usr/bin"
		}

	stages {
		stage('Build and Deploy') {
			steps {
				// Get some code from a GitLab repository
				git url: 'https://hoonti06:{gitlab-personal-access-token}@gitlab.com/hoonti06/example.git', branch : 'develop'

				sh "docker-compose down"
				sh "docker-compose up -d --force-recreate --build"
				sh "docker rmi \$(docker images --filter \"dangling=true\" -q --no-trunc)"
			}
		}
	}
}
```
