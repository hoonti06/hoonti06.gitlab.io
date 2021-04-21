---
layout    : wiki
title     : heroku
summary   : 
date      : 2021-04-16 17:25:41 +0900
updated   : 2021-04-19 09:16:59 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

- heroku는 배포 환경을 제공해주는 PaaS이다.
- 발음은 '히로쿠' 라고 한다
- 가입만 해도 월 450시간을 제공해준다.
- 30분 동안 방문이 없는 경우에는 해당 서버를 sleep 시킨다. sleep된 상태에서 접속을 하게 되면 다시 깨어나는데 10 ~ 30초 정도 걸린다고 한다.
	- <https://devcenter.heroku.com/articles/free-dyno-hours>
- credit card를 등록하면 550시간을 추가로 제공해주어 총 1000시간을 이용할 수 있다.
	- 등록하고 싶지 않았지만, free로라도 DB를 사용하기 위해서는 credit card를 등록해야 한다.

- heroku CLI 설치
	```sh
	brew tap heroku/brew && brew install heroku
	```
	
- heroku 로그인
	```sh
	heroku login
	```
	
- folder에 이미 있는 heroku app을 연결하는 방법
	```sh
	heroku git:remote -a heroku-app-name
	```
	
- spring boot의 application.properties에서 heroku의 Clear DB 설정하는 방법
	```
	spring.datasource.url=${CLEARDB_DATABASE_URL}
	```
	
- 환경 변수 확인하는 방법
	- CLI
	```sh
	heroku config
	```
	- Dashboard > Settings > Config Vars

 
- heroku는 default가 jdk8이다.
	- jdk 버전 변경 방법
		- <https://devcenter.heroku.com/articles/customizing-the-jdk>
		- 최상위 폴더 하위에 넣으면 된다
 
- 서버 일시중지하는 방법
	- heroku 웹페이지 dashboard > Settings에 가서 Maintenance Mode를 ON으로 설정

- heroku 계속 깨어있게 하는 방법
	- [카페인](http://kaffeine.herokuapp.com/ )
		- bed time(서버가 자도록 나두는 시간)을 오전 2시부터 6시간(고정) 동안 설정하려면 GMT 기준이기 때문에 오후 5시로 설정하면 된다
- heroku log 보기
	- <https://stackoverflow.com/questions/2671454/heroku-how-to-see-all-the-logs>  
	```sh
	heroku logs -n 500 # 500개 로그 보기(maximum : 1500)
	heroku logs -t # 라이브성으로 로그 확인
	```
	
- 환경 변수 설정
	- CLI
	```sh
	heroku config:set GOOGLE_CLIENT_ID=...
	heroku config:set GOOGLE_CLIENT_SECRET=...
	```
	
- spring profiles active 환경 변수 설정
	- CLI
	```sh
	heroku config:set SPRING_PROFILES_ACTIVE=prod
	```

- ClearDB의 UTF-8 설정
	- 기존의 환경변수 'CLEARDB_DATABASE_URL' 값의 뒷 부분에 `&useUnicode=yes&characterEncoding=UTF-8`를 추가해준다
