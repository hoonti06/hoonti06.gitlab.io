---
layout    : wiki
title     : openvidu를 on-premises로 배포
summary   : 
date      : 2021-08-29 11:57:08 +0900
updated   : 2022-04-25 15:44:30 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}


## 시작
<https://docs.openvidu.io/en/2.19.0/deployment/ce/on-premises/>의 내용을 참고하였다.  

<br>
이전에 openvidu-server-kms docker 이미지를 사용했는데, 연결성 부분에서 좋은 성능을 보여주지 않아 다른 설치 방법을 설치하고자 했다.  


## 과정

### on-premises로 openvidu 배포

#### 전제 조건
- Docker가 설치되어 있어야 한다([설치 방법](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)
- `1.24` 이상 버전의 Docker Compose가 설치되어 있어야 한다([설치 방법](https://docs.docker.com/compose/install/))
- port 구성
	- 다음 port에 대해서 열려 있어야 한다.
		- 22 TCP: to connect using SSH to admin OpenVidu.
		- 80 TCP: if you select Let's Encrypt to generate an SSL certificate this port is used by the generation process.
		- 443 TCP: OpenVidu server and application are published by default in standard https port.
		- 3478 TCP+UDP: used by TURN server to resolve clients IPs.
		- 40000 - 57000 TCP+UDP: used by Kurento Media Server to establish media connections.
		- 57001 - 65535 TCP+UDP: used by TURN server to establish relayed media connections.
	- 그 외의 모든 port는 닫혀 있어야 한다.
	- 다음 port에 대해서는 서버 안에서 다른 프로세스가 사용하지 않도록 한다. 다른 프로세스가 해당 port를 사용하게 되면 openvidu가 정상 동작 하지 않을 수 있다.
		- 80 : nginx
		- 443 : nginx
		- 3478 : TURN server
		- 5442 : openvidu server
		- 5443 : openvidu based application
		- 6379 : redis for openvidu
		- 8888 : KMS
	
	
<br>
#### 설치
먼저 root 권한이 필요하다

```sh
sudo su
```

<br>
openvidu 설치 위치인 `/opt`로 이동한다

```sh
cd /opt
```

<br>

다음 명령어를 통해 openvidu를 설치하게 된다.

```sh
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```

<br>
/opt 하위에 openvidu 디렉터리가 생성된다. 해당 디렉터리로 이동한다.

```sh
cd /opt/openvidu
```

<br>
`.env` 파일에서 다음 항목을 설정한다.

```sh
DOMAIN_OR_PUBLIC_IP=
OPENVIDU_SECRET=

# Certificate type:
# - selfsigned:  Self signed certificate. Not recommended for production use.
#                Users will see an ERROR when connected to web page.
# - owncert:     Valid certificate purchased in a Internet services company.
#                Please put the certificates files inside folder ./owncert
#                with names certificate.key and certificate.cert
# - letsencrypt: Generate a new certificate using letsencrypt. Please set the
#                required contact email for Let's Encrypt in LETSENCRYPT_EMAIL
#                variable.
CERTIFICATE_TYPE=letsencrypt

LETSENCRYPT_EMAIL=user@example.com
```

<br>
`CERTIFICATE_TYPE`을 `letsencrypt`로 설정을 하기 위해서 `LETSENCRYPT_EMAIL`을 유효한 email로 설정해야 한다. 
그리고 `80 포트`를 꼭 열어주어야 인증서를 받을 수 있다.

<br>
`/opt/openvidu` 위치에서 다음 명령어로 실행할 수 있다.

```sh
cd /opt/openvidu
./openvidu start
```

<br>
그 외의 명령어는 [공식 reference 페이지](https://docs.openvidu.io/en/2.19.0/deployment/ce/on-premises/#5-administration )에서 확인할 수 있다.

<br>
사실 내부적으로 docker-compose를 실행하는 것이기 때문에 docker와 docker-compose를 잘 알면 docker-compose 명령어로 잘 실행할 수 있다.

<br>
실행 후, `https://DOMAIN_OR_PUBLIC_IP`와 `https://{DOMAIN_OR_PUBLIC_IP}/dashboard`에 접속하여 잘 되는지 확인하다.

<br>
이전에 사용한 openvidu-server-kms보다 openvidu 연결 부분에서 훨씬 잘 되는 것 같다.

<br>
on-promises로 openvidu를 실행하게 되면 redis와 coturn까지 내부적으로 같이 실행되므로 속도도 빠르고 turn서버를 따로 구축할 필요도 없다.

<br>
`CERTIFICATE_TYPE`을 `letsencrypt`로 사용한다면 .env 파일에서 HTTPS_PORT를 변경하더라도 적용되지 않으니 default값인 443을 사용해야 한다.  
변경을 원한다면 [해당 reference 페이지](https://docs.openvidu.io/en/2.19.0/deployment/deploying-openvidu-apps/#in-a-different-port-as-openvidu ) 참고하면 된다.


### openvidu call application 제거 방법
<https://docs.openvidu.io/en/2.19.0/deployment/deploying-openvidu-apps/#remove-openvidu-call-application>을 참고하였다.  

<br>
on-premises로 openvidu를 설치하면 openvidu call application이 default로 같이 설치되어 openvidu와 생명주기를 같이 한다.

<br>
해당 app을 삭제하기 위해서 우선 openvidu를 종료한다.

```sh
cd /opt/openvidu
./openvidu stop
```

<br>
`docker-compose.override.yml`을 삭제한다.

```sh
rm docker-compose.override.yml
```

<br>
openvidu를 다시 실행한다.

```sh
 ./openvidu start 
```


### openvidu를 사용하는 application을 openvidu가 배포되는 서버에 같이 배포하는 방법

<https://docs.openvidu.io/en/2.19.0/deployment/deploying-openvidu-apps/#deploy-other-openvidu-based-application>을 참고하였다.  

<br>
1.  다음 경로에 대해서는 사용하면 안 된다.
	- /openvidu/
	- /dashboard/ (only in OpenVidu CE)
	- /inspector/ (only in OpenVidu Pro)

2. dockerized된 application
	1. `/opt/openvidu/docker-compose.override.yml` 안에 작성하면 되고, openvidu platform과 생명주기를 같이 한다.
	2. 다음 요구 사항이 지켜져야 한다.
		- network_mode를 host로 해야 한다.
		- Application은 반드시 https가 아닌 http이어야 한다.
		- http port는 5442이어야 한다. Openvidu platform의 nginx 설정에서 해당 port로 되어 있다.
		- openvidu platform URL은 `http://localhost:5443`이다.
		- openVidu secret은 환경변수 ${OPENVIDU_SECRET}로 활용 가능하다.


<br>
## 마무리
그리고 [openvidu-server-kms의 Docker Hub 웹 페이지](https://hub.docker.com/r/openvidu/openvidu-server-kms )를 확인해보니 해당 이미지는 production deployments에 맞지 않는 이미지라고 쓰여져 있는 것을 이 글을 쓰는 지금에야 알게 되었다...


