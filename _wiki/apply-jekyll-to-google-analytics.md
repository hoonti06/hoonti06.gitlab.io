---
layout    : wiki
title     : jekyll 블로그에 google analytics 적용하기
summary   : 블로그 방문자 수 파악
date      : 2021-06-03 20:50:33 +0900
updated   : 2021-06-04 08:30:59 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

내 gitlab page의 방문자 수를 알아보기 위해 google analytics를 적용해보려고 한다.

<br>
우선, [google analytics](https://analytics.google.com/analytics/web/?authuser=0 )에 접속한다.  
![]( /wiki-img/apply-jekyll-to-google-analytics/120664895-454a5480-c4c6-11eb-96fb-286f1b02a202.png )  

<br>
계정을 생성한다.  
![]( /wiki-img/apply-jekyll-to-google-analytics/120664990-5b581500-c4c6-11eb-9a6a-96dfb8f5c903.png )


<br>
속성을 생성한다.   
![]( /wiki-img/apply-jekyll-to-google-analytics/120665013-5f843280-c4c6-11eb-8a4e-a814c376b9ac.png )  

<br>
jekyll에 적용하기 위해 데이터 스트림의 플랫폼을 웹으로 설정한다. 
![]( /wiki-img/apply-jekyll-to-google-analytics/120665453-c0136f80-c4c6-11eb-8935-a4ea13a62a34.png )

<br>
데이터 스트림 세부 정보에서 gtags.js에 해당하는 코드를 복사한다.
![]( /wiki-img/apply-jekyll-to-google-analytics/120724017-e9a3b980-c50d-11eb-84ad-ad41548e7a19.png )  

<br>
나 같은 경우 header.html에 포함하려고 보니 johngrib님께서 작성해놓으신 코드가 이미 있었다(jogngrib님께 항상 무한 감사...).
![]( /wiki-img/apply-jekyll-to-google-analytics/120724289-777fa480-c50e-11eb-8225-d0e49d1f72f8.png )

<br>
작성해놓으신 위 코드에 맞게 _config.yml에 다음과 같이 측정 ID를 넣어준다.
```yml
google_analytics:
  ua: 
```  

<br>
배포까지 마친 후, 블로그에 접속해보면 다음과 같이 방문자 수를 확인할 수 있다.  
![]( /wiki-img/apply-jekyll-to-google-analytics/120664911-49767200-c4c6-11eb-80a2-6d3d5262954c.png )
