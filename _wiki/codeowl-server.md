---
layout    : wiki
title     : 
summary   : 
date      : 2020-10-26 01:40:10 +0900
updated   : 2020-11-09 02:10:36 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## docker

### db
- docker exec -it codeowl-server_db_1 /bin/bash
- /bin/bash /home/mysql/init.sh
### web
- docker cp ./target/codeowl-0.0.1-SNAPSHOT.war codeowl-server_web_1:/usr/local/tomcat/webapps/ROOT.war (복사하면 기존 파일이 있더라도 복사가 되고, 알아서 ROOT directory로 압축해제되어 갱신된다)

### log
- log는 docker-compose logs로 해서 볼 수 있다.

## remote debugging
- https://stackoverflow.com/questions/45383645/remote-debugging-with-jpda-wont-connect-to-tomcat-through-eclipse-when-using-do
- intellij edit configuration에서 remote 추가한 다음 Run에 가서 'Debug..' 에서 추가한 remote 실행하면 된다.
- 8000 port 열어야 한다.

## 슈퍼 관리자 부여하기
- 'employee_m' table에서 관리자 아이디의 'EMP_PID'을 5로 변경 ('EMP_PID'의 comment에 슈퍼 관리자가 '0'이라고 작성되어 있지만, '5'가 맞다)


## application.properties
- file.upload-dir=/usr/local/tomcat/uploads   >>   [실행되는 tomcat path]/uploads
  - private String REAL_FILEPATH = StaticValues.REALPATH; // public static final String REALPATH = new File("").getAbsolutePath();
    - upload-dir이랑 REAL_FILEPATH가 맞아야 upload 한 위치의 파일을 download 할 수 있다.

## 관리자 페이지 '클럽 관리'
- manageClub2 : 클럽 메인
- manageClub1 : 클럽 로고
- manageClub3 : 클럽 정보
- manageClub4_review : 클럽 리뷰
- manageClub5 : 타임 라인

## spring
- @RestControllerAdvice
  - @RestConroller가 붙어있는 api컨트롤러에서 발생하는 예외를 캐치하겠다는 의미
- 

## 바꾸고 싶은 것들
- mybatis -> JPA // mybatis를 쓰는 이유가 뭐지
- war -> jar // jar를 쓰는 이유가 뭐지
- jsp -> react? // 요거는 좀 힘들다(기술, 지식도 없고, 중요도도 낮다)
- docker // 중요도 낮다

