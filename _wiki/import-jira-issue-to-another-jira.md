---
layout    : wiki
title     : jira issue를 다른 jira로 import 하는법
summary   : 
date      : 2021-08-26 15:47:25 +0900
updated   : 2021-08-26 16:28:20 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

source jira의 시스템 권한이 있다면 github, bitbucket으로의 마이그레이션이 가능한 듯 하다  

<br>
하지만 source jira의 시스템 권한이 없어 이슈들을 다음과 같이 이슈 메뉴에서 `CSV (모든 필드)`를 통해 export했다(구분 기호는 ',').

![]( /wiki-img/import-jira-issue-to-another-jira/130915512-fc99d053-9f2b-44f8-a0c8-87f95c1720b9.png )

<br>
시스템 권한을 가지고 있는 target jira에서 source의 프로젝트KEY와 동일한 이름으로 새 프로젝트를 생성한다(프로젝트 이름은 달라도 상관없다).  

<br>
우측 상단에 있는 $~$ :gear: 에서 `시스템`을 클릭한다.

![]( /wiki-img/import-jira-issue-to-another-jira/130916016-0f104942-0631-4764-a93a-762c839ebc9d.png )

<br>
`외부 시스템 가져오기` 메뉴에서 `CSV`를 선택한다.

![]( /wiki-img/import-jira-issue-to-another-jira/130915949-c1411b78-6a51-4b28-9d3f-e8ccd62acde3.png )

<br>
export 결과 파일인 csv 파일을 upload하고 앞서 프로젝트KEY와 동일하게 설정한 새 프로젝트를 선택한다.	 

<br>
필드 매핑에서 매핑할 수 있는 필드는 최대한 많이 매핑하자. 특히 이슈키를 이슈키로 매핑하게 되면 기존의 이슈키와 동일하게 이슈가 생성된다.  

<br>
그리고 보고자, 담당자, 상태, 이슈 유형 등의 필드는 필드값 매핑 체크 박스에 체크를 한다.  

<br>
다음으로 넘어가게 되면 source의 필드 속성값을 target에서 다른 속성값으로 매핑할 수 있다.  

<br>
`가져오기 시작`을 클릭하면 마이그레이션이 시작된다.

