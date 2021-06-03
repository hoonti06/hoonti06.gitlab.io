---
layout    : wiki
title     : 첫 contribute 해보기
summary   : 
date      : 2021-06-01 17:30:03 +0900
updated   : 2021-06-03 11:01:18 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 2021-05-24
예전에도 contribute를 해보고 싶어 이것 저것 찾아보다가 [beginner가 contribute하기 좋은 open source project를 모아 놓은 페이지](https://github.com/MunGell/awesome-for-beginners#java )에서 [teammates](https://github.com/TEAMMATES/teammates )와 [elasticsearch](https://github.com/elastic/elasticsearch ), [jabref](https://github.com/JabRef/jabref )에 기웃댄 적이 있었는데, 이번에 다시 기웃대보려고 한다.  

<br>
teammates issue를 둘러보던 중 [쉬워 보이는 이슈 하나](https://github.com/TEAMMATES/teammates/issues/11126 )를 발견했고, 수정에 먼저 들어갔다.

<br>
issue의 내용은 /web/instructor/logs 페이지에서 각 세션의 log 내용이 없으면 collapse를 자동으로 expand(펼치기)해서 사용자가 굳이 없는 내용을 펼침 버튼을 클릭하여 확인해보지 않도록 하자는 것이다.   

<br>
전반적인 contribute 방법이나 project 세팅 방법은 [teamates docs](https://github.com/TEAMMATES/teammates/blob/master/docs/CONTRIBUTING.md )에 잘 설명되어 있다.
사실 수정해야 할 부분이 java가 아니라 front인 Angular와 TypeScript라서 이 이슈를 하는게 맞나 싶기도 한데, 쉬워 보이기도 하고 이런 기회가 흔치 않을 것 같아 일단 해보기로 했다.  

<br>
project를 fork하여 clone하여 IDE로 열어봤다. 어디서부터 시작해야 할지 잘 몰라 우선 /web/instructor/logs 페이지의 title인 'Student Activity Logs'을 키워드로 검색을 했고, instructor-audit-logs-page.component에 해당하는 것을 확인했다.  


<br>
조금씩 조금씩 확인해보니 'isTabExpanded' 변수에 따라 각 session log의 collapse가 펼쳐지고 접혀지도록 되어 있었다. 그런데 isTabExpanded는 항상 false로 초기화되도록 되어 있어서 이를 수정해야 했고, log entity의 개수가 0이면 isExpanded를 true, 아니면 false로 설정했다. 그리고 `npm run lint`를 통해 코드 컨벤션을 확인 후 [commit](https://github.com/TEAMMATES/teammates/pull/11151/commits/fe940fb862b1bc17eae2caaccc7ecf4b0ff872fb )하였다.


## 2021-05-25
수정을 미리 마친 후, 이슈에 내가 하고 싶다고 댓글을 달았다. 해도 된다는 답변을 받고 수정 사항을 [pull request](https://github.com/TEAMMATES/teammates/pull/11151 ) 하였다.  

<br>
수정 전/후의 snapshot을 올려달라고 하여 gif로 올렸다.

## 2021-05-29
도중에 [Audit Log에 대한 E2E Test가 commit](https://github.com/TEAMMATES/teammates/pull/11095 )되더니 E2E Test가 실패한다면서 수정을 피드백 받았다.
 
## 2021-05-31
E2E Test를 위해 [teamates e2e-testing](https://github.com/TEAMMATES/teammates/blob/master/docs/e2e-testing.md )에 따라 chromedriver를 설치했다.  

<br>
하라는대로 했는데도 local에서 E2E test가 잘 안 되는 것 같아서 [github CI에서 fail이 났을 때의 log](https://github.com/TEAMMATES/teammates/runs/2693222368#step:10:243 )를 살펴봤다.


<br>
기존 test는 무조건 down(메뉴 펴기, expand)버튼을 클릭하도록 되어 있는데, 내 commit이 적용되면 log가 없으면 펼침 상태로 되어 있기 때문에 down 버튼이 없어서 테스트가 실패했던 것이다. expand button에 대한 WebElement object가 null이라서 에러가 발생한 거라 생각하여 object가 null이면 skip(lambda에서는 continue가 return)하도록 했다.([해당 수정에 대한 commit](https://github.com/TEAMMATES/teammates/pull/11151/commits/6611d6d04ab1c8281f881155582700ce47bdc257 ))  

<br>
[위 commit](https://github.com/TEAMMATES/teammates/pull/11151/commits/6611d6d04ab1c8281f881155582700ce47bdc257 )을 teamates lint 테스트에서 실패했다. java code convention을 체크하는 것이 있는 줄 몰랐다.

<br>
`./gradlew lint`로 테스트를 하면 됐고, 해당 명령어를 실행했더니 if문에 중괄호가 생략되어 실패했다.
> [ant:checkstyle] [ERROR] /Users/hoon/workspace/teammates/src/e2e/java/teammates/e2e/pageobjects/InstructorAuditLogsPage.java:63:21: 'if' construct must use '{}'s. [NeedBraces]  

<br>
중괄호를 추가하였더니 다음과 같은 원인으로 실패했다.
> /Users/hoon/workspace/teammates/src/e2e/java/teammates/e2e/pageobjects/InstructorAuditLogsPage.java:61: Avoid declaring a variable if it is unreferenced before a possible exit point.  

<br>
위 에러는 변수 sessionName이 정의되었는데, return 문(exit point) 위에서 한 번도 참조되지 않아서 발생한 것이다.

<br>
코드 'if (){'와 같이 ')' 와 '{'에 띄어쓰기를 안 하면 다음과 같은 에러도 발생한다
> [ant:checkstyle] [ERROR] /Users/hoon/workspace/teammates/src/e2e/java/teammates/e2e/pageobjects/InstructorAuditLogsPage.java:66:55: '{' is not preceded with whitespace. [WhitespaceAround]

<br>
lint에만 문제가 있더라도 E2E Test는 성공할 줄 알았는데, E2E Test도 실패했다.  

<br>
다시 살펴보니 WebElement의 findElement method는 첫 번째 매칭되는 element를 리턴하는데, 하나도 없으면 null을 리턴하는 게 아니라 NoSuchElementException이 발생하는 것이고, 그래서 테스트 과정에서 해당 exception이 발생한 것이었다. 호출하는 method를 잘 살펴봤어야 했는데 그러지 못했다.  


<br>
처음에 try-catch 문을 통해 해당 exception을 처리할까 했는데, 찾아보니 [stackoverflow](https://stackoverflow.com/a/6521834 ) 에서 findElements() method를 호출하고 그 결과가 empty인지 확인하면 된다고 하여 반영하여 [commit](https://github.com/TEAMMATES/teammates/pull/11151/commits/d52dfee5ace0adabea7ddcf5619c21e797775a1d )했다.


<br>
또 [test에 실패](https://github.com/TEAMMATES/teammates/pull/11151/checks?check_run_id=2707735687#step:10:138 )했고, [push 전에 local에서 test해달라는 요청](https://github.com/TEAMMATES/teammates/pull/11151#issuecomment-851182959 )도 받았다..


<br>
expand button이 있으면 click하도록 하고, 없으면 click하지 않도록 수정했다.

## 2021-06-02
해당 commit을 push했는데, 이번엔 성공할 줄 알았건만, 또 [test에 실패]()했다...

<br>
E2E Test를 다시 local에서 돌려보려고 했다. [teamates e2e-testing](https://github.com/TEAMMATES/teammates/blob/master/docs/e2e-testing.md )에 나와있는 것처럼 './gradlew e2eTestTry1 --tests InstructorAuditLogsPageE2ETest' 명령어를 통해 E2E Test를 했는데 다음과 같이 에러가 발생했다.  
![]( /wiki-img/my-first-contribute/120442935-1bf3d080-c3c1-11eb-81e0-817223aa6251.png )  


<br>
'./gradlew appengineRun'을 통해 back-end를 실행시킨 후,  다시 E2E Test를 실행했더니 Chrome browser가 뜨긴 했는데, 계속 로딩중 상태가 유지된다.  
![]( /wiki-img/my-first-contribute/120443554-b94f0480-c3c1-11eb-9929-d09ddb56bc15.png )


<br>
front도 필요한 가 싶어 'npm run start'로 실행시킨 후, 다시 E2E Test를 실행시켰다. Chrome browser가 켜지고 알아서 버튼을 클릭한다던가 입력 값을 넣는다던가 하더니 도중에 다음과 같은 에러가 발생했다. 
![]( /wiki-img/my-first-contribute/120444488-a1c44b80-c3c2-11eb-9049-aebc299071f2.png )  
> org.gradle.internal.serialize.PlaceholderException: expected:<[Tue, 01 Jun], 2021> but was:<[화, 01 6월], 2021>



<br>
또 한 번 E2E Test를 실행했더니 'http://localhost:8080/web/instructor/logs?user=tm.e2e.IAuditLogs.instructor' 페이지에서 또 계속 로딩중 상태가 유지되는데, 이때 8080 대신 front의 포트인 4200을 넣으면 화면이 제대로 떠서 그 화면에서 버튼 클릭하거나 입력값 넣어서 그 다음 진행을 계속할 수 있게 된다. 하지만, 결국 위와 동일한 에러가 발생했다(무한 로딩 이슈는 자주 발생한다).

<br>
위 에러를 살펴보면, 날짜를 넣는 과정에서 영어가 아닌 한글로 들어가게 되어 Test가 실패하는 것이다. 그래서, 일단 날짜에 대해 validate하는 코드를 주석 처리하였다.


<br>
intellij를 통해 debug로 application을 실행하여 한글로된 날짜를 넣고 search 버튼을 클릭하기 전에 break point를 걸었고,  
![]( /wiki-img/my-first-contribute/120462910-574cca00-c3d6-11eb-9d60-3853424c226d.png )  


<br>
아래와 같이 영어로 된 날짜를 입력한 후, app을 재개했다.
![]( /wiki-img/my-first-contribute/120462701-2076b400-c3d6-11eb-9762-b2cedde1ad91.png )  

<br>
도중에 session 이름을 잘못 가져오고 있었다.  
![]( /wiki-img/my-first-contribute/120463069-7f3c2d80-c3d6-11eb-875f-f75aaf8efc89.png )  

<br>
내가 수정한 내용에 의해 card가 펼쳐진 상태에서 text를 가져오게 되면 text에 log 내용까지 포함되어 sessionName으로 저장됐던 것이다. 그렇게 잘못된 session 이름을 key로 하여 map에 값을 저장하게 되고, 그 이후에 정상적인 session 이름으로 map에서 데이터를 찾으려고 하니 테스트에서 계속 실패가 났던 것이다.  
![]( /wiki-img/my-first-contribute/120463120-8bc08600-c3d6-11eb-927d-fbb13508441d.png )  

<br>
그래서, card가 아닌 card-header에서 text를 가져오게 되면 session 이름만 가져올 수 있어서 card-header에서 text를 가져와 sessionName에 저장하도록 수정했다. 마지막으로 './gradlew lint'를 통해 code convention도 확인해주었다.  
![]( /wiki-img/my-first-contribute/120463232-a98deb00-c3d6-11eb-8ec9-f6c62e12b648.png )  

<br>
날짜 입력과 validate하는 코드를 주석 처리하고 테스트를 돌렸고, 성공했다. 
![]( /wiki-img/my-first-contribute/120454327-bf97ad80-c3ce-11eb-80d8-5d0ca393e246.png )

<br>
'sudo killall chromedriver'로 chromedriver 프로그램을 종료 시켜줘야 한다.

<br>
[commit하고 push까지 마쳤다.](https://github.com/TEAMMATES/teammates/pull/11151/commits/f9edcc42cd6f9ef3d40caae20449aaaf2b043a1b )


<br>
드디어 E2E Test를 비롯한 [모든 테스트에 성공](https://github.com/TEAMMATES/teammates/pull/11151/checks?check_run_id=2727987713 )했다!!
