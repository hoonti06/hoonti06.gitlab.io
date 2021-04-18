---
layout    : wiki
title     : heroku
summary   : 
date      : 2021-04-16 17:25:41 +0900
updated   : 2021-04-18 09:38:26 +0900
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

- heroku 계속 깨어있게 하는 방법
	- 카페인 : <http://kaffeine.herokuapp.com/>
	- <https://nhj12311.tistory.com/283>
 
- heroku는 default가 jdk8이다.
	- jdk 버전 변경 방법 : <https://devcenter.heroku.com/articles/customizing-the-jdk>
		- 최상위 폴더 하위에 넣으면 된다
