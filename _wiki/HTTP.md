---
layout  : wiki
title   : HTTP
summary : 
date    : 2019-02-16 12:55:24 +0900
updated : 2019-09-28 21:25:41 +0900
tag     : 
toc     : true
public  : true
parent  : Network
latex   : false
---
* TOC
{:toc}

## 0. 개요

HTTP(HyperText Transfer Protocol) : 클라이언트와 서버 사이에 이루어지는 요청(Request) / 응답(Response) 프로토콜.  
TCP/IP 위에서 동작한다. HTML뿐만 아니라 이미지, 동영상 등 어느 종류의 데이터든지 전송 가능하다. 
클라이언트인 웹 브라우저가 HTTP를 통해 서버로부터 웹 페이지나 그림 정보 등을 요청하면 서버는 이 요청에 응답하여 필요한 정보를 전달하게 된다. 전달되는 자료는 http:로 시작하는 URL로 조회할 수 있다.  


## 1. 특징
1. Connectless : 서버에 연결하고 요청하여 응답을 받으면 연결을 끊는다. 기본적으로 자원 하나에 대하여 하나의 연결을 맺는다.

2. Stateless : 통신이 끝나면 상태 정보를 유지하지 않는다.  
	불특정 다수를 대상으로 하는 서비스에 적합하다.  
	접속 유지를 최소한으로 할 수 있기 때문에 더 많은 유저의 요청을 처리할 수 있다.  
	이전 상태를 알 수 없기 때문에 서버가 클라이언트를 식별하기 위해 Cookie와 Session을 이용한다.
	
3. Cookie : 클라이언트에 저장되는, 클라이언트와 서버의 상태 정보를 담고 있는 데이터 파일이다.  
	이름, 값, 만료 날짜, 경로 정보 등이 포함되어 있다. 일정 시간 동안 데이터 저장이 가능하다. 서버에서 만들어진 Response Header에 넣어 보내고, 브라우저가 매번 Request Header에 쿠키를 넣어 서버에 전송한다.
	
4. Session : 서버 메모리에 저장되는 정보.
	서버에 저장되기 때문에 쿠키와 달리 사용자 정보가 노출되지 않는다.  
	클라이언트가 로그인을 하면 unique한 Session ID를 생성하고 로그인ID와 mapping한다.  
	클라이언트에 Session ID를 Cookie로 저장한다. Session ID로 클라이언트를 식별한다.  
	Session은 서버 메모리에 저장되지만, Session 역시 클라이언트에 Cookie로 저장된다.
	
5. URL : 웹 브라우저는 URL을 이용하여 자원의 위치를 찾는다. (URL은 HTTP와 독립된 체계이다.)  
	http - 자원에 접근하기 위한 프로토콜  
	www.naver.com - 인터넷 상의 자원 위치. Domain은 IP주소로 변환되므로 IP주소로 서버의 위치를 알 수 있다.  
	search?alphabet - 요청한 자원의 이름  
	
	이렇게 '[Protocol]/[자원의 위치]/[자원명]' 으로 언제 어디서든 인터넷 상에서 자원에 접근할 수 있다.
