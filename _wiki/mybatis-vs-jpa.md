---
layout    : wiki
title     : Mybatis vs JPA
summary   : 
date      : 2020-08-17 17:15:45 +0900
updated   : 2020-08-17 20:52:48 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## Mybatis
- SQL을 별도의 파일로 분리해서 관리하게 해주며, 객체-SQL 사이의 파라미터 Mapping 작업을 자동으로 해주는 프레임워크
- JDBC를 통해 데이터베이스에 엑세스하는 작업을 캡슐화하고 일반 SQL query, 저장 프로 시저 및 고급 매핑을 지원하며 모든 JDBC 코드 및 매개 변수의 중복작업을 제거 


## JPA(Java Persistent API)
- JPA란 자바 ORM 기술에 대한 API 표준 명세를 의미
- JPA는 ORM을 사용하기 위한 인터페이스를 모아둔 것이며, JPA를 사용하기 위해서는 JPA를 구현한 Hibernate, EclipseLink, DataNucleus 같은 ORM 프레임워크를 사용해야 한다.

## ORM(Object Relational Mapping)
- ORM은 객체와 DB 테이블이 mapping을 이루는 것  
- ORM을 이용하면 SQL Query가 아닌 직관적인 코드(메서드)로 데이터 조작이 가능
- User 테이블의 데이터를 출력하기 위해서 MySQL에서는 'SELECT * FROM user;' 라는 query를 실행해야 하지만, ORM을 사용하면 User 테이블과 매핑된 객체를 user라 할 때, user.findAll() 라는 메서드 호출로 데이터 조회가 가능
- query가 복잡해지면 ORM으로 표현하는데 한계가 있고, 성능이 raw query에 비해 느리다는 단점이 있다. 이를 보안하기 위해 JPQL, QuertyDSL 등을 사용할 수 있다.

## Mybatis vs JPA
- Mybatis는 학습이 쉬운 반면, JPA를 잘 사용하기 위해서는 알아야 할 것이 많다.
- JPA는 SQL를 직접 사용하지 않고, 메서드 호출만으로 query 수행이 가능하여 SQL 반복 작업을 하지 않아도 된다.
- 테이블 컬럼이 하나 변경되었을 경우 Mybatis에서는 관련 DAO의 파라미터, 결과, SQL 등을 모두 확인하여 수정해야 하지만, JPA의 경우 이를 대신 해준다.
- JPA는 특정 벤더에 종속적이지 않다.
	- 여러 DB 벤더(MySQL, Oracle 등)마다 SQL 사용이 조금씩 다른데, JPA는 추상화된 데이터 접근 계층을 제공하여 벤더에 종속되지 않는다.
- JPA는 메서드 호출로 query를 실행하기 때문에 내부적으로 많은 동작이 있다는 것을 의미하므로, 직접 SQL을 호출하는 것보다 성능이 떨어질 수 있다(최근에는 많은 발전으로 인해 JPA도 좋은 성능을 보여주고 있다).
- JPA는 통계 분석 등의 복잡한 query를 메서드 호출로 처리하는 것이 힘들다.
	- 이것을 보완하기 위해 JPA에서는 SQL과 유사한 기술인 JPQL을 지원한다.
- Mybatis는 객체를 단순히 데이터 전달 목적으로 사용할 뿐, 객체 지향적이지 못하다(페러다임 불일치). 
