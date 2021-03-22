---
layout    : wiki
title     : TCP/IP
summary   : 
date      : 2019-09-29 19:22:36 +0900
updated   : 2021-01-04 09:52:06 +0900
tag       : 
public    : true
published : true
parent    : [[network]]
latex     : false
---
* TOC
{:toc}

## 1. 정의
인터넷에 연결된 디바이스간의 데이터 통신 표준 프로토콜

## 2. 특징
- 개방형 구조
	- 누구라도 개방되어 있는 인터페이스를 구현하여 통신할 수 있다.
	- 특정 H/W나 OS, 접속 매체에 영향을 받지 않고(독립적) 근거리와 원거리 모두 데이터를 전송 가능
- [[OSI-7layers]]{OSI 7 layer}에서 유래
- IP
	- 인터넷 주소 체계에 따른 목적지로 전송 가능하도록 송신하는 기능의 프로토콜

+----------------------+----------------------------------------------------------------------+
| Layer                | Description                                                          |
+======================+======================================================================+
| Application          | - TCP/UDP 기반의 응용 애플리케이션                                   |
|                      | - HTTP, HTTPS, FTP, SSH, DNS                                         |
+----------------------+----------------------------------------------------------------------+
| Transport            | - 양 끝단 프로세스간의 연결을 제어하고, 신뢰성 있는 데이터 전송 담당 |
|                      | - 프로세스(Port) 식별                                                |
|                      | - TCP, UDP                                                           |
+----------------------+----------------------------------------------------------------------+
| Internet             | - IP 패킷을 최적 경로(라우팅)로 전송하는 기능                        |
|                      | - host 식별                                                          |
|                      | - IP, ARP, RARP                                                      |
+----------------------+----------------------------------------------------------------------+
| Network Access Layer | - 물리 주소 MAC을 이용하여 통신                                      |
|                      | - Ethernet, ATM, WIFI                                                |
+----------------------+----------------------------------------------------------------------+

+-------------------------------------------------+-------------------------------------+
| TCP                                             | UDP                                 |
+=================================================+=====================================+
| - 연결 지향성                                   | - 비 연결 지향성                    |
| - 연결(3-way handshake)과 해제(4-way handshake) | - 연결 없음                         |
| - 높은 신뢰성(Sequence number, ACK number)      | - 비신뢰성                          |
| - 전송 순서 보장                                | - 전송 순서 보장 X                  |
| - 데이터의 경계 구분 없음(Byte Stream)          | - 데이터의 경계 구분 있음(Datagram) |
| - 1:1 통신                                      | - 1:1, 1:N                          |
| - 속도 느림                                     | - 속도 빠름                         |
| - 패킷 관리할 필요 없음                         | - 패킷 관리를 직접 해야 함          |
| - 제어 기능(Flow control, Congestion control)   | - 제어 기능 X                       |
| - 대부분의 웹 애플리케이션                      | - 실시간 방송, DNS                  |
+-------------------------------------------------+-------------------------------------+

- 참고)
	- TCP에서는 스트림 데이터를 자르고 순서를 붙인 후 Internet Layer로 보내고, UDP에서는 데이터그램을 Internet Layer로 보낸다.
	- '데이터의 경계 구분이 없다'의 의미
		- 5bytes로 한 번, 10bytes로 한 번 write를 하여 데이터 전송한다고 했을 때
			- TCP : 버퍼에 저장하고 상황에 따라 한 패킷에 보낼 데이터의 크기를 결정하여 보낸다.(바이트 스트림)  
			  (웹 브라우저와 같이 대화형 애플리케이션이 서버에 메시지를 보낼 때 버퍼를 모두 채워 보내면 응답 시간이 쓸데없이 더 걸리기 때문에 '버퍼에 모으지 않고 바로 송신' 옵션을 사용하는 일이 많을 것) 
			- UDP : 5bytes 한 번, 10bytes 한 번으로 두 번 보낸다.(데이터그램)
		- 조각나지 않는 데이터 스트림(언제든 어떤 크기로든 보낼 수 있다)
	- UDP는 보내는 쪽에서 일방적으로 데이터를 전달하기 때문에 받는 쪽이 데이터를 받았는지 받지 않았는지 확인할 수 없다. 하지만 어떤 데이터를 보내면 보통은 그 회답이 돌아오기 때문에 그 회답을 수신 확인 응답 으로 대신하면 된다.(e.g> DNS 질의에 대한 회답으로 IP 주소를 보내줌)

	- TCP 제어 기능 
		- Flow control(흐름 제어)
			- 수신측 버퍼(recv-Q) 오버플로우 방지
			- 송신측과 수신측의 데이터 처리 속도 차이 해결
			- Stop and Wait : 패킷에 대한 확인 응답을 받아야만 다음 패킷을 전송한다.
			- Sliding window : 수신측의 recv-Q의 여유 공간을 받아 그 값으로 조절한다.
		- Congestion control(혼잡 제어)
			- 네트워크 내 패킷 수가 과도하게 증가하는 현상 방지
			- 송신측의 데이터 전달과 네트워크 처리 속도 차이 해결
			- Slow start
				- 패킷을 하나씩 보내고 잘 도착하면 window size를 지수급으로 증가시킨다.
				- 혼잡 현상이 발생하면 다시 window size를 1로 줄인다.
			- window : 단위 시간 내에 보내는 패킷의 수
	- TCP 연결(3-way handshake)
		- SYN : 커넥션 생성 요청
		- SYN + ACK : 커넥션 요청이 받아들여졌음을 의미
		- ACK : 커넥션이 잘 맺어졌음을 알리기 위한 확인 응답(이 확인 응답의 ACK와 함께 데이터를 보낼 수 있다)
		
	- TCP 연결 해제(4-way handshake)
		- FIN : 커넥션 
		- ACK
		- FIN
		- ACK