---
layout    : wiki
title     : 
summary   : 
date      : 2021-08-10 01:19:50 +0900
updated   : 2021-08-10 01:41:56 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

openvidu를 docker container로 배포를 하게 되면 다음과 같이 connection failed가 발생한다  

![]( /wiki-img/openvidu-docker-container-connection-failed/128740298-ff18a4cc-9f75-4c6e-8402-0bac46b85c0e.png )  


<br>
openvidu docker container에 내장되어 있는 ssl 인증서가 self-signed라서 신뢰할 수 없어서 발생한 문제인 듯 하다.

그래서 openvidu:4443/dashboard에 접속하여 신뢰성이 없어도 접속한다고 한 다음 로그인한다. 그리고 테스트를 통해 영상이 잘 나오는지 확인한다.
- 로그인 정보
	- ID : OPENVIDUAPP
	- PW : <설정한 secret key> (default : MY_SECRET)
- 4443 port : openvidu 서버의 default port


그리고나서 app을 실행하면 connection failed가 발생하지 않고 잘 동작한다.

모든 유저가 openvidu:4443/dashboard를 접속하게 할 수는 없기 때문에 openvidu:4443의 인증서를 변경해주어야 하는데, nginx를 통해 이를 해결하고자 했다.


우선 기존 docker-compose.yml에서 openvidu의 4443 포트를 host의 4443포트로 매핑시켰었는데, 이를 삭제하고 nginx의 4443포트를 host의 4443포트로 매핑시켰다.

또한, 아래의 설정을 통해 nginx가 4443 포트를 listen하게 하고 4443포트는 openvidu:4443으로 proxy pass를 하게 했다.  
`location /` 항목에 아래처럼 작성하지 않으면 제대로 동작하지 않는다.

```
upstream openvidu {
	server openvidu:4443;
}

server {
	listen 4443 ssl;
	server_name i5a104.p.ssafy.io

		proxy_connect_timeout 1d;
	proxy_send_timeout 1d;
	proxy_read_timeout 1d;

	location / {
		proxy_pass https://openvidu/;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header HOST $http_host;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "Upgrade";
	}


	ssl_certificate /etc/letsencrypt/live/i5a104.p.ssafy.io/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/i5a104.p.ssafy.io/privkey.pem;
	include /etc/letsencrypt/options-ssl-nginx.conf;
	ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

}
```


