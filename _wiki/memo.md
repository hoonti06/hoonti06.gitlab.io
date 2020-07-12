---
layout    : wiki
title     : 
summary   : 
date      : 2020-07-10 10:38:27 +0900
updated   : 2020-07-12 11:17:31 +0900
tag       : 
public    : true
published : true
parent    : [[]]
latex     : false
---

## 2020-07-11
- item6
	- RomanNumerals.isRomanNumeral static method를 사용하여 ROMAN이란 객체를 재사용한다.
	- 지연 초기화 (item87)
		- JPA lazy loading (Entity 정보를 query를 쓰기 전까지는 loading하지 않는다)
		- synchrosized
	- 어댑터 패턴
	- 방어적 복사 (item50)
	- boolean(String) 생성자가 뭐지 찾아보자
	- String s = "bikini"; (heap 영역의 constant pool, String만) 
		- 비용 문제로 그렇게 하는것으로 보임
- item 11
	- 익명 클래스
	- hashcode 요령
		- '31'
	- equals로 또 한 번 체크한다.

- item 12
	- 디버깅 쉽다
	- 포맷의 문서화
- item 13
- item 15
	- 하지만 getter, setter는 그대로 return 타입과 method 이름에 변수 이름이 다 드러난다.
		- getter, setter는 안티패턴
		- 외부에서 진짜 필요한 메소드만 제공을 하는게 더 낫다.
	- 정보 은닉 : 시스템 관리 비용
	- array를 
- chapter3
	- 상용구 코드를 안 써도 된다.
	- double 콜론 (java9)
	- data.sql, 
	- JPA
		- @Entity : JPA 애노테이션
		- @NoArgsConstructor private으로
		- @GeneratedValue
		- Order는 sql에서 예약어
		- CrudRepository
		- spring 데이터는 method 이름을 분석한다.
		- 너무 길면 @Query()
		

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
