---
layout    : wiki
title     : hibernate DB와 query 관련 options
summary   : 
date      : 2021-09-25 21:26:39 +0900
updated   : 2021-09-25 21:26:54 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

hibernate는 default로 Entity 생성 시 camel case(userName)인 변수명을 snake case(user_name)의 DB column명으로 자동 mappiing해준다. 변수명과 DB column명을 그대로 매핑하려면 다음과 같이 설정한다.

```yml
spring:
  jpa:
    hibernate:
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
```

<br>
JPA에서 만드는 쿼리를 log로 보여준다.

```yml
spring:
  jpa:
    show-sql: true
```

<br>
hibernate 쿼리 log를 보기 좋게 포맷팅해준다.

```yml
spring:
  jpa:
    properties:
      hibernate:
        format_sql: true
```

<br>
hibernate 쿼리 log의 '?'에 들어가는 값을 보여준다.

```yml
logging:
	level:
		org.hibernate.type.descriptor.sql: trace
```
