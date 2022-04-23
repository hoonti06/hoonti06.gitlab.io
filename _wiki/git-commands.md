---
layout    : wiki
title     : git 명령어
summary   : 
date      : 2022-03-20 15:56:04 +0900
updated   : 2022-04-24 01:43:15 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

- git reset undo
  ```bash
  git reset 'HEAD@{1}'
  ```
  - <https://stackoverflow.com/a/2531803>
    
<br>
- untracked files 한 번에 제거하는 방법
  ```bash
  git clean -f
  git clean -fd # directory까지 제거
  ```
  
<br>
- unstaged files 한 번에 discard 하는 방법
  ```bash
  git checkout -- .
  ```
  
<br>
- conflict 발생 시 특정 branch 상태로 선택하는 방법
  ```bash
  git checkout --theirs path/to/file
  git checkout --ours path/to/file
  ```
  - <https://stackoverflow.com/a/21777677>
 
<br>
- git submodule로 다른 repository를 특정 directory에 link를 걸 수 있다
  - 하지만, 다른 repository의 특정 directory만을 link 걸 순 없다
