---
layout    : wiki
title     : (도서 내용 정리) 스프링 인 액션5
summary   : 
date      : 2020-08-08 13:38:46 +0900
updated   : 2020-08-14 00:33:51 +0900
tag       : 
public    : true
published : true
parent    : [[book-contents-summary]]
latex     : false
---

## 7. REST 서비스 이용하기

### 7장에서 배우는 내용
- RestTemplate을 사용해서 REST API 사용하기
- Traverson을 사용해서 하이퍼미디어 API 이동하기

### 7.1. RestTemplate으로 REST 엔드포인트 사용하기

- RestTemplate은 REST 리소스를 사용하는 데 번잡한 일을 처리해준다.
- REST 리소스와 상호 작용하기 위한 41개 메서드 제공  
  
  
+------------------+--------------------------------------------------------------------------------------------------------------+
| 메서드           | 기능 설명                                                                                                    |
+==================+==============================================================================================================+
| delete(..)       | 지정된 URL의 리소스에 HTTP DELETE 요청을 수행한다.                                                           |
+------------------+--------------------------------------------------------------------------------------------------------------+
| exchange(..)     | 지정된 HTTP 메서드를 URL에 대해 실행하며, Reponse body와 연결되는 객체를 포함하는 responseEntity를 반환한다. |
+------------------+--------------------------------------------------------------------------------------------------------------+
| execute(..)      | 지정된 HTTP 메서드를 URL에 대해 실행하며, 응답 몸체와 연결되는 객체를 반환한다.                              |
+------------------+--------------------------------------------------------------------------------------------------------------+
| getForEntity(..) | 지정된 HTTP 메서드를 URL에 대해 실행하며, 응답 몸체와 연결되는 객체를 반환한다.                              |
+------------------+--------------------------------------------------------------------------------------------------------------+


  - 고유한 작업을 수행하는 메서드는 12개이고, 나머지는 이 메서드들의 오버로딩 버전  
  - TRACE를 제외한 표준 HTTP 메서드 각각에 대해 최소한 하나의 메서드를 갖고 있다.
  - execute()와 exchange()는 모든 HTTP 메서드 요청을 전송하기 위한 저수준 범용 메서드를 제공한다.
  - 위 표의 메서드는 세 가지 형태로 오버로딩되어 있다.
    - 가변 인자 리스트에 지정된 URL 매개변수에 URL 문자열(String 타입)을 인자로 받는다.


#### 7.1.1. 리소스 가져오기(GET)
다음 코드는 RestTemplate을 사용해서 특정 ID를 갖는 Ingredient 객체를 가져온다.
```java
public Ingredient getIngredientById(String ingredientId) {
	return rest.getForObject("http://localhost:8080/ingredients/{id}",
							 Ingredient.class, ingredientId);
}
```


#### 7.1.2. 리소스에 쓰기(PUT)
다음 코드는 RestTemplate을 사용해서 특정 ID를 갖는 Ingredient 객체를 가져온다.
```java
public void updateIngredientById(Ingredient ingredientId) {
	rest.put("http://localhost:8080/ingredients/{id}",
	 		 ingredient,
			 ingredient.getId());
}
```

#### 7.1.3. 리소스 삭제하기(DELETE)
```java
public void deleteIngredient(Ingredient ingredientId) {
	rest.delete("http://localhost:8080/ingredients/{id}",
				ingredient.getId());
}
```

#### 7.1.4. 리소스 데이터 추가하기(POST)
```java
public Ingredient createIngredient(Ingredient ingredientId) {
	return rest.postForObject("http://localhost:8080/ingredients/{id}",
							  ingredient,
							  Ingredient.class);
}
```

### 7.2. Traverson으로 REST API 사용하기

### 7.3. REST API 클라이언트가 추가된 타코 클라우드 애플리케이션 빌드 및 실행하기


### 요약
- 클라이언트는 RestTemplate을 사용해서 REST API에 대한 HTTP 요청을 할 수 있다.
- Traverson을 사용하면 클라이언트가 응답에 포함된 하이퍼링크를 사용해서 원하는 API로 이동할 수 있다.
