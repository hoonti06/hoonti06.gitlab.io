---
layout    : wiki
title     : google java format 적용 시도 후 원상 복귀
summary   : 
date      : 2021-06-03 20:24:46 +0900
updated   : 2021-06-03 20:49:17 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

johngrib님 블로그를 어슬렁거리다 우연찮게 google java format에 대한 글을 보고, 무작정 google java code style을 적용해보기로 했다.  

<br>
intellij의 google-java-format plugin을 설치했다. 해당 plugin을 설치하면 재실행해야 하고, Enable google-java-format을 통해 project마다 적용시켜줘야 한다.

<br>
적용된 프로젝트에서 임의의 java 코드에서 option + cmd + L로 reformat code를 명령을 실행했더니 indent가 2로 적용되었다  

<br>
알고보니 google java format은 indent 사이즈가 2인게 맞았고, 나는 google이니까 라는 생각으로 제대로 확인도 안해보고 적용했던 것이다.

<br>
plugin에는 indent 사이즈를 따로 설정할 수 없었다. 대신 google java format이 작성되어 있는 xml 파일을 intellij의 code style로 import 하면 된다는 내용을 [stackoverflow](https://stackoverflow.com/a/49423052 )에서 확인할 수 있었다.

<br>
[해당 링크](https://raw.githubusercontent.com/google/styleguide/gh-pages/intellij-java-google-style.xml )의 내용을 저장한 후, java 항목의 indent 사이즈를 2에서 4로 변경한 후 intellij에 import했다.  
![]( /wiki-img/try-to-apply-google-java-format/120639978-ed532400-c4ac-11eb-81d7-1d4360632ac0.png )  

<br>
google java format은 character column limit이 100(intellij의 limit의 default 값은 120)이고, 이것 저것 알아보다가 intellij 기본 style이 더 나은 것 같다는 생각에 그냥 default 설정으로 되돌렸다.

