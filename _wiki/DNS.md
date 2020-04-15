---
layout    : wiki
title     : DNS
summary   : DNS 서버 접속 과정
date      : 2019-02-10 15:26:38 +0900
updated   : 2020-04-14 21:53:04 +0900
tag       :
public    : true
parent    : network
published : true
latex     : false
---

## 0. 개요

DNS(Domain Name Service) : 4개의 3자리 수가 나열된 IP주소를 대신하여 기억하기 좀 더 수월한 영문으로 사용한다. 이를 도메인 네임이라고 한다.

'www.naver.com'에서 'naver.com'이 도메인 이름이다. 참고로 이때 'www'는 서브 도메인이다.


## 1. 설정값


## 99. 참고

DNS 서버를 접속할 때 기본적으로 [[UDP]] 프로토콜을 사용한다.(UDP/53) 
UDP를 사용하는 이유는 통신의 신뢰성 확보를 위해 다양한 처리를 하는 TCP보다 UDP의 [[overhead]]{오버헤드}가 더 적기 때문이다. 

하지만, naver.com 과 google.com 처럼 www로 매핑된 서버가 많이 있는 경우 메시지 사이즈가 512byte를 넘을 수 있다. 이럴 때에는 TCP로 재질의하여 응답을 받게 된다.(TCP/53)
