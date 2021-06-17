---
layout    : wiki
title     : jekyll-spaceship cpp code block 이슈(feat. ruby gem)
summary   : 
date      : 2021-06-10 22:39:28 +0900
updated   : 2021-06-14 00:21:23 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
[[trie]] 글에서 cpp로 구현된 Trie class를 code block으로 작성했는데 char배열에서 끝을 의미하는 `'\0'`가 아래 이미지와 같이 이상하게 출력되는 것이다.  
![]( /wiki-img/jekyll-spaceship-cpp-code-block-issue/121633149-3ca4e000-cabd-11eb-828e-fda78ffc809e.png )


## 과정
첫 contribute를 성공하고 난 상태여서 그런지 이것도 내가 수정해서 contribute를 해볼까 하는 맘에 repo를 fork했다.

<br>
hoonti06.gitlab.io 로컬 directory 하위에서 fork한 jekyll-spaceship을 clone했다.

<br>
`gem build jekyll-spaceship.gemspec`을 통해 jekyll-spaceship-0.9.9.gem을 생성했다(ruby gem의 경우 `gem build XXX.gemspec` 명령어를 통해 빌드할 수 있다).

<br>
설치한 gem 대신 local에서 build한 gem을 사용하기 위해서 Gemfile을 다음과 같이 수정한다.  
![]( /wiki-img/jekyll-spaceship-cpp-code-block-issue/121792979-f9ba4800-cc35-11eb-998a-739db00b434b.png )  
- 기존 jekyll_plugins group 내에 있는 jekyll-spaceship을 주석 처리한다.
- clone한 directory를 path로 설정하여 jekyll-spaceship을 등록한다. 

<br>
우선 jekyll-spacesihpe의 동작 방식에 대해 살펴보니 processors에 등록되어 있는 항목에 대한 code block들을 따로 저장해둔 상태로 'sub' method를 통해 임의의 이름인 `JEKYLL@{pageId}@{id}`으로 치환한 후 나중에 다시 되돌려 놓는다.  
근데, code block을 치환할 때 recursive하게 code block 내부에 있는 `\0`까지 치환해놓고는 해당 값은 되돌려놓지 않아 발생한 문제이다.

<br>
수정해보려고 했는데, 잘 안 돼서 [github 이슈](https://github.com/jeffreytse/jekyll-spaceship/issues/56 )를 남겼더니 금방 답을 달아주었고 수정도 해주었다.


## 마무리
다음과 같이 github master의 최신 코드로 gem을 적용할 수 있다. (참고 : <https://github.com/jeffreytse/jekyll-spaceship/issues/44#issuecomment-801727869>)
```ruby
gem 'jekyll-spaceship', git: 'https://github.com/jeffreytse/jekyll-spaceship'
```

<br>
위 방법을 통해 최신 code로 테스트해보니 잘 되었다. 하지만, 언제 릴리즈될 지는 잘 모르겠다.

