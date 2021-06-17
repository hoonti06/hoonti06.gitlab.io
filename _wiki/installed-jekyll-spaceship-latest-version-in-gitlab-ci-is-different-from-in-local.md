---
layout    : wiki
title     : Gitlab CI 배포 과정에서 jekyll-spaceship의 최신 버전이 local과 다르게 설치된 이슈
summary   : 
date      : 2021-06-13 19:28:24 +0900
updated   : 2021-06-16 17:03:27 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
평소와 같이 wiki를 작성 및 commit한 후, push를 했는데 [배포에 실패하는 이슈](https://gitlab.com/hoonti06/hoonti06.gitlab.io/-/issues/35 )가 발생하였다.  

<br>
[error log](https://gitlab.com/hoonti06/hoonti06.gitlab.io/-/jobs/1110722664 )를 확인해보니 jekyll-spaceship에서 발생하였다.

## 과정
분명 local에서는 잘 동작하였는데, CI/CD 배포 과정에서 발생한 이슈라서 원인을 파악하고자 했다.

<br>
버전을 확인해보니 배포 과정에서는 jekyll-spaceship 0.9.8 버전이 설치되었고, local에서는 0.9.7 버전을 쓰고 있었다.  
또한, bundler의 버전이 달랐다. 배포 과정에서는 bundler 2.2.14 버전이 설치되었고, local에서는 2.1.2 버전이었다.

<br>
처음에 Gitlab CI/CD server와 local의 kernel 버전 차이로 인해 bundler와 jekyll-Spaceship의 설치되는 최신 버전이 달라졌고, FAIL 발생한 줄 알았다.

<br>
그래서 local에서 정상 동작하는 버전이 설치되도록 코드를 수정하였다.
- .gitlab-ci.yml에서 2.1.2 버전의 bundler를 설치하도록 수정
- Gemfile에서 0.9.7 버전의 jekyll-spaceship gem을 설치하도록 수정

<br>
그렇게 문제를 해결했다고 생각했는데, 원인은 kernel 버전 차이가 아니었다.

<br>
원인은 바로 Gemfile.lock의 유무였다.

<br>
우선, bundler에 대해 설명하자면 ruby application의 dependency들을 관리해주는 gem이다. bundler는 Gemfile이란 파일에 dependency가 있는 gem들을 버전과 함께 명시하고, 'bundle install' 명령어로 Gemfile에 있는 gem들을 한 번에 설치하게 된다. 설치가 모두 완료되면 설치된 gem들과 dependency gem들을 버전과 함께 작성되고 Gemfile.lock의 이름으로 생성된다. 'bundle install' 명령어를 수행할 때, Gemfile.lock이 존재하면 Gemfile 대신 Gemfile.lock 파일에 명시되어 있는 gem들을 해당 버전으로 설치하게 된다.

<br>
내 jekyll 블로그 repository는 Gemfile.lock을 gitignore에 포함시켜 commit되지 않도록 한 상태이기 때문에, CI/CD 배포 과정에서는 Gemfile.lock이 없어 매번 bundle install을 할 때 Gemfile을 보고 설치하게 되어 있다.

<br>
jekyll-spaceship을 적용하기 위해 맨 처음 설치했을 때, 그때 버전이 0.9.7이었고 해당 버전이 Gemfile.lock에 명시되었다. 그 상태로 계속 블로그를 작성해오다가 0.9.8 버전이 릴리즈되었고, CI/CD에서 bundle install 할 때 Gemfile에서 특정 버전이 명시되어 있지 않은 jekyll-spaceship을 최신 버전인 0.9.8 버전이 설치되었다.

<br>
bundler의 버전이 다른 이유는 local에서는 run-docker-jekyll.sh을 수행하는데 bundle install을 따로 하지 않아 docker image에서 처음 설치되어 있는 2.1.2 버전을 계속 썼던 것이고, CI/CD를 통한 배포 과정에서는 .gitlab-ci.yml에서 'gem install bundler' 코드를 수행할 때 항상 최신 버전의 bundler가 설치되었던 것이다. 그리고, 그 당시 최신 버전은 2.1.14였던 것이다.

<br>
jekyll-spaceship 0.9.8에서 에러가 발생한 이유는 [emoji 관련 이슈](https://github.com/jeffreytse/jekyll-spaceship/issues/44 )로 인한 것으로 보이고, 위 이슈가 해결된 0.9.9 버전을 설치했더니 정상 동작하였다.



## 마무리
원인을 정확히 파악하지 못한 상태에서 정상 동작하는 버전으로만 회귀하는 단순하고 임시적인 해결 방법을 택한 것에 대해 반성하게 되었다.  

<br>
또한, 테스트가 이뤄진 안정적인 특정 버전의 gem을 설치하는 게 아니라 무조건 최신 버전으로만 설치하도록 했던 내 잘못을 통해 많은 걸 배울 수 있었다.


## 참고
- [Gemfile.lock을 관리하지 않는 걸 추천하는 이유](https://medium.com/@livnoorbrar/should-you-commit-gemfile-lock-or-not-9fbca418bddd)
