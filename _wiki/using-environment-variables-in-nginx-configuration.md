---
layout    : wiki
title     : nginx configuration에 환경변수 사용하는 방법
summary   : 
date      : 2021-08-28 12:53:08 +0900
updated   : 2021-12-24 19:03:24 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
nginx configuration 에서 domain 같은 경우 반복되어 사용되기 때문에 이를 환경변수를 통해 설정하고 싶었다.

## 과정
<https://github.com/docker-library/docs/tree/master/nginx#using-environment-variables-in-nginx-configuration-new-in-119>을 보게 되면 다음과 같은 내용들이 작성되어 있다.

<br>
nginx의 conf 파일 내부에서 환경변수가 적용되지 않는다. 그래서 nginx dockder container는 envsubst를 지원한다.  

<br>
envsubst는 파일 내용에 작성되어 있는 환경변수를 치환해주는 프로그램으로, nginx docker container에서 기본적으로 `/etc/nginx/templates/*.template` 내용에 환경변수가 포함되어 있으면 값들을 치환한 결과 파일들을 `/etc/nginx/conf.d` 디렉터리에 저장하게 된다.

<br>
./nginx/default.conf(conf.template 파일)의 내용에 ${APP_DOMAIN} 환경 변수가 작성되어 있고, 다음과 같이 docker-compose.yml에 적용했다.
```yml
nginx:
  container_name: nginx
  restart: always
  build:
    dockerfile: Dockerfile
    context: ./frontend
    target: production-stage
  ports:
    - "80:80"
    - "443:443"
    - "3333:3333"
  volumes:
    - ./nginx/default.conf:/etc/nginx/conf.d/default.conf.template:ro
    - ./certbot/conf:/etc/letsencrypt
    - ./certbot/www:/var/www/certbot
  env_file: .env
  environment:
    APP_DOMAIN: example.com
  depends_on:
    - backend
    - certbot
  networks:
    - internal_network
  command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
```

실행 자체는 잘 되었지만, nginx container에 shell로 접속해본 결과 `/etc/nginx/conf.d/default.conf`의 내용이 ./nginx/default.conf에서 ${APP_DOMAIN}이 치환된 상태가 아닌 nginx의 default 내용으로 설정되어 있었다. 적용이 안된 것이다.

<br>
certbot 적용을 위해서 따로 작성한 command를 실행하였기 때문에 default docker-entrypint.sh에서 해주는 envsubst 관련 로직이 실행되지 않은 것이라 생각이 되었다.
```yml
command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
```

<br>
github의 docker-nginx에서 소스코드를 확인해보니 [20-envsubst-on-templates.sh](https://github.com/nginxinc/docker-nginx/blob/master/stable/alpine/20-envsubst-on-templates.sh ) 파일이 존재했다. [해당 파일을 docker-entrypoint.d 디렉터리에 copy](https://github.com/nginxinc/docker-nginx/blob/master/stable/alpine/Dockerfile#L117 )하고, [docker-entrypoint.sh에서 해당 파일을 실행](https://github.com/nginxinc/docker-nginx/blob/master/stable/alpine/docker-entrypoint.sh#L17 )한다.


<br>
따라서, envsubst를 실행해주는 로직을 따로 넣어주어야 했다. 그래서 <https://serverfault.com/a/755541>를 참고하여 envsubst를 실행해주는 코드를 기존 command에 추가해주어 다음과 같이 작성하여 실행했다.

```yml
command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g \"daemon off;\"'" 
```

역시나 [참고한 답변](https://serverfault.com/a/755541 )에 작성되어 있는대로, proxy_set_header이 작성되어 있는 라인에서 다음과 같이 에러가 발생하였다.  
![]( /wiki-img/using-environment-variables-in-nginx-configuration/131207307-3eff6f9f-908e-4cba-9930-d256f0f86150.png )

<br>
에러가 발생한 라인은 아래와 같다.
```sh
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```


[참고한 답변에 달린 댓글](https://serverfault.com/questions/577370/how-can-i-use-environment-variables-in-nginx-conf#comment1267463_755541 )을 참고하여 다음과 같이 envsubst 실행 명령어 중간에 적용하려는 환경변수를 작성해주었다(<https://stackoverflow.com/a/40419154>를 참고하여 $도 escape를 위해 2개 잘 넣어주었다).

```yml
command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & envsubst '$${APP_DOMAIN}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g \"daemon off;\"'" 
```

<br>
하지만 app_domain 변수를 모른다는 또 다른 에러가 발생했다.  
![]( /wiki-img/using-environment-variables-in-nginx-configuration/131207605-89512b63-46fa-41dc-b3c6-d0c2a3b8b7d9.png )

<br>
참고 댓글에는 `/bin/sh -c`이 쌍따옴표 안에 포함되어 있지 않고 밖으로 나와 있기 때문에 다음 코드와 같이 기존 command에서 쌍따옴표 밖으로 빼냈다.
```yml
command: /bin/sh -c "while :; do sleep 6h & wait $${!}; nginx -s reload; done & envsubst '$${APP_DOMAIN}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g \"daemon off;\""
```

<br>
그제서야 설정된 환경변수대로 envsubst가 잘 적용되었다.


<br>
## 마무리
- nginx의 문법과 docker 문법이 혼합되어 있어 설정하는 데 애를 먹었다.
- envsubst에 대해 알게 되었다.
