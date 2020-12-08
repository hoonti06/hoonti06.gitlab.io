[[---]]
layout  : wiki
title   : HTTP
summary : 
date    : 2019-02-16 12:55:24 +0900
updated : 2020-08-17 16:52:28 +0900
tag     : 
public  : true
parent  : [[network]]
latex   : false
---

## 0. 개요

HTTP(HyperText Transfer Protocol) : 클라이언트와 서버 사이에 이루어지는 `요청(Request) / 응답(Response)` 프로토콜.  
TCP/IP 위에서 동작한다. HTML뿐만 아니라 이미지, 동영상 등 어느 종류의 데이터든지 전송 가능하다. 
클라이언트인 웹 브라우저가 HTTP를 통해 서버에게 웹 페이지나 그림 정보 등을 요청하면 서버는 이에 응답하여 필요한 정보를 전달하게 된다. 전달되는 자료는 http:로 시작하는 URL로 조회할 수 있다.  
HTTP는 연결이 필수가 아님


## 1. 특징
1. Connectionless : 서버에 연결하고 요청하여 응답을 받으면 연결을 끊는다. 기본적으로 **자원 하나에 대하여 하나의 연결**을 맺는다. 
				

3. Stateless : 통신이 끝나면 상태 정보를 유지하지 않는다.  
	불특정 다수를 대상으로 하는 서비스에 적합하다.  
	접속 유지를 최소한으로 할 수 있기 때문에 더 많은 유저의 요청을 처리할 수 있다.  
	이전 상태를 알 수 없기 때문에 서버가 클라이언트를 식별하기 위해 Cookie와 Session을 이용한다.
	
4. Cookie : `클라이언트에 저장되는`, 클라이언트와 서버의 상태 정보를 담고 있는 데이터 파일이다.  
	이름, 값, 만료 날짜, 경로 정보 등이 포함되어 있다. 일정 시간 동안 데이터 저장이 가능하다. 서버에서 만들어진 Response Header에 넣어 보내고, 브라우저가 매번 Request Header에 쿠키를 넣어 서버에 전송한다.
	
5. Session : `서버 메모리에 저장되는 정보`.
	서버에 저장되기 때문에 쿠키와 달리 사용자 정보가 노출되지 않는다.  
	클라이언트가 로그인을 하면 unique한 Session ID를 생성하고 로그인ID와 mapping한다.  
	클라이언트에 Session ID를 Cookie로 저장한다. Session ID로 클라이언트를 식별한다.  
	Session은 서버 메모리에 저장되지만, Session 역시 클라이언트에 Cookie로 저장된다.
	
	
6. URL : 웹 브라우저는 URL을 이용하여 자원의 위치를 찾는다. (URL은 HTTP와 독립된 체계이다.)  
	- http - 자원에 접근하기 위한 방법, 프로토콜  
	- www.naver.com - 인터넷 상의 자원 위치. Domain은 IP주소로 변환되므로 IP주소로 서버의 위치를 찾는다.  
	- search?alphabet - 요청한 자원의 이름  
	
	이렇게 '[Protocol]/[자원의 위치]/[자원명]' 으로 언제 어디서든 인터넷 상에서 자원에 접근할 수 있다.
	
## 2. 메시지 구조
- request
- response

## 3. 메소드
- GET
	- 요청받은 URI의 정보를 검색하여 응답한다
	- 서버에서 리소스를 달라고 요청하기 위해 사용
- POST
	- 요청된 리소스를 생성(CREATE)한다. 새로 작성된 리소스인 경우 HTTP 헤더 항목 'Location : {URI}' 를 포함하여 응답해야 한다.
- DELETE
	- 요청된 리소스를 삭제할 것을 요청함. (안전성 문제로 대부분의 서버에서 비활성)
	- HTTP 명세는 서버가 클라이언트에게 알지지 않고 요쳥을 무시하는 것을 허용하여 삭제 수행에 대한 보장을 하지 못한다.
- HEAD
	- GET방식과 동일하지만, 응답에 BODY가 없고 응답코드와 HEAD만 응답한다.
	- 웹서버 정보확인, 헬스체크, 버젼확인, 최종 수정일자 확인등의 용도로 사용된다.
- PUT
	- 일반적으로 리소스 수정(UPDATE)할 때 사용한다.
	- 서버가 요청의 본문을 가지고 요청 URL의 이름대로 새 리소스를 만들거나, 이미 URL이 존재한다면 본문을 사용해서 교체한다.
- PATCH
	- PUT과 유사하게 요청된 리소스를 수정(UPDATE)할 때 사용한다. 
	- PUT의 경우 리소스를 전체를 갱신하는 의미지만, PATCH는 해당 리소스의 일부를 교체하는 의미로 사용.
- OPTIONS
	- 웹서버에서 특정 리소스에 대해 지원되는 메소드의 종류를 확인할 경우 사용.
- TRACE
	- 원격지 서버에 루프백 메시지 호출하기 위해 테스트용으로 사용.
	- 요청이 방화벽, 프락시, 게이트웨이 등을 거칠 수 있는데, 서버에 자신의 요청이 어떻게 수정되어 도달했는지 확인할 수 있다.

## POST vs PUT
PUT은 식별자를 포함해야 한다. 꼭 존재하는 식별자일 필요는 없고, 존재하지 않는 식별자일 경우 리소스를 생성하게 된다.  
POST로 동일한 요청을 보내면 2개의 자원을 생성한다. 반면, PUT으로 동일한 요청을 2번 보낼 경우 첫 번째에 리소스가 생성되고, 두 번째에 리소스가 교체된다.  
POST는 멱등이 아니고, PUT은 멱등이다. (멱등은 한 번 적용하나 여러 번 적용하나 항상 같은 결과를 나타내는 것을 의미)

## PUT vs PATCH
PUT은 자원의 전체를 교체하기 때문에 자원 내의 모든 필드가 필요하다. 일부 필드만 전달할 경우, 그 외 필드는 비어 있게 되거나 초기값으로 변경될 것이다.
PATCH는 자원의 부분을 교체하기 때문에 교체할 필드만 전달하면 된다.

```http
PUT /members/1
{
    name : "hoon",
    age : 28,
}

PATCH  /members/1
{
    name : "jihoon"
}
```



https://tools.ietf.org/html/rfc7231#section-4.3 (method)
https://tools.ietf.org/html/rfc7231#section-8.1.3 (멱등)
https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html (method)
https://multifrontgarden.tistory.com/245 (POST vs PUT)
https://stackoverflow.com/questions/29092787/http-post-response-location-header-when-creating-multiple-resources (POST respose location)
https://papababo.tistory.com/269 (PUT vs PATCH)


## 3.
1. 웹브라우저는 서버의 URL에서 호스트 명(도메인 네임 또는 IP주소)을 추출한다.
2. 웹브라우저는 서버의 호스트 명을 IP로 변환
3. 웹브라우저는 URL에서 포트 번호가 있다면 추출한다.
4. 웹브라우저는 웹 서버와 TCP커넥션을 맺는다.
5. 웹브라우저는 서버에 HTTP 요청을 보낸다.
6. 서버는 웹브라우저에 HTTP 응답을 돌려준다.
7. 커넥션이 닫히면, 웹브라우저는 문서를 보여준다.

## 4. 웹의 구성 요소
- 프락시
	- 클라이언트와 서버 사이에 위치한 HTTP 중개자
	- 사용자를 대신해서 서버에 접근
	- 보안 개선, 성능 향상, 비용 절약
	- 가운데에서 웹 서버이기도 하면서 웹 클라이언트이기도 하다.
- 캐시
	- 많이 찾는 웹페이지를 클라이언트 가까이에 보관하는 HTTP 창고
	- 웹 캐시와 캐시 프락시는 자신을 거쳐 가는 문서들 중 자주 찾는 것의 ㅅ하본을 저장해 두는, 특별한 종류의 HTTP 프락시 서버
	- 속도 향상
- 게이트웨이 
	- 다른 애플리케잇ㄴ과 연결된 특별한 웹 서버



HTTP/1.1에서는 keep-alive 커넥션을 지원하지 않는 대신, 설계가 더 개선된 지속커넥션을 지원한다. 지속 커넥션의 목적은 keep-alive 커넥션과 같지만 그에 비해 더 잘 동작한다.
HTTP/1.0의 keep-alive 커넥션과는 달리 HTTP/1.1의 지속 커넥션은 기본으로 활성화되어 있다.
커넥션을 끊으려면 Connection:close 헤더를 명시해야 한다. 하지만 명시를 하지 않더라도 언제든지 커넥션을 끊을 수 있다. 즉, close를 보내지 않는다고 커넥션이 영원히 유지되는 것은 아니다.


Keep-Alive(HTTP/1.0)
한 웹페이지에 여러 이미지와 HTML을 요청해야 하는 경우 TCP 커넥션을 매 번 맺으면 성능이 안 좋아짐
=> 맺고 끊는 데서 발생하는 지연을 없애기 위해 한 번 연결한 TCP 커넥션을 재활용


## 5. 상태 코드

https://developer.mozilla.org/ko/docs/Web/HTTP/Status

## REST API에서의 HTTP 상태 코드
### 1XX Information
요청을 받았으며 프로세스를 계속 진행

- 100 Continue
	- 진행 중임을 의미하는 응답코드
	- 현재까지의 진행상태에 문제가 없으며, 클라이언트가 계속해서 요청을 하거나 이미 요청을 완료한 경우에는 무시해도 되는 것을 알려준다.
- 101 Switching Protocols
	- 요청자가 서버에 프로토콜 전환을 요청했으며, 서버에서 이를 승인하는 중을 의미함

### 2XX Success
서버가 클라이언트의 요청을 성공적으로 처리했다는 의미

- 200 OK
	- 클라이언트의 요청을 서버가 정상적으로 처리했다.
	```http
	HTTP/1.1 200 OK
	{
		"result" : false
		"status" : 400
	}
	```
	- 상태 코드는 200(성공)인데, body 내용엔 실패에 관한 내용을 리턴하고 있다.
	- 모든 응답을 200으로 처리하고 body 내용으로 성공, 실패 여부를 판단하는 구조
	- API가 아닌 HTML 웹 프로젝트에서 많이 사용된다.
	- 웹 프로젝트에선 크게 문제가 되지 않으나 API에선 많이 이상한 구조다.
	- 웹의 설계를 그대로 사용하는 경우 많이 하는 실수다.

- 201 Created
	- 성공과 동시에 새로운 리소스가 생성되었다는 의미를 포함한다.
	```http
	POST /users HTTP/1.1
	Content-Type: application/json
	{
		"name": "hak"
	}
	```
	<br>
	
	```http
	HTTP/1.1 201 Created
	{
		"id" : 1,
		"name" : "hak"
	}
	```
	- 리소스 생성에 대해 200으로 보내줘도 되지만, 더 정확한 의미 전달을 위해 201 코드를 사용하자.
	- Content-Location을 이용해 리소가 생성된 위치를 알려주면 더 좋다.

- 202 Accepted
	- 클라이언트의 요청이 정상적이나 작업을 완료하는 데에 시간이 오래 걸려 나중에 알려주겠다는 의미
	- 요청의 완료 여부를 확인할 수 있는 방법을 제공해야 한다
		- Callback
		- polling

- 204 No Content
	- 클라이언트의 요청은 정상적이나, 컨텐츠를 제공하지 않는다.
	- HTTP Response body가 존재하지 않는다.
	- 자원 삭제에 대한 응답으로 사용될 수 있으나, 흔하지 않다.
	```http
	DELETE /users/1 HTTP/1.1
	```  
	<br>
	
	```http
	HTTP/1.1 204 No Content
	```
### 3XX Redirection
- 300 Multiple Choice
	- 요청에 대해서 하나 이상의 응답이 가능합니다. 사용자 에언트 또는 사용자는 그중에 하나를 반드시 선택해야 합니다. 응답 중 하나를 선택하는 방법에 대한 표준화 된 방법은 존재하지 않습니다.
- 301 Moved Permanently
	- 이 응답 코드는 요청한 리소스의 URI가 **영구적**으로 변경되었음을 의미
	- Location 헤더에 변경된 URL을 포함해야 한다.

- 302 Found
	- 이 응답 코드는 요청한 리소스의 URI가 **일시적**으로 변경되었음을 의미
	- 임시 목적으로 Location 헤더에 변경된 URL을 포함해야 한다.
	- 클라이언트는 이후의 요청도 반드시 원래 URI로 해야한다.
	- POST 요청에 대한 응답으로 302를 받으면, 클라이언트는 Location 헤더에 들어있는 리다이렉트 URL을 GET 요청으로 따라갈 것이다.
 
- 303 See Other
	- 클라이언트가 요청한 리소스를 다른 URI에서 가져와야 한다고 말해주고자 할 때 사용
	- 주 목적은 POST 요청에 대한 응답으로 클라이언트에게 리소스의 위치를 알려주는 것

- 304 Not Modified
	- 캐시를 목적으로 사용
	- 이것은 클라이언트에게 응답이 수정되지 않았음을 알려주어 클라이언트는 계속해서 응답의 캐시된 버전을 사용 가능

- 305 Use Proxy
	- 반드시 프록시를 통해서 접속해야 함을 알려주기 위해 사용한다.
	- 프락시의 위치는 Location 헤더를 통해 주어진다.
	- 프락시가 요청에 잘못 간섭하면 오동작 및 보안 문제 유발 가능성으로 사라져 가고 있음

- 306 Unused
	- 현재는 사용되지 않는다.

- 307 Temporary Redirect
	- 302와 동일
	- 그러나, 사용자 에이전트가 반드시 사용된 HTTP 메소드를 변경하지 말아야 하는 점만 다름.
		- 첫 번째 요청에 POST가 사용되었다면, 두 번째 요청도 POST를 사용해야 한다.


- 참고) 
	- 301 vs 302
		- 검색엔진 크롤러
			- 301의 경우 검색엔진은 과거 URL의 페이지랭킹과 평가점수를 새로운 URL로 이동시킨다.
			- 302의 경우 검색엔진은 페이지랭킹이나 링크에 대한 점수를 새로운 URL로 옮기지 않으며 기존 URL을 그대로 유지
			- 활용 방법
				- 해당 제품이 보유한 사이트랭크를 유지하면서 사용자에게 일시적으로 제품이 품절됐음을 알려야 할 때
					- 301을 사용하거나 혹은 페이지의 content를 변경하게 되면 사이트랭킹 점수가 달라지게 되낟.
					- 302를 사용하여 검색엔진은 일시적으로 해당 URL의 사이트랭크는 유지시키고, 사용자는 새로운 URI의 content를 보게 된다.
	- 302 vs 303 vs 307
		- HTTP/1.0에는 302 밖에 없었고, 리다이렉트 요청에 처음 요청의 HTTP 메소드를 변경하지 않는 것으로 되어 있었다. 하지만, 많은 브라우저가 이 표준을 무시했고, 리다이렉트 URL에 항상 GET을 사용했다.
		- 이러한 모호함을 없애기 위해 HTTP/1.1에 303과 307이 추가되었다.
		- 303은 처음 요청이 어떤 메소드건 간에 새 URL에 GET 요청을 한다.
		- 307은 처음 요청과 동일한 메소드로 새 URL에 요청을 한다.
 
### 4XX Client error
클라이언트의 요청이 유효하지 않아 서버가 해당 요청을 수행하지 않았다는 의미
- 400 Bad Request
	- API 서버는 클라이언트 요청이 들어오면 바로 작업을 진행하지 않고 요청이 서버가 정의한 유효성에 맞는지 확인 후 진행한다.
	- 다음과 같은 사전 유효성 검증 작업을 진행할 수 있다.
		- 필수 여부
		- 유효 여부
		- 범위
		- 패턴
		- …

	- 대부분의 API는 사전에 유효성 검증을 통해 400 상태 코드로 클라이언트에게 유효하지 않은 요청임을 응답한다.  
	  (유효성 검증 없이 진행하면 5xx 서버 오류가 발생할 수 있기 때문에 대부분 사전에 막는 로직을 추가한다.)
	```http
	HTTP/1.1 400 Bad Request
	{
		"errors": {
			"message": "'name'(body) must be String, input 'name': 123",
				"detail": [
				{
					"location": "body",
					"param": "name",
					"value": 123,
					"error": "TypeError",
					"msg": "must be String"
				}
				]
		}
	}
	```
	- 오류 발생 시 파라미터의 위치(path, query, body), 사용자 입력 값, 에러 이유를 꼭 명시하는 것이 좋다.
- 401 Unauthorized
	- 클라이언트가 권한이 없기 때문에 작업을 진행할 수 없는 경우
	- 인증이 아직 안 되어 권한이 없는 상태 (E.g. 로그인이 안 된 상태)

- 403 Forbidden
	- 클라이언트가 권한이 없기 때문에 작업을 진행할 수 없는 경우
	- 인증되었지만 요구되는 권한보다 낮은 경우 (E.g. 관리자만 접근 가능한 경우)
	- 401과의 차이점(https://stackoverflow.com/a/28672217)

- 404 Not Found
	- 클라이언트가 요청한 자원이 존재하지 않다.
	- 브라우저(클라이언트) 입장에선 자원이 곧 웹 페이지 경로이고, 존재하지 않는 경로(자원)를 요청했기 때문에 404 상태 코드를 응답받는다.
	- REST API에선 크게 두 가지 경우에서 404 상태 코드를 응답한다.
		- 경로가 존재하지 않는 경우
		- 자원이 존재하지 않는 경우
			- 경로가 존재하더라도 자원의 존재 여부를 사전에 확인해야 오류를 미리 차단할 수 있다.

- 405 Method Not Allowed
	- REST API에서 HTTP Method는 4가지(POST, GET, PUT, DELETE)가 있다.
	- 자원(URI)은 존재하지만, 해당 자원이 지원하지 않는 메소드일 때 응답하는 상태 코드
	- HTTP OPTIONS Method를 사용하면 HTTP Response header의 Allow에 해당 자원의 지원 메소드 리스트를 응답 받을 수 있다.
		- 완성도 높은 API를 위해 OPTIONS Method를 제공하기를 추천한다.
		```http
		OPTIONS /users/1 HTTP/1.1
		```
		```http
		HTTP/1.1 200 OK
		Allow: GET,PUT,DELETE,OPTIONS,HEAD
		```
		- 참고)
			- POST /users/:id는 GET, PUT, DELETE 메소드는 허용되나 POST는 허용되지 않는다.
			- GET, PUT, DELETE의 경우 id 1의 사용자가 없다면 404로 응답한다.
			```http
			GET /users/1 HTTP/1.1
			```
			```http
			HTTP/1.1 404 Not Found
			```
			- POST의 경우 지원하지 않는 메소드이기 때문에 405로 응답하는 것이 옳은 방법이다.
			```http
			POST /users/1 HTTP/1.1
			```
			```http
			HTTP/1.1 405 Method Not Allowed
			Allow: GET,PUT,DELETE,OPTIONS,HEAD
			```

- 409 Conflict
	- 클라이언트의 요청이 서버의 상태와 충돌이 발생한 경우 
	- 충돌은 매우 추상적이어서 정의하기 나름이다.
	- 400, 401, 403, 404, 405 상태 코드에 속하기 모호한 오류들을 409로 응답할 수 있다.
		- 응답 시 오류의 원인을 알려야 한다. 추가적으로, HATEOAS를 이용해 클라이언트가 다음 상태로 전이될 수 있는 링크를 함께 응답하면 좋다.

		```http
		HTTP/1.1 409 Conflict
		{
			"message" : "First, delete posts"
			"links": [
				{
					"rel": "posts.delete",
					"method": "DELETE",
					"href": "https://api.rest.com/v1/users/1/posts"
				},
			]
		}
		```
- 429 Too Many Requests
	- 클라이언특라 일정 시간 동안 너무 많은 요청을 보낸 경우
	- DoS, Brute-force attack 등의 비정상적인 방법으로 자원을 요청하는 경우 응답한다.
	- 서버가 감당하기 힘든 요청이 계속 들어오면 서버는 다른 작업을 처리하지 못할 것이다.
	- 해당 상태 코드는 HTTP header의 Retry-After(단위 : sec)와 함께 일정 시간 뒤 요청할 것을 나타내는 것이다.
	```http
	HTTP/1.1 429 Too Many Requests
	Retry-After: 3600
	```

### 5XX Server error
- 클라이언트의 요청은 유효하여 작업을 진행했고, 도중에 오류가 발생한 경우  
- API 서버의 응답에서 5XX 오류가 발생해서는 안 된다. 
- 보통 개발 과정에서 유효하지 않은 요청(400)을 사전 처리를 안 한 경우에 많이 발생한다.  

- 500 Internal Server Error
	- 개발자의 실수로 발생할 여지가 크다.
	- 4XX 오류를 발생시킬 가능성이 있는 요청에 대해 사전 작업을 하지 않은 경우
		- 파라미터 필수 값, 유효성 확인 없이 비즈니스 로직 진행
		- 외부 API에서 받은 객체를 확인하지 않고 비즈니스 로직 진행
- 502 Bad Gateway
	- 게이트웨이가, 연결된 서버로부터 잘못된 응답을 받았을 때 사용
- 503 Service Unavailable
	- 현재 서버가 유지보수 또는 과부하 등의 이유로 일시적인 사용 불가함을 의미
- 504 Gateway Timeout
	- 게이트웨이가, 연결된 서버로부터 응답을 받을 수 없었을 때 사용
- 505 HTTP Version Not Supported
	- HTTP 버전을 서버가 처리할 수 없다. 
	- 브라우저는 서버가 처리 가능한 HTTP 버전을 자동으로 선택하므로, 왠만해서는 볼수 없는 오류이다.
- 511 Network Authentication Required
	- 사용자가 네트워크 엑세스 권한이 필요한 경우에 사용(보통 로그인)


- References
	- https://sanghaklee.tistory.com/61
	- https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
	- https://velog.io/@honeysuckle/HTTP-%EC%83%81%ED%83%9C-%EC%BD%94%EB%93%9C-HTTP-status-code-
	- 도서 [[http-the-definitive-guide]]{HTTP 완벽 가이드}
	- https://www.whatap.io/ko/blog/40/


