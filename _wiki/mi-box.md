---
layout    : wiki
title     : mi box s
summary   : 
date      : 2020-12-22 11:33:40 +0900
updated   : 2021-01-04 10:11:25 +0900
tag       : 
public    : false
published : false
parent    : 
latex     : false
---
* TOC
{:toc}

- application 
  - X-plore
    - 설정(구성)에서 자체 뷰어의 video 항목을 uncheck하고 video 재생하면 player 선택 가능하다.
  - kodi
  - MX Player

- kodi의 addon으로 wavve의 실시간 tv를 무료로 볼 수 있다.
  - playstore를 통해 설치한 wavve는 실시간 tv를 제공하지 않는다.
  - 방법
    - https://github.com/kym1088/wavveM 에서 zip 파일을 다운받는다.
	- usb에 해당 파일을 옮겨 mi box에 꽂아 연결시킨다.
	- kodi 실행하여 add-on tab에서 Install from zip file을 선택한다.
	- usb를 선택하고 다운 받은 zip 파일을 선택한다(repository를 등록한 것이다).
	- Install from repository를 선택하여 add-on을 설치한다.
 
- 특정 WIFI에다가 고정 IP로의 연결을 설정할 수 있다.
  - 설정
    - IP : 192.168.219.108 (서버를 18로 해놓아서, mi box를 108로 해놓았다)
    - gateway : 192.168.219.1 
    - 네트워크 prefix 길이 : 24
    - DNS1 : 8.8.8.8 (설정되어 있는 값 그대로 사용)
    - DNS2 : 8.8.4.4 (설정되어 있는 값 그대로 사용)
  - 고정 IP를 쓰게되면 youtube chromecast를 사용할 수 없다. 



- 'Google Home' 스마트폰 app에서 mi box를 어느 방이든 방에 등록하게 되면 미러링 기능을 사용할 수 있다.

- 'Android TV Remote Control' 스마트폰 app으로 리모컨 역할을 할 수 있다.
  - kodi는 해당 app으로 컨트롤이 안돼서 'Yatse' 스마트폰 app으로 컨트롤해야 한다.

- CEC Control
  1. CEC Switch를 '활성화'한다.
  2. One key play(mi box를 켜면 TV도 같이 켜짐)와 One key power off(mi box를 끄면 TV도 같이 꺼짐)를 '활성화'한다.
