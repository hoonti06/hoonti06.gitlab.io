---
layout    : wiki
title     : 버전 표기법(SemVer)
summary   : 
date      : 2019-08-04 22:28:51 +0900
updated   : 2021-01-04 10:09:32 +0900
tag       : 
public    : true
published : true
parent    : [[etc]]
latex     : false
---
* TOC
{:toc}

## 0. 개요
버전 표기법 중 대표적인 방법인 SemVer(Semantic Versioning Specification)의 소개글이다.

## 1. SemVer

SemVer를 적용하고 있는 오픈 소스에는 React와 DJango가 있다.

이글을 작성중인 2019.08.04 현재의 React 버전인 v16.8.6를 예로 들면,

첫 번째 숫자인 16은 해당 Library의 매우 큰 변화를 의미한다.
Breaking point를 유발하는 새로운 버전을 의미하는 것으로 오픈 소스 Library를 사용 중인데, 첫 번째 숫자가 변경된다면 나의 코드도 변경하고 업그레이드를 해야 한다는 의미이다.

두 번째 숫자인 8은 minor한 작은 Release를 의미한다. 새로운 기능, 새로운 방식이 추가되었지만 나의 코드에 영향을 주진 않는다.

세 번째 숫자인 6은 patch, 버그 수정을 의미한다.
