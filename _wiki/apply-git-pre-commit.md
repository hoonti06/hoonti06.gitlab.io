---
layout    : wiki
title     : git pre-commit 적용해보기
summary   : johngrib님 github page의 save-images.sh 적용
date      : 2021-06-01 16:06:24 +0900
updated   : 2021-06-01 17:25:21 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

[johngrib님 github page](https://github.com/johngrib/johngrib.github.io )의 save-images.sh를 가져와 내 블로그에 맞게 적용해보고자 한다(항상 johngrib님께 감사하다).  

<br>
먼저, save-images.sh는 github의 issue 등에 업로드된 이미지의 URL을 통해 이미지를 다운로드 받도록 되어 있는 script이다.  commit 수행 전에 실행시켜야 하기 때문에 pre-commit에서 해당 script를 호출하도록 한다.
```sh
# pre-commit
./tool/save-images.sh
```

<br>
pre-commit은 .git/hooks/ 하위에 위치해야 해서 해당 위치에 두고 테스트를 해봤는데, 다음과 같은 메시지과 함께 pre-commit이 수행되지 않았다.  
![]( /wiki-img/apply-git-pre-commit/120281551-09f82c00-c2f4-11eb-99b2-8a3fe4549a26.png )
> 힌트: '.git/hooks/pre-commit' 후크가 실행 가능하도록 설정되지 않아서, 무시됩니다.  

<br>
.git/hooks 하위에는 기본적으로 pre-commit.sample 파일이 있는데, pre-commit을 적용시키기 위해서는 pre-commit.sample의 이름을 pre-commit으로 변경해야 한다고 한다. 나는 pre-commit.sample을 그대로 둔 채로 pre-commit 파일을 다시 생성해서 안 되는 건가 싶어 pre-commit.sample에 코드를 옯긴 후 pre-commit.sample의 이름을 변경해주었다.  
생성한 pre-commit을 그대로 두면서 pre-commit.sample을 삭제하는 방식을 택하지 않고 위와 같은 방식을 택한 이유는 pre-commit.sample의 파일 권한을 그대로 가져가기 위함이었다.

<br>
다시 commit을 시도해보니 다음과 같은 에러가 발생하였다.
![]( /wiki-img/apply-git-pre-commit/120281874-7541fe00-c2f4-11eb-89f9-581707c060c9.png )  

<br>
그래서 save-images.sh에 실행 권한을 부여하였다.
![]( /wiki-img/apply-git-pre-commit/120282839-850e1200-c2f5-11eb-8733-ea24087619be.png )  

<br>
다시 commit을 해보니 다음과 같은 에러가 발생했다.
![]( /wiki-img/apply-git-pre-commit/120284153-ec789180-c2f6-11eb-9b9a-14e946f3b63a.png )

<br>
[ag](https://github.com/ggreer/the_silver_searcher )(searching tool)가 없어서 발생한 에러라서 설치해줬다.
```sh
brew install the_silver_searcher
```  

<br>
다시 commit을 했더니 다음과 같이 성공했다.
![]( /wiki-img/apply-git-pre-commit/120289659-7d9e3700-c2fc-11eb-803c-75a061ae9993.png )
