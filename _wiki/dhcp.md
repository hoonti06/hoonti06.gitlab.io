---
layout    : wiki
title     : DHCP
summary   : DHCP 동작 과정
date      : 2019-02-09 22:13:32 +0900
updated   : 2021-01-04 09:52:10 +0900
tag       :
public    : true
parent    : [[network]]
published : true
latex     : false
---
* TOC
{:toc}

## 0. 개요

DHCP(Dynamic Host Configuration Protocol) : 동적 호스트 설정 규약

DHCP는 유무선 IP 환경에서 단말의 IP 주소, [[Netmask]]{서브넷 마스크}, Default 게이트 웨이의 IP 주소, DNS 서버의 IP 주소, 임대 기간(Lease Time) 등의 
다양한 네트워크 정보를 DCHP 서버가 PC와 같은 이용자 단말에게 `동적으로 할당`해주는 프로토콜이다. 
이로 인하여 이용자들은 관련 정보를 직접 설정할 필요 없이 네트워크를 이용할 수 있다.

DCHP IP를

보통 Router(인터넷 공유기 등)에 해당 기능이 탑재된다. 별도 DHCP 서버를 별도로 구성하는 방법도 가능하다.

* 참고 : DHCP 프로토콜로 IP 주소를 받아올 때 [[DNS]] 서버(Local DNS 서버[^1])의 IP 주소도 함께 받는다. 

Test [^2]  
Test [^3]  


## 1. 동작 과정

IP 주소가 할당되지 않은 Client는 DHCP 서버에 요청해야 한다. DHCP 서버에 요청하여 IP 주소를 할당 받는 과정은 아래와 같다.

<!-- DHCP 과정 youtube -->
<iframe width="942" height="704" src="https://www.youtube.com/embed/V69UAnkoYHM" frameborder="0" 
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 1.1. 임대(Lease)

![dhcp-lease](/wiki-img/network/dhcp-lease.png)

1. DHCP Discover  
	Client는 MAC 주소를 기반으로 IP 주소를 받아오기 위해 로컬 네트워크에 Discover Packet을 broadcast한다.
	해당 네트워크 내의 모든 Host에게 Packet이 전달되며, DHCP 서버가 아닌 Host는 자신에게 오는 Packet이 아님을 확인하고 폐기한다.
	Discover Packet에는 IP 주소와 
	
2. DHCP Offer



인터넷 공유기(Router)가 DCHP 서버의 역할도 하여 해당 공유기에 연결되는 Host에게 사설 IP(Private IP)를 제공해준다.

#### 1.1.1. 테스트


## 출처
[https://netmanias.com/ko/?m=view&id=techdocs&no=5163](https://netmanias.com/ko/?m=view&id=techdocs&no=5163)  
[https://www.netmanias.com/ko/post/blog/5348/dhcp-ip-allocation-network-protocol/
understanding-the-basic-operations-of-dhcp](https://www.netmanias.com/ko/post/blog/5348/dhcp-ip-allocation-network-protocol/
understanding-the-basic-operations-of-dhcp)  
[https://namu.wiki/w/DHCP](https://namu.wiki/w/DHCP)  
[http://www.ciokorea.com/t/13929/%ED%86%B5%EC%8B%A0%7C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/39337](http://www.ciokorea.com/t/13929/%ED%86%B5%EC%8B%A0%7C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/39337)


## footnote
[^1]: 가장 가까운 DNS 서버
[^2]: footnote Test1
[^3]: footnote Test2
