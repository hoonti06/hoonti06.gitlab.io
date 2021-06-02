---
layout    : wiki
title     : mybatis type alias 관련 exception
summary   : 
date      : 2021-06-02 22:23:54 +0900
updated   : 2021-06-02 22:41:23 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

프로젝트의 기존 package명을 변경하고 실행시키려고 하는데, 다음과 같은 에러가 발생했다.  
![]( /wiki-img/mybatis-type-exception/120488907-25e1f780-c3f2-11eb-8236-899add82fe5f.png )  
> 2021-06-02 22:15:31.334 ERROR 66306 --- [  restartedMain] o.m.spring.mapper.MapperFactoryBean      : Error while adding the mapper 'interface me.hoonti06.checklist.model.dao.UserDao' to configuration.
> org.apache.ibatis.builder.BuilderException: Error parsing Mapper XML. The XML location is 'me/hoonti06/checklist/model/dao/UserDao.xml'. Cause: org.apache.ibatis.builder.BuilderException: Error resolving class. Cause: org.apache.ibatis.type.TypeException: Could not resolve type alias 'User'.  Cause: java.lang.ClassNotFoundException: Cannot find class: User  

<br>
왜 그런가 또 삽질하다가 [어떤 블로그](https://tedock.tistory.com/368 )에서 MapperConfig 관련 에러라고 해서 설정 파일을 찾아보다 application.properties의 mybatis.type-aliases-package의 값이 이전 package 경로로 되어 있어 발생한 문제였음을 알게 됐다.
![]( /wiki-img/mybatis-type-exception/120488866-1ebae980-c3f2-11eb-9346-cc49faa76c10.png )  

<br>
변경된 package명과 경로로 mybatis.type-aliases-package를 설정했더니 잘 됐다.
