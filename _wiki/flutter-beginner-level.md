---
layout    : wiki
title     : (강의 내용 정리) Flutter 입문
summary   : 
date      : 2020-09-12 22:03:07 +0900
updated   : 2020-09-13 00:38:38 +0900
tag       : 
public    : true
published : true
parent    : [[online-lecture]]
latex     : false
---

### Scaffold, AppBar

- MaterialApp의 home에 Scaffold로 감싼다.
- 모든 것이 widget이다.
- StatelessWidget
  - 상태가 없는 위젯
  - 화면이 변경될 일이 없는 위젯
- StatefulWidget
  - 상태가 존재하여 
  - StatefulWidget
  - setState()를 호출하여 state 즉, 변수를 변경하면 해당 변수를 사용하는 UI를 다시 그린다.
- dart에서는 작은 따옴표를 기본으로 사용한다.
- material design
  - Appbar, floating button 등이 구성되어 있는 디자인ㅏ
  - 안드로이드에서 사용하는 디자인
- 쿠퍼티노 디자인
  - iOS에서 사용하는 디자인
  - Cupertino로 시작하는 widget 클래스들이 있다.
- dart
  - 파일 이름은 lowercase와 underscore로 구성한다. (https://dart.dev/guides/language/effective-dart/style)
- 네이게이터
  - 화면 전환할 수 있다.
  - push
  - pop
