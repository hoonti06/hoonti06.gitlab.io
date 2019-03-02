---
layout  : wiki
title   : DHCP
summary : 
date    : 2019-02-09 22:13:32 +0900
updated : 2019-03-02 14:36:23 +0900
tags    : 
toc     : true
public  : true
parent  : Network
latex   : false
---
* TOC
{:toc}

## 0. 개요

DHCP(Dynamic Host Configuration Protocol) : 동적 호스트 설정 규약
통신 장비(PC, Phone 등)의 동적 [[IP]]를 설정해준다. 유동 [[IP]]라고도 불리운다.

## 1. 동작 과정

## 1.1 임대(Lease)

Host에 IP가 없으면 DCHP 서버에 요청해야 한다.

![dhcp-lease](/wiki-img/network/dhcp-lease.png)


인터넷 공유기(Router)가 DCHP 서버의 역할도 하여 해당 공유기에 연결되는 Host에게 사설 [[IP]](Private IP)를 제공해준다.


