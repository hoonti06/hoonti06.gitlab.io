---
layout    : wiki
title     : gitlab-jenkins-OCI 자동 배포
summary   : 
date      : 2021-07-01 21:41:32 +0900
updated   : 2021-08-28 12:49:36 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

다음과 같이 gitlab의 push web hook을 local jenkins에 보내면 OCI까지 도달하여 자동 배포까지 이뤄지도록 구성했다.
```mermaid!
sequenceDiagram
	gitlab->>jenkins container in local: push webhook
	gitlab-->>jenkins container in local: git pull
	jenkins container in local->>jenkins container in local:mvn clean & package
	jenkins container in local->>Oracle Cloud VM:publish over SSH
	Oracle Cloud VM->>Oracle Cloud VM: run service via docker-compose
```

먼저, <https://cloud.oracle.com/compute/instances/create>에서 Oracle Cloud VM을 생성해보자(참고 : <https://kibua20.tistory.com/121>)
1 Core oCPU($\fallingdotseq$ 2 Core vCPU), 1GB memory, 총 100GB 스토리지, 2개 VM, 고정 IP까지 무료로 가능하다(2개 VM에 스토리지를 50GB씩 나누는 게 가능하다)  
(참고로, AWS에서 무료에 해당하는 t2.micro는 1 Core vCPU, 1GiB memory, 8GB 스토리지를 제공)


ssh public key를 등록한다(나중에 ssh 접속하여 public key를 추가로 등록할 수 있다)  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124230171-a313a000-db49-11eb-8e94-7ff492c7171c.png )

boot volume(storage 크기)을 설정할 수 있다.  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124230543-1b7a6100-db4a-11eb-902e-3b530f749fa0.png )


instance가 생성되어 초기화 단계를 거쳐 실행 중인 단계에 오면 다음과 같이 ssh로 VM 인스턴스에 접속한다
```sh
ssh ubuntu@IP주소
```

VM 인스턴스에 docker를 설치한다(참고 : <https://docs.docker.com/engine/install/ubuntu/>)

sudo 없이 docker 명령어를 실행하는 방법은 다음과 같이 실행한 후, 인스턴스를 reboot하면 된다(안전하게 Oracle Cloud 웹에서 reboot할 수 있다)

```sh
sudo usermod -aG docker $USER
```

추가로 필요한 프로그램을 설치한다
```sh
sudo apt-get install -y vim
```

[reference 페이지](https://docs.docker.com/compose/install/#install-compose-on-linux-systems )를 참고하여 docker-compose를 설치한다 
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

[[docker-buildkit]]{Docker Buildkit}이 필요한데, 해당 기능을 사용하기 위해서는 먼저 활성화를 해주어야 한다. 다음 명령어를 통해 활성화를 한다.
```sh
echo "{ \"features\": { \"buildkit\": true } }" | sudo tee -a /etc/docker/daemon.json
```

VM 인스턴스의 port가 22(ssh)만 열려 있기 때문에 따로 port 개방을 해주어야 한다(참고 : <https://kibua20.tistory.com/124>)
웹에서 서브넷을 클릭 후, Security Lists(보안 목록)에서 인스턴스를 클릭한다

Add Ingress Rules를 통해 포트 개방을 해준다.  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124231815-bfb0d780-db4b-11eb-9a92-1e6f83ebf527.png )


### local에서 docker image를 통한 jenkins 구축

#### gitlab access token 발급
user settings > access tokens에서 access token 생성한다.  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124151805-e8928780-dacd-11eb-86aa-cc3b31610dee.png )

상단에 발급된 token이 보이는데, 해당 token을 잘 기억하고 있어야 한다.  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124151796-e6302d80-dacd-11eb-9de1-22612c1ab199.png )

#### docker 통한 jenkins 실행
jenkins 공식 docker image로 jenkins를 실행한다(참고 : <https://hub.docker.com/_/jenkins>)
```sh
docker run -d -u root -p 9090:8080 --name=jenkins -v ~/jenkins_home:/var/jenkins_home jenkins/jenkins
```

jenkins에 첫 접속 시 초기 admin password가 필요하다. 다음과 같이 password를 알 수 있다
```sh
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

따로 계정을 추가하지 않으면 admin으로 접속하게 된다.

Install suggested plugins를 선택하여 plugin들을 설치한다(오래 걸린다).  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124115425-bf133500-daa8-11eb-9b37-074ac663a896.png )

localhost:9090/pluginManager에 가서 plugin 'gitlab'을 설치한다

localhost:9090/configure에서 Gitlab 항목에서 다음과 같이 설정한다.  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124233392-c17b9a80-db4d-11eb-9121-27c184a67f0f.png )

앞서 발급 받은 access token을 입력한다.  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124233805-30f18a00-db4e-11eb-9f5d-ff586ac49f56.png )


테스트까지 마친 후, 저장한다  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124234392-efadaa00-db4e-11eb-8e6a-2c8071297443.png )


### jenkins job(project) 추가


pipeline을 선택한다
![]( /wiki-img/gitlab-jenkins-auto-deploy/124235904-cbeb6380-db50-11eb-93d3-bea9c40e4445.png )  

![]( /wiki-img/gitlab-jenkins-auto-deploy/124246638-0f979a80-db5c-11eb-9cb1-1e409bd054eb.png )
`Build when a change is pushed to GitLab. GitLab webhook URL: http://localhost:8080/project/test Enabled GitLab triggers`을 클릭한다.를 클릭한다


'고급' 클릭 후, 'Generate' 버튼을 통해 Secret token을 생성한다. 이 token 또한 잘 기억해두어야 한다.
![]( /wiki-img/gitlab-jenkins-auto-deploy/124236129-110f9580-db51-11eb-889f-6ece38dc2a7c.png )



### gitlab web hook 등록

배포할 repo에서 Settings > Webhooks로 이동하여 push event에 대한 web hook을 등록한다

web hook을 받을 jenkins job(project)의 URL을 등록해야 하는데, jenkins가 local에서 수행되고 있으므로 URL이 localhost이다.
localhost를 작성할 수 없기 때문에 port forwarding이 필요하다.
ngrok을 통해 가능한데, ngrok 또한 docker image로 가능하다
```sh
docker run --rm -it --link jenkins wernight/ngrok ngrok http jenkins:8080 
```

![]( /wiki-img/gitlab-jenkins-auto-deploy/124238636-cb080100-db53-11eb-93a7-82e88d3a8b47.png )

세션 만료 시간은 2시간 후이다.

URL에 다음과 같이 ngrok을 통해 생성된 jenkins job(project)의 URL을 등록한다.
<http://c3de601f8a0b.ngrok.io/project/test>

secret token은 pipeline job에서 생성했던 secret token을 등록하면 된다.


test를 통해 200 응답을 받으면 성공이다.


### pipeline script 작성

web hook을 받으면 git pull을 통해 소스 코드를 받고 빌드를 해야 한다. 빌드 후, 배포 서버에 전달 및 실행까지 수행한다.

배포할 프로젝트가 maven 기반의 프로젝트이기 때문에 maven을 통한 packaging 코드가 필요하다

git url은 id와 access token을 조합하여 private repo를 제어할 수 있다


```groovy
pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // Get some code from a GitHub repository
        git url: 'https://hoonti06:YLA3k7ABd1-_AzZ-Pxc1@lab.ssafy.com/hoonti06/spring-petclinic.git', branch: 'main'

        // Run Maven on a Unix agent.
        sh "./mvnw -Dmaven.test.skip=true clean package"
        //sh "./mvnw -Dmaven.test.failure.ignore=true clean package"

        // To run Maven on a Windows agent, use
        // bat "mvn -Dmaven.test.failure.ignore=true clean package"
      }

      post {
        // If Maven was able to run the tests, even if some of the test
        // failed, record the test results and archive the jar file.
        success {
          //junit '**/target/surefire-reports/TEST-*.xml'
          archiveArtifacts 'target/*.jar'
          sshPublisher(
            publishers: [
              sshPublisherDesc(
                configName: 'oci',
                transfers: [
                  sshTransfer(
                    cleanRemote: false, excludes: '',
                    execCommand: 'sh /home/ubuntu/deploy/init-server.sh',
                    execTimeout: 120000, flatten: false,
                    makeEmptyDirs: false, noDefaultExcludes: false,
                    patternSeparator: '[, ]+', remoteDirectory: '/deploy',
                    remoteDirectorySDF: false, removePrefix: 'target',
                    sourceFiles: 'target/*.jar'
                  )
                ],
                usePromotionTimestamp: false,
                useWorkspaceInPromotion: false, verbose: false
              )
            ]
          )
        }
      }
    }
  }
}
```

배포 서버로 전달 및 실행 트리거를 주기 위해서는 ssh가 필요한데, 이때 plugin 'Publish Over SSH'을 사용한다.
해당 plugin을 설치하고, configure에서 다음과 같이 설정한다  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124240452-baf12100-db55-11eb-990e-f1e92ea2f14b.png )

고급을 클릭하여 rsa private key를 등록한다  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124240474-be84a800-db55-11eb-9da9-3abc7dc65a93.png )

이때, Oracle Cloud VM 인스턴스 생성 시에 등록한 pub key는 OPENSSH key에 의한 것이었는데, 해당 plugin에서는 RSA key가 필요했다.
그래서 다음과 같이 명령어를 실행하여 새 key를 생성한다.
```sh
ssh-keygen -t rsa -b 4096 -m PEM -f ~/.ssh/id_rsa2
```

그리고 VM 인스턴스의 ~/.ssh/authorized_keys 내부에 방금 생성한 pub key를 추가 등록한다.

방금 생성한 private key는 jenkins에 등록하면 된다.

<http://localhost:9090/job/test/pipeline-syntax/>에서 sshPublisher를 선택 후, jar 파일 이동 및 script 실행 등을 위한 값들을 입력하면 pipeline script를 작성해준다.  
![]( /wiki-img/gitlab-jenkins-auto-deploy/124242381-a57cf680-db57-11eb-9edc-316366a97a3e.png )


### 배포 환경 구축

/home/ubuntu 하위에 deploy dir을 생성한다.

Dockerfile을 작성한다.
```Dockerfile
FROM openjdk:8-jdk-alpine
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```


docker-compose.yml을 작성한다.

```yml
version: '3.0' 
services: 
  web: 
    build:
      dockerfile: Dockerfile
      context: ./
    container_name: "petclinic" 
    restart: always 
    ports: 
      - "80:8080"
```

jenkins에 의해 실행될 init-server.sh을 작성한다.


```sh
cd /home/ubuntu/deploy
docker-compose down # 기존 서비스 종료
docker-compose up -d --force-recreate --build # docker image를 새로 build한다.
docker rmi $(docker images --filter "dangling=true" -q --no-trunc) # 기존에 배포할 때 사용된 image는 none으로 변하게 되는데, 이를 삭제한다.
```



참고 : openjdk shell 실행 방법
```sh
docker run -it openjdk:8-jdk-alpine /bin/sh
```


## 참고
- <https://pjh3749.tistory.com/261>
- <https://4urdev.tistory.com/90>
- <https://jojoldu.tistory.com/356>
- <https://gitlab.com/gitlab-org/gitlab-foss/-/issues/38910>
- <https://docs.gitlab.com/ee/integration/jenkins.html>

