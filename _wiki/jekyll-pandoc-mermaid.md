---
layout    : wiki
title     : jekyll-pandoc-mermaid
summary   :
date      : 2021-06-13 19:31:23 +0900
updated   : 2021-06-16 22:23:12 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}


## 시작
다이어그램을 넣고 싶어어 찾다보니 plantuml과 mermaid를 알게 되었고, jekyll-plantuml과 jekyll-mermaid가 있다는 것까지 알게 되었다. 추가적으로 ditta도 적용하고자 했다.

<br> 
ditta의 경우 docker image에 ditta 설치 코드를 추가하고 <https://github.com/matze/jekyll-ditaa>에 나온대로 _plugins directory에 ditaa.rb를 두었다. 잘 동작했다.

<br>
jekyll-plantuml을 사용하기 위해서는 plantuml.jar가 설치되어 있어야 해서 wiki 배포 환경이 구성된 docker image의 dockerfile에 plantuml.jar를 설치하는 코드를 추가하였다.

jekyll-mermaid의 경우 mermaid가 설치되어 있는 경로를 설정할 수 있다. mermaid는 js라서 cdn으로 web을 통한 경로를 등록할 수 있다.

<br>
하지만, jekyll-mermaid는 제대로 동작을 하지 않았다. 그래서 그 원인과 해결 방법을 찾아보게 되었다.


## 과정
jekyll-pandoc을 적용하지 않은 상태에서 jekyll-mermaid만 적용하게 되면 잘 동작하는 것을 확인하여 jekyll-pandoc과 jekyll-mermaid가 충돌한다는 걸 알게 되었다.

<br>
원인을 파악해보니 [Apostrophe(\')](https://www.compart.com/en/unicode/U+0027 )가 pandoc에 의해 [Left Single Quotation Mark(‘)](https://www.compart.com/en/unicode/U+2018 ), [Right Single Quotation Mark(’)](https://www.compart.com/en/unicode/U+2019 )로 변경되는 것이다.  
또한, [Quotation mark(\")](https://www.compart.com/en/unicode/U+0022 )도 [Left Double Quotation Mark(“)](https://www.compart.com/en/unicode/U+201C ), [Right Double Quotation Mark(”)](https://www.compart.com/en/unicode/U+201D )로 변경된다.  
dash(-)에도 여러 종류가 있어 다양하게 치환된다.

<br>
pandoc에 의해 치환된 Single Quotation Mark들을 다시 Apostrophe로 치환하고, Double Quotation Mark들을 Quotation Mark로 치환하는 코드를 작성하였다.

<br> 
이때, liquid로 하지 못하는 이유는 liquid 수행 전후로 치환해줘야 하는 character들이 각각 존재했기 때문이다.



## 마무리
나 밖에 안 쓸 것 같긴한데, 일단 gem으로 만들어 올려보기도 했다.  

<br>
[[jekyll-pandoc-smart-quotes]]
