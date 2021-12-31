---
layout    : wiki
title     : github pages에서 gitlab pages로 옮기기
summary   : 
date      : 2022-01-01 00:56:37 +0900
updated   : 2021-01-01 01:21:58 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
나는 개인 위키로 나만 보기 위한 wiki를 만들고 싶었는데 github pages는 public을 통해서만 배포가 가능했다.

<br>
다른 방법이 없나 찾아보다가 gitlab에도 pages가 있었고, private으로 설정하여 나만 볼 수 있도록 가능하다는 것을 확인하고 gitlab pages로 옮기기로 했다.

## 과정
github pages와 gitlab pages는 같은듯 달랐다. 우선,github pages는 push만 되면 최신 commit으로 자동 배포가 이뤄지는데, gitlab pages는 Gitlab CI를 통한 배포를 해야해서 .gitlab-ci.yml 파일을 작성해야 한다. 관련 내용은 [gitlab jekyll](https://gitlab.com/pages/jekyll )을 통해 확인할 수 있다.

<br>
적용 당시에는 몰랐고 나중에 안 사실로, github page는 safe 모드에서 실행되고, [whitelist에 포함된 gem plugin들](https://pages.github.com/versions/ )만 사용 가능하다는 점이다.


<br>
[gitlab jekyll의 README](https://gitlab.com/pages/jekyll/-/blob/master/README.md )에 나와 있는 것처럼 진행하면 된다.

## 마무리
github pages에서 gitlab pages로 잘 옮기게 되었다.

<br>
추가적인 내용으로, 내가 gitlab pages 적용 당시에 pages의 repository는 private 설정이 가능하나 web site는 private 설정이 불가능했다. 하지만, web site를 repository에 접근 가능한 member만 web site에도 접근 가능하도록 기능이 추가되었다. (관련 기능 : <https://docs.gitlab.com/ee/user/project/pages/pages_access_control.html>)
