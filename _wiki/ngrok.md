---
layout    : wiki
title     : ngrok
summary   : 
date      : 2021-09-18 17:46:24 +0900
updated   : 2021-09-18 18:22:40 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

ngrok은 외부에서 방화벽을 넘어 localhost에 접속할 수 있도록 해주는 프로그램이다.

<br>
ngrok 웹 페이지에서 zip 파일 다운 받아 압축 풀면 바로 사용할 수 있다.

<br>
우선, ngrok 웹 페이지에 가서 회원가입을 하면 authtoken을 부여 받는다. [링크](https://dashboard.ngrok.com/get-started/your-authtoken )를 통해 확인 가능하다.

<br>
다음 명령어를 통해 부여 받은 token으로 설정해준다.

```sh
./ngrok authtoken 1q2w3e4r
```

<br>
일반적으로 http command와 port를 입력하면 `http://localhost:80`에 mapping시켜준다.

```sh
./ngrok http 80
```

<br>

ngrok을 실행하면 다음과 같이 나오고 url을 통해 외부에서 접속할 수 있다.

```sh
Session Status                online
Account                       ***** (Plan: Free)
Version                       2.3.40
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://356b-175-212-255-58.ngrok.io -> http://localhost:80
Forwarding                    https://356b-175-212-255-58.ngrok.io -> http://localhost:80
Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

<br>
그리고 `http://localhost:4040`로 ngrok의 web inspector가 같이 실행된다.

<br>
`https://localhost:8081`에 mapping시키려면 다음과 같이 실행하면 된다.

```sh
./ngrok http https://localhost:8081 --host-header="localhost:8081"
```

<br>
[ngrok docker 이미지](https://hub.docker.com/r/ngrok/ngrok )도 존재한다.

<br>
다음과 같이 docker 이미지를 실행할 수 있다.

```sh
docker run -it --p 4040:4040 ngrok/ngrok http 80
```

<br>
하지만 다음과 같이 명령어를 실행하여 주어지는 url로 접속해봤는데 `502 Bad Gateway`가 떴다. 

```sh
docker run -it -p 4040:4040 -p 8081:8081 \
-e NGROK_AUTHTOKEN=1q2e3e4r \
ngrok/ngrok http https://localhost:8081 --host-header="localhost:8081"
```

<br>
docker를 통해 `https`를 mapping시키는 것은 안 되는 듯 하다.
