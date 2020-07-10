---
layout    : wiki
title     : 
summary   : 
date      : 2020-07-10 10:38:27 +0900
updated   : 2020-07-10 10:52:44 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 2020-07-10

- virt-what
	- guest OS가 linux인 상황에서 현재 VM으로 OS가 돌아가고 있는지 확인하는 명령어
	- ubuntu에서는 따로 설치해야 한다.
	- centos에는 설치가 되어 있는 듯 하다
	- VM이 아니면 아무것도 출력되지 않는다.
	- Hyper-V의 경우 "hyperv" 라고 출력된다.
	- WSL1도 "hyperv" 라고 출력된다.
	- WSL2는 어떻게 나오는지 모르겠다
	- docker에서도 어떻게 나오련지 모르겠다.
 
- hyper-v
	- VM이 실행되고 있었으면 Host가 Reboot되어도 자동 재실행된다.
	- vhd를 resize 할 수 있으나, guest os에서도 disk 및 partition을 resize해주어야 한다. [관련 자료](https://sjnov11.github.io/blog/cent_os/2018/11/02/extend_disk_size_on_centos7.html)

- eclipse 단축키
	- ctrl + shift + R : 파일 이름으로 찾기
	- ctrl + shift + T : class이름으로 찾기
	- ctrl + shift + L : text 찾기 (plugin 필요)
 
- spring batch
	- 관련 DB에 동일한 parameter로 수행된 이력이 저장되어 있으면 다시 수행해도 수행되지 않는다. (DB 데이터를 지우면 가능하다.)
 
- zip 명령어
	- -j 옵션을 통해 압축 파일에 폴더가 저장되는걸 방지

## 2020-07-09

- elastic search
	- java 8 (나중에는 java 11 이상 지원할 예정이라고 함)
	- 샤드 : 스토리지를 논리적으로 나누는 단위
	- 레플리카 : 샤드를 몇 개 복사해 놓을 건지
	- cluster 가능 (master-slave)
	- group by 성능 정말 안 나옴, Sum도 성능 안 나옴(통계 관련...)
	- 삭제가 어렵고, modify도 안 된다? (정확한 내용에 대해 검색해보자)
	- ES는 분산 시스템이라고 한다.
	- mysql cluster도 있다.
		- 깨지는 경우가 있어 상용으로 쓰기에는 힘들다는 의견이 있다.
		- 우형이나 카뱅에서 mysql cluster와 proxy sql을 사용한다고 한다.
