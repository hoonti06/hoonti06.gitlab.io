---
layout    : wiki
title     : simple-jekyll-search 적용
summary   : 
date      : 2021-03-10 00:28:13 +0900
updated   : 2021-03-19 13:41:41 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 적용
기존에 사용하던 lunr.js 기반의 검색 기능이 제대로 동작하지 않았다.  
search.html에 모든 wiki의 contents list를 가지고 있는 상태에서 search.js가 lunr.js를 사용하여 검색을 하는 방식이었다.  
contents 문자열에 일부의 쌍따옴표가 escape 문자 없이 나타나 계속 오류를 범하고 있었던 것이다.  
그래서 처음에는 쌍따옴표 앞에 escape 문자가 붙도록 시도를 해보기도 하고, 왜 전체가 아닌 일부만 그런지 조사해보기도 했다. 그러다가 기존 검색 방식을 버리고 [simple-jekyll-search](https://github.com/christian-fei/Simple-Jekyll-Search)를 적용하기로 결정했다.  
[해당 오픈 소스를 적용한 다른 분의 blog](https://jamesu.dev/posts/2021/01/03/adding-search-page-on-jekyll)에 설명이 잘 되어 있기도 했고, github의 star 수도 작성 기준 1.1k라는 큰 수였기 때문에 믿음이 갔다.  

simple-jekyll-search는 search.json에 contents 문자열들을 저장하고, 해당 파일에서 검색하도록 되어 있다. 그리고 simple-jekyll-serach의 js 객체를 선언하기 위해서는 3가지를 필수로 설정해야 한다.
- searchInput : 검색어를 입력하는 input tag
- resultsContainer : 결과를 나타낼 tag
- json : 검색 대상이 되는 json 파일

설정한 input tag의 검색어가 변화되면 그 변화를 감지하고 바로 검색 결과가 변경된다.
내 블로그는 search.html이 아닌 다른 위치에서 검색어를 입력하여 넘어오면 url에 query string의 query라는 이름으로 검색어가 들어가 있다. search.html가 렌더링 되면 input tag의 검색어를 넣어주고, 해당 검색어에 대한 검색 결과가 나와 있어야 한다.  
이때 sjs의 search() 함수에 매개변수로 검색어를 주어 호출하면 검색 결과가 resultContainer에 나온다. 근데, window.onload 시에 search()를 호출하게 해놨는데, onload가 완료되었음에도 sjs가 내부적으로 설정 과정에 있는지 검색 결과가 하나도 안 나오는 경우가 있다. 그래서 setTimeout을 통해 search 호출 시간을 지연시켜 검색 결과가 나오도록 했다.

그리고, search.html 안에 작성한 js 코드를 js파일로 빼보려고 했는데, 잘 안 돼서 그대로 뒀다.

검색어 입력 받는 input tag는 search-box라는 id로 _include/searchbox.html에 있다.

## 참고
- <https://github.com/christian-fei/Simple-Jekyll-Search>
- <https://jamesu.dev/posts/2021/01/03/adding-search-page-on-jekyll>
