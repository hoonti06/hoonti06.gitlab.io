---
layout    : wiki
title     : 
summary   : 
date      : 2021-08-15 15:48:25 +0900
updated   : 2021-08-15 17:28:43 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

jenkins는 /var/jenkins_home/workspace/{jobName}에 git을 checkout 받게 된다

pipeline에서 docker나 docker-compose 명령어를 실행시키기 위해서는 jenkins container 내부에서 docker 명령어가 실행되도록 해야 한다.

<br>
다음과 같이 volume으로 docker.sock과 docker, docker-compose를 추가하고, root 계정으로 jenkins container를 실행시켜야 한다.

```yml
version: "3.4"
services:
  jenkins:
    image: jenkins/jenkins
    container_name: jenkins
    user: root
    ports: 
      - "9090:8080"
    volumes:
      - /var/jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
      - /usr/bin/docker-compose:/usr/bin/docker-compose
```

```sh
docker run -d -u root -p 9090:8080 --name=jenkins \
-v /var/jenkins_home:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /usr/bin/docker:/usr/bin/docker \
-v /usr/bin/docker-compose:/usr/bin/docker-compose \
jenkins/jenkins
```


다음과 같이 docker 명령어의 PATH를 environment에 추가한 후 docker-compose, docker  명령어를 실행시키면 된다.

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
				git url: 'https://hoonti06:{gitlab-personal-access-token}@lab.ssafy.com/s05-webmobile1-sub3/S05P13A104.git', branch : 'develop'

				sh "docker-compose down"
				sh "docker-compose up -d --force-recreate --build"
				sh "docker rmi \$(docker images --filter \"dangling=true\" -q --no-trunc)"
			}
		}
	}
}
```
