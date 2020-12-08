---
layout    : wiki
title     : OSX
summary   : 
date      : 2020-09-19 19:46:29 +0900
updated   : 2020-10-03 13:36:17 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## terminal
- ~/.zsh_profile에서 terminal color 변경할 수 있음

## 설치
- intellij flutter 설치
  - flutter, dart plugin을 설치했음에도 flutter doctor 에서 설치가 안되었다고 나왔을 때
    - ln -s /Users/xxx/Library/Application\ Support/JetBrains/IntelliJIdea2020.1/plugins /Users/xxx/Library/Application\ Support/IntelliJIdea2020.1.      // xxx 는 당연히 username


## shortcut
- `<command> + \`` : 동일 app의 여러 윈도우 rotate (Cycle Through Windows)
- `<command> + space` : spotlight 검색

## docker
- docker의 volume을 사용하려면 docker에 권한을 부여해줘야 한다.
  - `시스템 환경 설정 > 보안 및 개인 정보 보호 > 전체 디스크 접근 권한`에서 docker에게 해당 권한을 주면 된다.
  - 참고) https://stackoverflow.com/questions/58482352/operation-not-permitted-from-docker-container-logged-as-root

## intellij
- `<cmd> + <shift> + A` : intellij의 Find Action과 Terminal의 search가 충돌한다. intellij의 Find Action를 사용하기 위해서는 Terminal의 search 기능을 비활성화한다.
  - Apple menu > System preferences > Keyboard > Search man Page index in Terminal 언체크한다.
  - 참고) https://intellij-support.jetbrains.com/hc/en-us/articles/360005137400-Cmd-Shift-A-hotkey-opens-Terminal-with-apropos-search-instead-of-the-Find-Action-dialog
