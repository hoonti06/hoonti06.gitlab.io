---
layout    : wiki
title     : checkstyle
summary   : 
date      : 2021-07-17 15:37:34 +0900
updated   : 2021-07-17 20:18:05 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

[checkstyle](https://checkstyle.sourceforge.io/ )은 정해진 방식으로 xml에 코드 스타일을 작성해놓으면 해당 파일을 통해 코드 스타일을 체크해주는 플러그인이다.  

<br>
우선 gradle.build에 다음과 같이 추가한다
```groovy
plugins {
	...
	id 'checkstyle'
}

def checkstyleVersion = "8.44"
checkstyle {
	toolVersion = checkstyleVersion
	configFile = file("config/checkstyle/google_checks.xml")
	// default 경로는 <root>/config/checkstyle/checkstyle.xml
}
```

[checkstyle의 google_check.xml](https://github.com/checkstyle/checkstyle/blob/master/src/main/resources/google_checks.xml )을 <root>/config/checkstyle 하위에 둔다  

![]( /wiki-img/checkstyle/126028740-ce33d37d-4aea-4176-9968-83758291a749.png )  


<br>
참고로 210717 15:00 GMT+9 현재, [최신 commit](https://github.com/checkstyle/checkstyle/commit/422be612a4dce54f204094449f3de75d248e2871#diff-1fbb96c1b95e79400bf472812ee8646c92e4566b73ffc5edc83ecf146008bc23 )에 추가된 'NoWhitespaceBeforeCaseDefaultColon' module에 문제가 있어 바로 [하위 commit](https://github.com/checkstyle/checkstyle/commit/2954d8723003ef229f5825510a433ab8c60f2774#diff-1fbb96c1b95e79400bf472812ee8646c92e4566b73ffc5edc83ecf146008bc23 )을 적용했다


<br>
다음 명령어로 실행할 수 있다
```sh
# checkstyleMain : production Java source files(프로덕션 코드)
./gradlew checkstyleMain
gradle checkstyleMain

# checkstyleTest : test Java source files(테스트 코드)
./gradlew checkstyleTest
gradle checkstyleTest
```

gradle에서 lint라는 하나의 task를 구성하여 프로덕션 코드와 테스트 코드를 묶어서 실행시킬 수 있다
```groovy
task lint {
	dependsOn checkstyleMain, checkstyleTest
}
```

```sh
./gradlew lint
```

## 참고
- <https://docs.gradle.org/current/userguide/checkstyle_plugin.html>
- <https://github.com/checkstyle/checkstyle/blob/master/src/main/resources/google_checks.xml>
