---
layout    : wiki
title     : 바이너리 호환성
summary   : 
date      : 2020-07-18 01:09:02 +0900
updated   : 2020-07-18 01:33:26 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

바이너리 호환성 : 클래스의 내용을 변경해도, 사용하는 쪽에서 recompile을 할 필요가 없는 것이다.
ex> public, protected 메서드의 삭제 또는 rename을 하면 바이너리 호환성이 깨진다.

바이너리 호환성을 깨지 않고 클래스의 멤버(필드, 메서드)의 삭제 혹은 이름 변경이 가능한 이유는 외부에서 사용할 수 없기 때문에 linking이 따로 안 되나..?

remove / rename a private or package private member of this class without breaking the binary compatibility, because external apps cannot (or should not) use it

[참고 1](https://docs.oracle.com/javase/specs/jls/se7/html/jls-13.html)
[참고 2](https://stackoverflow.com/questions/14973380/what-is-binary-compatibility-in-java)
