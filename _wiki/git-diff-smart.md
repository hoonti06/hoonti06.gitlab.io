---
layout    : wiki
title     : 
summary   : 
date      : 2021-03-11 02:08:41 +0900
updated   : 2021-06-22 23:35:29 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 

git-diff smart하게 나타내기

PATH에 /usr/local/share/git-core/contrib/diff-highlight를 등록한다.
gitconfig에서 [pager] 항목에 diff = diff-highlight  | less 를 주면 된다.

<https://stackoverflow.com/a/58158446>에서 더 smart하게 나타내주는 [diffr](https://github.com/mookid/diffr) 오픈소스를 알게 되었다.
