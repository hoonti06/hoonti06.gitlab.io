---
layout    : wiki
title     : mysql user grant 설정
summary   : 
date      : 2021-12-29 20:43:40 +0900
updated   : 2021-12-29 21:01:26 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

다음과 같이 'hoon' 유저를 생성하고 'chat_system' 스키마의 모든 권한을 부여하면 spring에서 에러가 발생한다.

```sql
CREATE USER 'hoon'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `chat_system`.* TO 'hoon'@'localhost';
```

<br>
`localhost` 대신 `%`를 사용하면 에러가 발생하지 않는다.

```sql
CREATE USER 'hoon'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `chat_system`.* TO 'hoon'@'%';
```

<br>
권한 제거는 다음과 같이 작성하면 된다.

```sql
REVOKE ALL ON `chat_system`.* FROM 'hoon'@'%';
```

<br>
유저 권한 상태 확인은 아래와 같이 작성한다.

```sql
SHOW GRANTS for 'hoon'@'%';
```

<br>
'DROP'으로 유저를 삭제한다.

```sql
DROP USER 'hoon'@'%';
```
