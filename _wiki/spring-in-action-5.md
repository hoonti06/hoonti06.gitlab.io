---
layout    : wiki
title     : (도서 내용 정리) 스프링 인 액션5
summary   : 
date      : 2020-08-08 13:38:46 +0900
updated   : 2021-01-04 00:45:39 +0900
tag       : 
public    : true
published : true
parent    : [[book-contents-summary]]
latex     : false
---
* TOC
{:toc}

## 7. REST 서비스 이용하기

### 7장에서 배우는 내용
- RestTemplate을 사용해서 REST API 사용하기
- Traverson을 사용해서 하이퍼미디어 API 이동하기

### 7.1. RestTemplate으로 REST 엔드포인트 사용하기

- RestTemplate은 REST 리소스를 사용하는 데 번잡한 일을 처리해준다.
- REST 리소스와 상호 작용하기 위한 41개 메서드 제공  
  
  
+---------------------+---------------------------------------------------------------------------------------------------------------+
| 메서드              | 기능 설명                                                                                                     |
+=====================+===============================================================================================================+
| delete(..)          | 지정된 URL의 리소스에 HTTP DELETE 요청을 수행한다.                                                            |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| exchange(..)        | 지정된 HTTP 메서드를 URL에 대해 실행하며, Response body와 연결되는 객체를 포함하는 responseEntity를 반환한다. |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| execute(..)         | 지정된 HTTP 메서드를 URL에 대해 실행하며, Response body 연결되는 객체를 반환한다.                             |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| getForEntity(..)    | HTTP GET 요청을 전송하며, Response body와 연결되는 객체를 포함하는 ResponseEntity를 반환한다.                 |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| getForObject(..)    | HTTP GET 요청을 전송하며, Response body와 연결되는 객체를 반환한다.                                           |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| headForHeaders(..)  | HTTP HEAD 요청을 전송하며, 지정된 리소스 URL의 HTTP 헤더를 반환한다.                                          |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| optionsForAllow(..) | HTTP OPTIONS 요청을 전송하며, 지정된 URL의 Allow 헤더를 반환한다.                                             |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| patchForObject(..)  | HTTP PATCH 요청을 전송하며, Response body와 연결되는 결과 객체를 반환한다.                                    |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| postForEntity(..)   | URL에 데이터를 POST하며, Resonse body와 연결되는 객체를 포함하는 ResponseEntity를 반환한다.                   |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| postForLocation(..) | URL에 데이터를 POST하며, 새로 생성된 리소스의 URL를 반환한다.                                                 |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| postForObject(..)   | URL에 데이터를 POST하며, Response body와 연결되는 객체를 반환한다.                                            |
+---------------------+---------------------------------------------------------------------------------------------------------------+
| put(..)             | 리소스 데이터를 지정된 URL에 PUT한다.                                                                         |
+---------------------+---------------------------------------------------------------------------------------------------------------+


  - 고유한 작업을 수행하는 메서드는 12개이고, 나머지는 이 메서드들의 오버로딩 버전  
  - TRACE를 제외한 표준 HTTP 메서드 각각에 대해 최소한 하나의 메서드를 갖고 있다.
  - execute()와 exchange()는 모든 HTTP 메서드 요청을 전송하기 위한 저수준 범용 메서드를 제공한다.
  - 위 표의 메서드는 세 가지 형태로 오버로딩되어 있다.
    - 가변 인자 리스트에 지정된 URL 매개변수에 URL 문자열(String 타입)을 인자로 받는다.
	- Map<String, String>에 지정된 URL 매개변수에 URL 문자열을 인자로 받는다.
	- java.net.URI를 URL에 대한 인자로 받으며, 매개변수화된 URL은 지원하지 않는다.


- RestTemplate을 사용하기 위해 필요 시점에 RestTemplate 인스턴스를 생성하거나, 빈으로 선언하고 필요 시 주입한다.
  ```java
  RestTemplate rest = new RestTemplate();
  ```
  ```java
  @Bean
  public RestTemplate restTemplate() {
  	return new RestTemplate();
  ```

#### 7.1.1. 리소스 가져오기(GET)
다음 코드는 RestTemplate을 사용해서 특정 ID를 갖는 Ingredient 객체를 가져온다.
HATEOAS가 활성화되지 않았다면 getForObject()로 식자재(ingredient)를 가져올 수 있다.
```java
public Ingredient getIngredientById(String ingredientId) {
	return rest.getForObject("http://localhost:8080/ingredients/{id}",
					 		 Ingredient.class, ingredientId);
}
```
  - getForObject()에 전달된 ingredientId 매개변수는 지정된 URL의 {id} 플레이스 홀더에 사용된다.
  - 이 예에는 하나의 변수만 있지만, 변수 매개변수들은 주어진 순서대로 플레이스홀더에 지정된다.
  - getForObject()의 2 번째 매개변수는 응답이 바인딩되는 타입이다. 여기서는 JSON 형식인 응답 데이터가 객체로 역직렬화되어 반환된다.


Map을 사용해서 URL 변수들을 지정할 수 있다.
```java
public Ingredient getIngredientById(String ingredientId) {
	Map<String, String> urlVariables = new HashMap<>();
	urlVariables.put("id", ingredientId);
	return rest.getForObject("http://localhost:8080/ingredients/{id}",
						 	 Ingredient.class, urlVariables);
}
```
  - 요청이 수행될 때 {id} 플레이스홀더는 키가 id인 Map 항목 값(ingredientId 값)으로 교체된다.


URI 매개변수를 사용할 때는 URI 객체를 구성하여 getForObject()를 호출해야 한다.
```java
public Ingredient getIngredientById(String ingredientId) {
	Map<String, String> urlVariables = new HashMap<>();
	urlVariables.put("id", ingredientId);
	URI url = UriComponentsBuilder
			  .fromHttpUrl("http://localhost:8080/ingredients/{id}")
			  .build(urlVariables);
	return rest.getForObject(url, Ingredient.class);
}
```
  - URI 객체는 URL 문자열 명세로 생성되며, 이 문자열의 {id} 플레이스홀더는 Map 항목 값으로 교체된다.
  - getForObject() 메서드는 리소스로 도메인 객체만 가져와서 응답 결과로 반환한다.
  - 클라이언트가 이외에 추가로 필요한 것이 있다면 getForEntity를 사용할 수 있다.


getForEntity()는 getForObject()와 같은 방법으로 동작하지만, 응답 결과를 나타내는 도메인 객체를 반환하는 대신 도메인 객체를 포함하는 ResponseEntity 객체를 반환한다.  
ResponseEntity에는 Response 헤더와 같은 더 상세한 응답 콘텐츠가 포함될 수 있다.

```java
public Ingredient getIngredientById(String ingredientId) {
	ResponseEntity<Ingredient> responseEntity =
		rest.getForEntity("http://localhost:8080/ingredients/{id}",
						  Ingredient.class, ingredientId);
	log.info("Fetched time: " + 
			 responseEntity.getHeaders().getDate());
	return responseEntity.getBody();
}
```
- getForEntity() 메서드는 getForObject()와 동일한 매개변수를 갖도록 오버로딩되어 있다.  
  따라서 URL 변수들을 가변 인자 리스트나 URI 객체로 전달하여 getForEntity()를 호출할 수 있다.


#### 7.1.2. 리소스에 쓰기(PUT)
다음 코드는 RestTemplate을 사용해서 특정 ID를 갖는 Ingredient 객체를 가져온다.
put() 메서드는 3개의 오버로딩된 버전이 있으며, 직렬화된 후 지정된 URL로 전송되는 Object 타입을 인자로 받는다.
```java
// 특정 식자재 리소스를 새로운 Ingredient 객체의 데이터로 교체
public void updateIngredientById(Ingredient ingredientId) {
	rest.put("http://localhost:8080/ingredients/{id}",
	 		 ingredient,
			 ingredient.getId());
}
```
  - 여기서 URL은 문자열로 지정되었고 인자로 전달되는 Ingredient 객체의 id 속성 값으로 교체되는 플레이스홀더를 갖는다.
  - put() 메서드는 Ingredient 객체 자체를 전ㅅ농하며, 반환 타입은 void라서 반환값 처리할 필요는 없다.

#### 7.1.3. 리소스 삭제하기(DELETE)
```java
// 특정 식자재 삭제
public void deleteIngredient(Ingredient ingredientId) {
	rest.delete("http://localhost:8080/ingredients/{id}",
				ingredient.getId());
}
```
  - 문자열로 지정된 URL과 URL 변수 값만 delete()의 인자로 전달한다.
  - 다른 메서드와 마찬가지로, URL은 Map으로 된 URL 매개변수나 URL 객체로 지정될 수 있다.

#### 7.1.4. 리소스 데이터 추가하기(POST)
```java
public Ingredient createIngredient(Ingredient ingredientId) {
	return rest.postForObject("http://localhost:8080/ingredients/{id}",
							  ingredient, Ingredient.class);
}
```
- POST 요청이 수행된 후 새로 생성된 Ingredient 리소스를 반환받을 수 있다.
- 문자열 URL과 서버에 전송될 객체 및 이 객체의 타입(리소스 body의 데이터와 연관된)을 이자로 받는다.
- URL 변수값을 갖는 Map이나 URL을 대체할 가변 매개변수 리스트를 네 번째 매개변수로 전달 가능하다.

```java
public URI createIngredient(Ingredient ingredient) {
	return rest.postForLocation("http://localhost:8080/ingredients",
								ingredient, Ingredient.class);
```
  - postForObject()와 동일하게 작동하지만, 리소스 객체 대신 새로 생성된 리소스의 URI를 반환 받는다.
  - 반환된 URI는 해당 Response의 Location 헤더에서 얻는다.

```java
public Ingredient createIngredient(Ingredient ingredient) {
	ResponseEntity<Ingredient> responseEntity =
		rest.postForEntity("http://localhost:8080/ingredients",
						   ingredient, Ingredient.class);
	log.info("New resource created at " +
			 responseEntity.getHeaders().getLocation());
	return responseEntity.getBody();
}
```
  - 리소스 객체와 새로 생성된 리소스의 URI 모두 필요할 때 사용할 수 있다.

API에서 하이퍼링크를 포함해야 한다면 RestTempate은 도움이 안 된다.  
(더 상세한 리소스 데이터를 가져와서 그 안에 포함된 콘텐츠와 링크를 사용할 수 도 있지만, 간단하지는 않다)

### 7.2. Traverson으로 REST API 사용하기
- Traverson은 스프링 데이터 HATEOAS에 같이 제공되며, 스프링 애플리케이션에서 하이퍼 미디어 API를 사용할 수 있는 솔루션이다.
- 자바 기반의 라이브러리
- '돌아다닌다(Traverse on)'의 의미로, 여기서는 관계 이름으로 원하는 API를 (이동하며) 사용할 것이다.

- Traversion을 사용할 때는 우선 해당 API의 기본 URI를 갖는 객체를 생성해야 한다.
  ```java
  Traverson traverson = new Traverson(
  	URI.create("http://localhost:8080/api"), MediaTypes.HAL_JSON);
  ```
- Traverson에는 URL만 지정하면 되고, 이후부터는 각 링크의 관계 이름으로 API를 사용한다.
- Traverson 생성자에는 해당 API가 HAL 스타일의 하이퍼링크를 갖는 JSON 응답을 생선한다는 것을 인자로 지정할 수 있다.
  - 이 인자를 지정하는 이윤느 수신되는 리소스 데이터를 분석하는 방법을 Traverson이 알 수 있게 하기 위함이다.
- 어디서는 Traverson이 필요할 때는 Traverson 객체를 생성하거나, 주입되는 빈으로 선언할 수 있다.
  
```java
// 모든 식자재 리스트 가져오기
public Iterable<Ingredient> getAllIngredientsWithTraverson() {
	ParameterizedTypeReference<Resources<Ingredient>> ingredientType =
		new ParameterizedTypeReference<Resources<Ingredient>>() {};

	Resources<Ingredient> ingredientRes = traverson
										  .follow("ingredients")
										  .toObject(ingredientType);
	
	Collection<Ingredient> ingredients = ingredientRes.getContent();
	
	return ingredients;
}
```
  - 각 ingredients 링크들은 해당 식자재 리소스를 링크하는 href 속성을 가지므로 그 링크를 따라가면 된다.
  - follow() 메서드를 호출하면 리소스 링크의 관계 이름이 ingredients인 리소스로 이동할 수 있다.
  - 이 시점에서 클라이언트는 ingredients로 이동햇으므로 toObject()를 호출하여 해당 리소스의 콘텐츠를 가져와야 한다.
  - toObject() 인자에는 데이터를 읽어 들이는 객체의 타입을 지정해야 한다.
  	- Resources<Ingredient> 타입의 객체로 읽어 들여야 하는데, 자바에서는 런타임 시에 제네릭 타입의 타입 정보(<Ingredient>)가 소거되어 리소스 타입을 지정하기 어렵다.
	- ParameterizedTypeReference를 생성하면 리소스 타입을 지정할 수 있다.

```java
// 가장 최근에 생성된 타코들 가져오기
public Iterable<Taco> getRecentTacosWithTraverson() {
	ParameterizedTypeReference<Resources<Taco>> tacoType =
		new ParameterizedTypeReference<Resources<Taco>>() {};

	Resources<Taco> tacoRes = traverson
							  .follow("tacos")
							  .follow("recents")
							  .toObject(tacoType);

//	Alternatively, list the two paths in the same call to follow()
//		Resources<Taco> tacoRes = traverson
//								  .follow("tacos", "recents")
//								  .toObject(tacoType);

	return tacoRes.getContent();
}
```
  - tacos 링크 다음 recents 링크를 따라간다.


- Traverson을 사용하면 HATEOAS가 활성화된 API를 이동하면서 해당 API의 리소스를 쉽게 가져올 수 있다. 
- Traverson은 API에 리소스를 쓰거나 삭제하는 메서드를 제공하지 않는다(RestTemplate은 리소스를 쓰거나 삭제할 수 있지만, API 이동이 어렵다).
- API의 이동과 리소스의 변경 또는 삭제 모두를 해야 한다면 RestTemplate과 Traverson을 함께 사용해야 한다.
- Traverson은 새로운 리소스가 생성될 링크로 이동할 때도 사용할 수 있으며, 이동한 다음 해당 링크를 RestTemplate에 지정하여 HTTP 요청이 가능하다.

```java
// 새로운 식자재(Ingredient 객체) 추가
public Ingredient addIngredient(Ingredient ingredient) {
	String ingredientsUrl = traverson
							.follow("ingredients")
							.asLink()
							.getHref();
	return rest.postForObject(ingredientsUrl,
							  ingredient,
							  Ingredient.class);
}
```
  - ingredients 링크를 따라간 후에 asLink()를 호출하여 ingredients 링크 자체를 요청한다.
  - getHref()를 호출하여 이 링크의 URL을 가져온다.
  - 가져온 URL을 매개변수로 하여 RestTempate 인스턴스의 postForObject()를 호출 및 새로운 식자재를 추가할 수 있다.



### 요약
- 클라이언트는 RestTemplate을 사용해서 REST API에 대한 HTTP 요청을 할 수 있다.
- Traverson을 사용하면 클라이언트가 응답에 포함된 하이퍼링크를 사용해서 원하는 API로 이동할 수 있다.











## 7. REST 서비스 이용하기

### 7장에서 배우는 내용
> - RestTemplate을 사용해서 REST API 사용하기
> - Traverson을 사용해서 하이퍼미디어 API 이동하기

### 7.1. RestTemplate으로 REST 엔드포인트 사용하기

- RestTemplate은 REST 리소스를 사용하는 데 번잡한 일을 처리해준다.
- REST 리소스와 상호 작용하기 위한 41개 메서드 제공  

  |메서드|기능 설명|
  |------|---|
  | delete(..) | 지정된 URL의 리소스에 HTTP DELETE 요청을 수행한다.|
  | exchange(..) | 지정된 HTTP 메서드를 URL에 대해 실행하며, Response body와 연결되는 객체를 포함하는 responseEntity를 반환한다. |
  | execute(..) | 지정된 HTTP 메서드를 URL에 대해 실행하며, Response body와 연결되는 객체를 반환한다.|
  | getForEntity(..) | HTTP GET 요청을 전송하며, Response body와 연결되는 객체를 포함하는 ResponseEntity를 반환한다. |
  | getForObject(..) | HTTP GET 요청을 전송하며, Response body와 연결되는 객체를 반환한다. |
  | headForHeaders(..) | HTTP HEAD 요청을 전송하며, 지정된 리소스 URL의 HTTP 헤더를 반환한다. |
  | optionsForAllow(..) | HTTP OPTIONS 요청을 전송하며, 지정된 URL의 Allow 헤더를 반환한다. |
  | patchForObject(..) | HTTP PATCH 요청을 전송하며, Response body와 연결되는 결과 객체를 반환한다. |
  | postForEntity(..) | URL에 데이터를 POST하며, Resonse body와 연결되는 객체를 포함하는 ResponseEntity를 반환한다. |
  | postForLocation(..) | URL에 데이터를 POST하며, 새로 생성된 리소스의 URL를 반환한다. |
  | postForObject(..) | URL에 데이터를 POST하며, Response body와 연결되는 객체를 반환한다. |
  | put(..) | 리소스 데이터를 지정된 URL에 PUT한다. |


  - 고유한 작업을 수행하는 메서드는 12개이고, 나머지는 이 메서드들의 오버로딩 버전  
  - TRACE를 제외한 표준 HTTP 메서드 각각에 대해 최소한 하나의 메서드를 갖고 있다.
  - execute()와 exchange()는 모든 HTTP 메서드 요청을 전송하기 위한 저수준 범용 메서드를 제공한다.
  - 위 표의 메서드는 세 가지 형태로 오버로딩되어 있다.
    - 가변 인자 리스트에 지정된 URL 매개변수에 URL 문자열(String 타입)을 인자로 받는다.
	- Map<String, String>에 지정된 URL 매개변수에 URL 문자열을 인자로 받는다.
	- java.net.URI를 URL에 대한 인자로 받으며, 매개변수화된 URL은 지원하지 않는다.  
<br>  

- RestTemplate을 사용하기 위해 필요 시점에 RestTemplate 인스턴스를 생성하거나, 빈으로 선언하고 필요 시 주입한다.
  ```java
  RestTemplate rest = new RestTemplate();
  ```
  ```java
  @Bean
  public RestTemplate restTemplate() {
      return new RestTemplate();
  }
  ```  
<br>

#### 7.1.1. 리소스 가져오기(GET)
다음 코드는 RestTemplate을 사용해서 특정 ID를 갖는 Ingredient 객체를 가져온다.  
HATEOAS가 활성화되지 않았다면 getForObject()로 식자재(ingredient)를 가져올 수 있다.  
```java
public Ingredient getIngredientById(String ingredientId) {
    return rest.getForObject("http://localhost:8080/ingredients/{id}",
                             Ingredient.class, ingredientId);
}
```
  - getForObject()에 전달된 ingredientId 매개변수는 지정된 URL의 {id} 플레이스 홀더에 사용된다.
  - 이 예에는 하나의 변수만 있지만, 변수 매개변수들은 주어진 순서대로 플레이스홀더에 지정된다.
  - getForObject()의 2 번째 매개변수는 응답이 바인딩되는 타입이다. 여기서는 JSON 형식인 응답 데이터가 객체로 역직렬화되어 반환된다.  
<br>

Map을 사용해서 URL 변수들을 지정할 수 있다.
```java
public Ingredient getIngredientById(String ingredientId) {
    Map<String, String> urlVariables = new HashMap<>();
    urlVariables.put("id", ingredientId);
    return rest.getForObject("http://localhost:8080/ingredients/{id}",
                             Ingredient.class, urlVariables);
}
```
  - 요청이 수행될 때 {id} 플레이스홀더는 키가 id인 Map 항목 값(ingredientId 값)으로 교체된다.  
<br>

URI 매개변수를 사용할 때는 URI 객체를 구성하여 getForObject()를 호출해야 한다.
```java
public Ingredient getIngredientById(String ingredientId) {
    Map<String, String> urlVariables = new HashMap<>();
    urlVariables.put("id", ingredientId);
    URI url = UriComponentsBuilder
              .fromHttpUrl("http://localhost:8080/ingredients/{id}")
              .build(urlVariables);
    return rest.getForObject(url, Ingredient.class);
}
```
  - URI 객체는 URL 문자열 명세로 생성되며, 이 문자열의 {id} 플레이스홀더는 Map 항목 값으로 교체된다.
  - getForObject() 메서드는 리소스로 도메인 객체만 가져와서 응답 결과로 반환한다.
  - 클라이언트가 이외에 추가로 필요한 것이 있다면 getForEntity를 사용할 수 있다.

<br>

getForEntity()는 getForObject()와 같은 방법으로 동작하지만, 응답 결과를 나타내는 도메인 객체를 반환하는 대신 도메인 객체를 포함하는 ResponseEntity 객체를 반환한다.  
ResponseEntity에는 Response 헤더와 같은 더 상세한 응답 콘텐츠가 포함될 수 있다.  
```java
public Ingredient getIngredientById(String ingredientId) {
    ResponseEntity<Ingredient> responseEntity =
        rest.getForEntity("http://localhost:8080/ingredients/{id}",
                          Ingredient.class, ingredientId);
    log.info("Fetched time: " + 
             responseEntity.getHeaders().getDate());
    return responseEntity.getBody();
}
```
- getForEntity() 메서드는 getForObject()와 동일한 매개변수를 갖도록 오버로딩되어 있다.  
  따라서 URL 변수들을 가변 인자 리스트나 URI 객체로 전달하여 getForEntity()를 호출할 수 있다.
<br>

#### 7.1.2. 리소스에 쓰기(PUT)
다음 코드는 RestTemplate을 사용해서 특정 ID를 갖는 Ingredient 객체를 가져온다.
put() 메서드는 3개의 오버로딩된 버전이 있으며, 직렬화된 후 지정된 URL로 전송되는 Object 타입을 인자로 받는다.
```java
// 특정 식자재 리소스를 새로운 Ingredient 객체의 데이터로 교체
public void updateIngredientById(Ingredient ingredientId) {
    rest.put("http://localhost:8080/ingredients/{id}",
             ingredient,
             ingredient.getId());
}
```
  - 여기서 URL은 문자열로 지정되었고 인자로 전달되는 Ingredient 객체의 id 속성 값으로 교체되는 플레이스홀더를 갖는다.
  - put() 메서드는 Ingredient 객체 자체를 전ㅅ농하며, 반환 타입은 void라서 반환값 처리할 필요는 없다.  
<br>


#### 7.1.3. 리소스 삭제하기(DELETE)
```java
// 특정 식자재 삭제
public void deleteIngredient(Ingredient ingredientId) {
    rest.delete("http://localhost:8080/ingredients/{id}",
                ingredient.getId());
}
```
  - 문자열로 지정된 URL과 URL 변수 값만 delete()의 인자로 전달한다.
  - 다른 메서드와 마찬가지로, URL은 Map으로 된 URL 매개변수나 URL 객체로 지정될 수 있다.
<br>

#### 7.1.4. 리소스 데이터 추가하기(POST)
```java
public Ingredient createIngredient(Ingredient ingredientId) {
    return rest.postForObject("http://localhost:8080/ingredients/{id}",
                              ingredient, Ingredient.class);
}
```
  - POST 요청이 수행된 후 새로 생성된 Ingredient 리소스를 반환받을 수 있다.
  - 문자열 URL과 서버에 전송될 객체 및 이 객체의 타입(리소스 body의 데이터와 연관된)을 이자로 받는다.
  - URL 변수값을 갖는 Map이나 URL을 대체할 가변 매개변수 리스트를 네 번째 매개변수로 전달 가능하다.

```java
public URI createIngredient(Ingredient ingredient) {
    return rest.postForLocation("http://localhost:8080/ingredients",
                                ingredient, Ingredient.class);
```
  - postForObject()와 동일하게 작동하지만, 리소스 객체 대신 새로 생성된 리소스의 URI를 반환 받는다.
  - 반환된 URI는 해당 Response의 Location 헤더에서 얻는다.

```java
public Ingredient createIngredient(Ingredient ingredient) {
    ResponseEntity<Ingredient> responseEntity =
        rest.postForEntity("http://localhost:8080/ingredients",
                           ingredient, Ingredient.class);
    log.info("New resource created at " +
             responseEntity.getHeaders().getLocation());
    return responseEntity.getBody();
}
```
  - 리소스 객체와 새로 생성된 리소스의 URI 모두 필요할 때 사용할 수 있다.

API에서 하이퍼링크를 포함해야 한다면 RestTempate은 도움이 안 된다.  
(더 상세한 리소스 데이터를 가져와서 그 안에 포함된 콘텐츠와 링크를 사용할 수도 있지만, 간단하지는 않다)

### 7.2. Traverson으로 REST API 사용하기
Traverson은 스프링 데이터 HATEOAS에 같이 제공되며, 스프링 애플리케이션에서 하이퍼 미디어 API를 사용할 수 있는 솔루션이다.

- 자바 기반의 라이브러리
- '돌아다닌다(Traverse on)'의 의미로, 여기서는 관계 이름으로 원하는 API를 (이동하며) 사용할 것이다.  
<br>

Traversion을 사용할 때는 우선 해당 API의 기본 URI를 갖는 객체를 생성해야 한다.  

  ```java
  Traverson traverson = new Traverson(
      URI.create("http://localhost:8080/api"), MediaTypes.HAL_JSON);
  ```  
 
- Traverson에는 URL만 지정하면 되고, 이후부터는 각 링크의 관계 이름으로 API를 사용한다.
- Traverson 생성자에는 해당 API가 HAL 스타일의 하이퍼링크를 갖는 JSON 응답을 생성한다는 것을 인자로 지정할 수 있다.  
  - 이 인자를 지정하는 이유는 수신되는 리소스 데이터를 분석하는 방법을 Traverson이 알 수 있게 하기 위함이다.
- 어디서든 Traverson이 필요할 때 Traverson 객체를 생성하거나, 주입되는 빈으로 선언할 수 있다.
<br>
  
  ```java
  // 모든 식자재 리스트 가져오기
  public Iterable<Ingredient> getAllIngredientsWithTraverson() {
      ParameterizedTypeReference<Resources<Ingredient>> ingredientType =
          new ParameterizedTypeReference<Resources<Ingredient>>() {};
  
      Resources<Ingredient> ingredientRes = traverson
                                            .follow("ingredients")
                                            .toObject(ingredientType);
  	
      Collection<Ingredient> ingredients = ingredientRes.getContent();
  	
      return ingredients;
  }
  ```
  - 각 ingredients 링크들은 해당 식자재 리소스를 링크하는 href 속성을 가지므로 그 링크를 따라가면 된다.
  - follow() 메서드를 호출하면 리소스 링크의 관계 이름이 ingredients인 리소스로 이동할 수 있다.
  - 이 시점에서 클라이언트는 ingredients로 이동햇으므로 toObject()를 호출하여 해당 리소스의 콘텐츠를 가져와야 한다.
  - toObject() 인자에는 데이터를 읽어 들이는 객체의 타입을 지정해야 한다.
  	- Resources<Ingredient> 타입의 객체로 읽어 들여야 하는데, 자바에서는 런타임 시에 제네릭 타입의 타입 정보(<Ingredient>)가 소거되어 리소스 타입을 지정하기 어렵다.
	- ParameterizedTypeReference를 생성하면 리소스 타입을 지정할 수 있다.

<br>

```java
// 가장 최근에 생성된 타코들 가져오기
public Iterable<Taco> getRecentTacosWithTraverson() {
    ParameterizedTypeReference<Resources<Taco>> tacoType =
        new ParameterizedTypeReference<Resources<Taco>>() {};

    Resources<Taco> tacoRes = traverson
                              .follow("tacos")
                              .follow("recents")
                              .toObject(tacoType);

//  Alternatively, list the two paths in the same call to follow()
//  Resources<Taco> tacoRes = traverson
//                            .follow("tacos", "recents")
//                            .toObject(tacoType);

    return tacoRes.getContent();
}
```
  - tacos 링크 다음 recents 링크를 따라간다.
<br>

Traverson을 사용하면 HATEOAS가 활성화된 API를 이동하면서 해당 API의 리소스를 쉽게 가져올 수 있다.  
Traverson은 API에 리소스를 쓰거나 삭제하는 메서드를 제공하지 않는다(RestTemplate은 리소스를 쓰거나 삭제할 수 있지만, API 이동이 어렵다).  
API의 이동과 리소스의 변경 또는 삭제 모두를 해야 한다면 RestTemplate과 Traverson을 함께 사용해야 한다.  
Traverson은 새로운 리소스가 생성될 링크로 이동할 때도 사용할 수 있으며, 이동한 다음 해당 링크를 RestTemplate에 지정하여 HTTP 요청이 가능하다.

<br>

```java
// 새로운 식자재(Ingredient 객체) 추가
public Ingredient addIngredient(Ingredient ingredient) {
    String ingredientsUrl = traverson
                            .follow("ingredients")
                            .asLink()
                            .getHref();
    return rest.postForObject(ingredientsUrl,
                              ingredient,
                              Ingredient.class);
}
```
  - ingredients 링크를 따라간 후에 asLink()를 호출하여 ingredients 링크 자체를 요청한다.
  - getHref()를 호출하여 이 링크의 URL을 가져온다.
  - 가져온 URL을 매개변수로 하여 RestTempate 인스턴스의 postForObject()를 호출 및 새로운 식자재를 추가할 수 있다.
<br>


### 요약
- 클라이언트는 RestTemplate을 사용해서 REST API에 대한 HTTP 요청을 할 수 있다.
- Traverson을 사용하면 클라이언트가 응답에 포함된 하이퍼링크를 사용해서 원하는 API로 이동할 수 있다.





## 14. 클라우드 구성 관리

스프링 클라우드의 구성 서버는 애플리케이션의 모든 마이크로서비스에 대해 중앙 집중식의 구성을 제공한다. 따라서, 구성 서버를 사용하면 애플리케이션의 모든 구성을 한 곳에서 관리할 수 있다.

### 배우는 내용
- 스프링 클라우드 구성 서버 실행
- 구성 서버 클라이언트 생성
- 보안에 민감한 구성 정보 저장
- 구성을 자동으로 리프레시


### 14.1 구성 공유하기

- 중앙 집중식 구성의 장점
  - 구성이 애플리에케이션 코드에 패키징되어 배포되지 않는다.
    - 재 빌드, 재배포 없이 실핼 중에 구성 변경 가능
  - 공통적인 구성을 공유하는 마이크로 서비스가 동일한 속성들을 공유할 수 있고, 한 곳에서 한 번만 변경해도 된다.
  - 보안에 민감한 구성 속성은 애플리케이션 코드와는 별도로 암호화하고 유지, 관리할 수 있다.
  - 복호화를 하는 코드가 애플리케이션에 없어도 된다.

### 14.2 구성 서버 실행하기
![](https://drek4537l1klr.cloudfront.net/walls7/Figures/14fig01_alt.jpg)   

- GitHub, GitLab, MS의 Team Foundation Server, Gogs 등의 Git 구현 서버가 구성 서버의 백엔드로 사용될 수 있다.
- Vault는 보안 처리된 구성 속성을 유지 및 관리할 수 있다.(14.5)


#### 14.2.1 구성 서버 활성화하기
```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```
스프링 클라우드 구성 서버 스타터 의존성

```xml
<properties>
  ...
  <spring-cloud.version>Hoxton.SR3</spring-cloud.version>
</properties>

...

<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-dependencies</artifactId>
      <version>${spring-cloud.version}</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```
스프링 클라우드 버전 의존성과 버전 속성

```yml
 # 구성 서버의 application.yml
server:
  port: 8888 # 구성 서버의 클라이언트가 구성 서버로부터 구성 데이터를 가져 올 때 사용되는 기본 포트 번호
  
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/habuma/tacocloud-config # 구성 서버가 처리할 구성 속성들이 있는 곳(구성 repository)
          order: 2
        vault:
          host: localhost
          port: 8300
          scheme: http
          order: 1
```
위의 2개 속성은 '구성 서버' 자체의 구성에 필요한 속성이다. 구성 서버가 클라이언트에 제공하는 구성 속성은 Git이나 Vault의 repository에서 가져온다.

```sh
curl localhost:8888/application/default/master
```
![](https://drek4537l1klr.cloudfront.net/walls7/Figures/14fig02.jpg)  

- 구성 서버의 클라이언트인 것처럼 구성 서버를 테스트해볼 수 있다.
- localhost:8888 : 구성 서버의 호스트 이름과 포트
- application : 애플리케이션 이름(spring.application.name)
- default : 활성화된 스프링 프로파일(E.g. production) (14.2.2)
- master : Git 라벨/분기(생략 가능, master가 기본값)

```json
{
  "name":"application",
  "profiles":["default"],
  "label":"master",
  "version":"551620858a658c9f2696c7f543f1d7effbadaef4",
  "state": null,
  "propertySources": 
  [
    {
	  "name":"https://github.com/habuma/tacocloud-config/application.yml",
	  "source":
	  {
	    "server.port":0,
	    "eureka.client.service-url.defaultZone":"http://localhost:8761/eureka/",
	    "spring.data.mongodb.password":"93912a660a7f3c04e811b5df9a3cf6e1f63850cdcd4aa092cf5a3f7e1662fab7"
	  }
    }
  ]
}
```
- 구성 속성들은 propertySources 속성에 포함된다. 
  - 여기서는 github.com/habuma/tacocloud-config에 추가해놓은 'name'과 'source'등의 몇 가지 구성 속성이 포함되어 있다.

#### 14.2.2 Git repository에 구성 속성 저장하기
- 구성 서버가 가져올 속성을 준비(저장)하는 방법
  - Git repository의 root 경로에 application.propertes나 application.yml 파일을 커밋하는 것

```yml
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/habuma/tacocloud-config # 구성 서버가 처리할 구성 속성들이 있는 곳(구성 repository)
          default-label: sidework # 분기 또는 라벨, uri에 분기를 따로 입력하지 않으면 해당 value로 가져온다.
          search-path: config, more* 
          username: tacocloud 
          password: tacocloud 

```
- default-label : # 분기 또는 라벨, uri에 분기를 따로 입력하지 않으면 해당 value로 가져온다.
- search-path : # Git root가 아닌 하위 경로
- username : Git repo 인증
- password : Git repo 인증

### 14.3 공유되는 구성 데이터 사용하기
- 스프링 클라우드 구성 서버는 중앙 집중식 구성 서버를 제공하는 것에 추가하여, 클라이언트 라이브러리도 제공한다.
  - 이 라이브러리가 스프링 부트 애플리케이션의 빌드에 포함되면 애플리케이션이 구성 서버의 클라이언트가 될 수 있다.
    ```xml
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>
    ```
  
  - 각 마이크로 서비스에 패키징되어 배포되는 application.yml 또는 application.properties
  ```yml
  spring:
    cloud:
      config:
        uri: http://localhost:8888 # 구성 서버의 uri 설정
  ```
    	
### 14.4 애플리케이션이나 프로파일에 특정된 속성 제공하기

#### 14.4.1 애플리케이션에 특정된 속성 제공
![](https://drek4537l1klr.cloudfront.net/walls7/Figures/14fig03_alt.jpg)  

- 특정 애플리케이션을 대상으로 하는 구성 속성을 관리할 수 있다.
  - 해당 애플리케이션의 spring.application.name 속성 값과 동일하게 구성 파일의 이름을 지정하는 것이 좋은 방법이다.
  - 구성 서버에 요청할 때 요청 경로의 첫 번째 부분으로 하여 각 서비스 애플리케이션의 spring.applicatio.name이 포함되기 때문에 해당 값과 일치하는 이름의 구성 파일이 전송된다.
- 애플리케이션 이름과 상관없이 모든 애플리케이션은 application.yml 파일의 구성 속성을 받는다.
- application.yml의 공통 속성과 애플리케이션에 특정한 구성 파일의 속성이 중복될 경우 특정된 속성들이 우선한다.

#### 14.4.2 프로파일로부터 속성 제공
- 구성 속성 작성 방법 (5.3.1)
  - 프로파일에 특정된 .properties 파일이나 YAML 파일을 제공한다. (E.g. application-production.yml)
  - 하나의 YAML 파일 내부에 3개의 하이픈(---)과 그 아랫 라인에 spring.profiles 값을 추가하여 여러 개의 프로파일 구성을 포함시킬 수 있다.
    - 그리고, spring.profiles.active 속성을 통해 특정 프로파일을 활성화할 수 있다. (5.3.2)

![](https://drek4537l1klr.cloudfront.net/walls7/Figures/14fig04_alt.jpg)  

- 요청 경로의 두 번째 부분으로 활성 프로파일을 production으로 알려주면 application.yml과 appliction-production.yml 모두가 반환된다.
  - 두 파일 중 중복된 속성이 있으면, application-production.yml의 속성들이 우선시된다.
 
#### 14.4.3 애플리케이션과 프로파일로부터 속성 제공
![](https://drek4537l1klr.cloudfront.net/walls7/Figures/14fig05_alt.jpg)  

- 애플리케이션 이름-프로파일 순서로 구성 파일의 이름을 지정하여 애플리케이션과 프로파일 모두에 특정된 속성들을 지정할 수 있다.
 
### 14.5 구성 속성들의 보안 유지하기
	
#### 14.5.1 Git 백엔드 repo에 저장된 구성 파일에 암호화된 값 쓰기
- Git 백엔드 repo에 저장되는 암호화된 데이터를 사용하는 핵심은 암호화 키(encryption key)이다.
- 암호화된 속성을 사용하기 위해서는 암호화 키를 사용해 구성 서버를 구성해야 하며, 암호화 키는 속성 값을 클라이언트 애플리케이션에 제공하기 전에 복호화하는데 사용된다.
- 대칭 키와 비대칭 키 모두 지원한다.
  - 대칭 키(암호화와 복호화에 사용하는 암호 키가 같음)
     ```yml
     encrpyt:
       key: s3cr3t
     ```  
	 
     - bootstrap.yml or bootstrap.propertes에 설정되어야 한다.
       - 자동-구성이 구성 서버를 활성화시키기 전에 로드되어 사용할 수 있기 때문

  - 비대칭 키(암호화와 복호화에 사용하는 암호 키가 다르며, 암호화에는 public 키, 복호화에는 private 키를 사용)
    - 비대칭 키 생성
	  ```sh
	  keytool -genkeypair -alias tacokey -keyalg RSA \
      -dname "CN=Web Server,OU=Unit,O=Organization,L=City,S=State,C=US" \
      -keypass s3cr3t -keystore keystore.jks -storepass l3tm31n
	  ```  
	  
	  - 결과로 생성되는 keystore.jks는 파일 시스템의 키스토어 파일로 유지하거나 애플리케이션 자체에 돌 수 있다.
	    - 둘 중 어느 경우든 해당 키스토어의 위치와 인증 정보를 구성 서버의 bootstrap.yml 파일에 구성해야 한다.
		  - 암호화 관련 파일을 설치해야 한다.(https://www.oracle.com/java/technologies/javase-jce8-downloads.html)
	      - 키스토어를 애플리케이션 자체(classpath의 root)에 둔다고 하면 bootstrap.yml에 다음과 같이 작성해야 한다.
            ```yml
              encrypt:
                key-store:
                  alias: tacokey
                  location: classpath:/keystore.jks
                  password: l3tm31n
                  secret: s3cr3t
		    ```
- 키나 키스토어가 준비된 후에는 데이터를 암호화해야 한다.
  - 구성 서버는 /encrypt 엔드포인트를 제공하기 때문에, 암호화될 데이터를 갖는 POST 요청을 /encrpt 앤드포인트에 하면 된다.
  - E.g. 몽고DB 비밀번호 암호화
    - POST 요청으로 암호화된 값 응답 받기
      ```sh
      $ curl localhost:8888/encrypt -d "s3cr3tP455w0rd"
      93912a660a7f3c04e811b5df9a3cf6e1f63850cdcd4aa092cf5a3f7e1662fab7
      ```
   - Git repo에 저장된 application.yml 파일에 spring.data.mongodb.password 속성 추가
     ```yml
	 spring:
       data:
         mongodb:
           password: '{cipher}93912a660a7f3c04e811b5df9a3cf6e1f63850...'
     ```
- 암호화된 데이터 가져오기
  - 복호화된 값을 받기
    - 기본적으로 구성 서버가 제공하는 암호화된 값은 백엔드 Git repo에 저장되어 있을 때만 암호화되어 있으며, 구성 서버에 의해 복호화된 후 제공된다.
     ```sh
      $ curl localhost:8888/application/default | jq
      {
        "name": "app",
        "profiles": [
          "prof"
        ],
        "label": null,
        "version": "464adfd43485182e4e0af08c2aaaa64d2f78c4cf",
        "state": null,
        "propertySources": [
          {
            "name": "http://localhost:10080/tacocloud/tacocloud-config/application.yml",
            "source": {
              "spring.data.mongodb.password": "s3cr3tP455w0rd"
            }
          }
        ]
      }
     ```
   - 복호화하는 코드를 애플리케이션 코드에 포함시킬 필요 없다.
  
  - 암호화된 값 받기
    - 구성 서버의 bootstrap.yml에 spring.cloud.config.server.encrypt.enabled 속성을 false로 설정하면 된다.
      ```yml
      spring:
        cloud:
          config:
            server:
              git:
                uri: http://localhost:10080/tacocloud/tacocloud-config
              encrypt:
                enabled: false
      ```
	- curl 실행을 통한 확인
      ```sh
	  $ curl localhost:8888/application/default | jq
      {
        ...
        "propertySources": [
          {
            "name": "http://localhost:10080/tacocloud/tacocloud-config/application.yml",
            "source": {
              "spring.data.mongodb.password": "{cipher}AQA4JeVhf2cRXW..."
            }
          }
        ]
      }
	  ```
#### 14.5.2 Git 백엔드 repo와 함께(또는 대신하여) 구성 서버의 백엔드 repo로 Vault 사용하기
- Vault는 보안 관리 도구로, Git 서버와 다르게 보안 정보를 자체적으로 처리한다.
- Vault 서버 시작
  ```sh
  $ vault server -dev -dev-root-token-id=roottoken
  $ export VAULT_ADDR='http://127.0.0.1:8200'
  $ vault status
  ```
  - Vault 서버를 사용하려면 토큰을 제공해야 한다. 
    - 루트 토큰은 관리용 토큰이다.
	  - 많은 토큰 생성이 가능
	  - 보안 정보를 읽거나 쓰는 데 사용 가능
  - Vault 서버의 위치를 알 수 있도록 VAULT_ADDR 환경 변수를 설정해야 한다.
  - Vault 사전 준비
    ```sh
    vault secrets disable secret
    vault secrets enable -path=secret kv
    ```  
	
- 보안 데이터를 Vault에 쓰기
  - 몽고DB의 비밀번호 저장
    ```sh
    vault write secret/application spring.data.nongodb.password=s3cr3t
    ```
	![](https://drek4537l1klr.cloudfront.net/walls7/Figures/14fig06_alt.jpg)  
	
    - write : 데이터 쓰기 수행
	- secret : Vault 백엔드 서버
	- /application : 보안 데이터 경로(연관된 보안 데이터를 지정된 경로에 모아둘 수 있게 한다)
	- spring.data.mongodb.password : 보안 키 
	- s3cr3t : 보안(암호화) 처리될 값
- Vault에서 보안 데이터 읽기
  ```
  $ vault read secret/application
  Key                             Value
  ---                             -----
  refresh_interval                768h
  spring.data.mongodb.password    s3cr3t
  ```
- 구성 서버에서 Vault 백엔드 활성화하기
  - 구성 서버의 application.yml 파일에 활성화 프로파일로 vault를 추가한다.
    ```yml
    spring:
      profiles:
        active:
        - vault
        - git
	```
   
  - 구성 서버의 application.yml 파일에 vault 관련 값들을 변경한다.
    ```yml
  	spring:
      cloud:
        config:
          server:
            git:
              uri: https://github.com/habuma/tacocloud-config 
              order: 2
            vault:
              host: localhost
              port: 8300
              scheme: http
              order: 1
    ```
  - X-config-Token 헤더를 추가하여 요청한다.
    ```sh
    $ curl localhost:8888/application/default
        -H"X-Config-Token: roottoken" | jq
    ```
- 구성 서버 클라이언트에 Vault 토큰 설정하기
  - 각 서비스 애플리케이션의 로컬 구성에 다음과 같이 추가한다.
    ```yml
    spring:
      cloud:
  	  config:
  	    token: roottoken
    ```
    - 이 속성은 구성 서버의 Git이나 Vault 백엔드에 저장되지 않고 애플리케이션의 로컬 구성에 설정되어야 한다. 그래야만 구성 서버가 Vault에 전달하고, 구성 속성을 제공할 수 있기 때문이다.
- 애플리케이션과 프로파일에 특정된 보안 속성 쓰기
  - 요청 경로의 application 부분을 해당 애플리케이션 이름으로 교체
    ```sh
    $ vault write secret/ingredient-service \
              spring.data.mongodb.password=s3cr3t
	```
  - 특정 프로파일 속성
    ```sh
    % vault write secret/application,production \
              spring.data.mongodb.password=s3cr3t \
              spring.data.mongodb.username=tacocloud
	```

## 14.6 실시간으로 구성 속성 리프레시
### 14.6.1 구성 속성 자동으로 리프레시
![](https://drek4537l1klr.cloudfront.net/walls7/Figures/14fig07_alt.jpg)  

- 속성 리프레시 절차
  - 웹훅이 Git repo에 생성되어 Git repo에 대한 변경이 생겼을을 구성 서버에 알려준다.
  - 구성 서버는 RabbitMQ나 Kafka와 같은 메시지 브로커를 통하여 변경 관련 메시지를 전파함으로써 웹훅의 POST 요청에 반응
  - 알림을 구독하는 구성 서버 클라이언트 애플리케이션은 구성 서버로부터 받은 새로운 속성 값으로 자신의 속성을 리프레시

- 구성 서버를 통한 속성의 자동 리프레시 사용 시 고려할 사항
  - 구성 서버와 이것의 클라이언트 간의 메시지 처리에 사용할 수 있는 메시지 브로커가 필요하며, RabbitMQ나 Kafka 중 하나를 선택할 수 있다.
  - 웹훅이 Git 백엔드 repo에 생성되어야 한다.
  - 구성 서버는 구성 서버 모니터 의존성 및 카프카 스프링 클라우드 스트림 의존성과 함께 활성화되어야 한다.
  - 메시지 브로커가 기본 설정으로 로컬에서 실행되는 것이 아니라면, 브로커에 연결하기 위한 세부 정보를 구성 서버와 이것의 모든 클라이언트에 구성해야 한다.
  - 각 구성 서버 클라이언트 애플리케이션에 스프링 클라우드 버스 의존성이 추가되어야 한다.
  
- 웹훅 생성
- 구성 서버에서 웹훅 처리
  - 스프링 클라우드 구성 모니터 의존성 추가
    - 자동-구성이 /monitor 엔드포인트를 활성화한다.
      ```xml
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-monitor</artifactId>
      </dependency>
      ```  
	  
  - 스프링 클라우드 스트림 의존성 추가
    ```xml
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
    </dependency>
    
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-stream-kafka</artifactId>
    </dependency>
    ```  
	
    - 둘 중 하나를 선택하면 된다.
    - 구성의 변경 알림을 전파하는 수단이다.
  - 메시지 브로커 설정
- Gogs 알림 추출기 생성
  - 책 집필 당시에는 지원되지 않아 코드를 직접 작성함
  - 최신 버전에는 Gogs 알림도 지원하여 해당 코드를 애플리케이션에 포함시킬 필요 없음
  - 코드 : https://livebook.manning.com/book/spring-in-action-fifth-edition/chapter-14/1
  - 해당 기능과 관련된 github 이슈 : https://github.com/spring-cloud/spring-cloud-config/pull/1003
- 구성 서버 클라이언트에 속성의 자동 리프레시 활성화
  - 구성 서버 클라이언트에 의존성 추가
    ```xml
    <!-- RabbitMQ -->
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-bus-amqp</artifactId>
    </dependency>
   
    <!-- Kafka -->
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-bus-kafka</artifactId>
    </dependency>
    ```
