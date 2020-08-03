---
layout  : wiki
title   : HTTP
summary : 
date    : 2019-02-16 12:55:24 +0900
updated : 2020-08-04 03:34:46 +0900
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

### 2XX Success
서버가 클라이언트의 요청을 성공적으로 처리했다는 의미

- 200 OK
	- 클라이언트의 요청을 서버가 정상적으로 처리했다.
	```
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
	```
	POST /users HTTP/1.1
	Content-Type: application/json
	{
		"name": "hak"
	}
	```
	<br>
	
	```
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
	```
	DELETE /users/1 HTTP/1.1
	```  
	<br>
	
	```
	HTTP/1.1 204 No Content
	```
### 3XX Redirection
 
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
	```
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

- 403 Forbidden
	- 클라이언트가 권한이 없기 때문에 작업을 진행할 수 없는 경우

- 404 Not Found
	- 클라이언트가 요청한 자원이 존재하지 않다.
	- 브라우저(클라이언트) 입장에선 자원이 웹 페이지 경로고 존재하지 않는 경로(자원)를 요청했기 때문에 404 상태 코드를 응답했다.

REST API에선 크게 두 가지 경우에서 404 상태 코드를 응답한다.

경로가 존재하지 않음

자원이 존재하지 않음



출처: https://sanghaklee.tistory.com/61 [이상학의 개발블로그]



출처: https://sanghaklee.tistory.com/61 [이상학의 개발블로그]


출처: https://sanghaklee.tistory.com/61 [이상학의 개발블로그]

### 5XX Server error
클라이언트의 요청이 유효하지 않아 서버가 해당 요청을 수행하지 않았다는 의미


출처: https://sanghaklee.tistory.com/61 [이상학의 개발블로그]


출처: https://sanghaklee.tistory.com/61 [이상학의 개발블로그]

- References
	- https://sanghaklee.tistory.com/61
	- https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml


