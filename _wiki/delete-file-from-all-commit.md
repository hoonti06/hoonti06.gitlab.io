---
layout    : wiki
title     : 모든 commit에서 파일을 삭제하는 방법
summary   : filter-branch
date      : 2021-06-11 12:00:31 +0900
updated   : 2021-06-14 08:35:30 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
기존에 알고리즘 문제 풀이 코드를 gitlab repository에 private으로 push하고 있었다. private인 이유는 회사 채용 코딩 테스트에 대한 코드도 있었고, 굳이 public으로 할 이유가 없어서였기 때문이다. 그리고 gitlab을 이용했던 이유는 그 당시 github에 private 개수 제한이 있었기 때문이다.

<br>
이제 내 github를 꾸미면서 알고리즘 문제 풀이 코드를 github에 public으로 올리려고 했는데, 이전에 commit해둔 채용 코딩 테스트 관련 코드들이 문제였다. 이 코드들을 지우고 싶었다.


## 과정
`filter-branch`은 필터를 제공해서 필터에 적용된 파일만 가지고 git revision 히스토리를 다시 구축하는 기능이고, 이 기능을 통해 모든 커밋에서 파일을 삭제할 수 있다.

<br>
다음 명령어를 통해 특정 파일을 local repository의 모든 commit에서 삭제한다.
```sh
$ git filter-branch --force --index-filter \
  'git rm -r --cached --ignore-unmatch path/to/filename' \
  --prune-empty --tag-name-filter cat -- --all
```

<br>
다음 명령어를 통해 remote repository에 반영한다.
```sh
$ git add *
$ git commit -m "delete before files"
$ git push origin master --force
```


## 마무리
코딩 테스트 풀이 코드들을 commit에서 지울 수 있었고, github에 올리는 것도 완료했다.  
    
<br>
filter-branch는 하나의 repository를 여러 repository로 분리할 때 사용할 수 있어 하나의 project를 MSA로 가게 되는 경우 활용할 수 있다.


## 참고
- <http://melonicedlatte.com/programming/2019/04/20/031700.html>
- <https://blog.outsider.ne.kr/1249>
- <https://www.dsaint31.me/etc/etc-git-filter-branch/>
- <https://stackoverflow.com/a/52401636>
