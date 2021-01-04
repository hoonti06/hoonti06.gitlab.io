---
layout    : wiki
title     : 
summary   : 
date      : 2020-09-01 16:23:22 +0900
updated   : 2021-01-04 10:10:39 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

- https://stackoverflow.com/a/21863914
  - record 하나당 하나의 request
    - RESTful한 방법이기는 하나, 제약이 따른다.
  - URL param을 통해 id를 여러 개 전달 (E.g> "/records/1;2;3)
    - 하지마라. 중개자(proxy와 같은) 입장에서는 /records/1;2;3;이라는 single record를 삭제한다는 의미로 해석한다.  
	  그래서, /records/1, /records/2, /records/3 이 아닌 /records/1;2;3;의 캐시를 무효화한다. 요청한 데이터가 영구적으로 삭제되었음을 의미하는 상태 코드인 410를 /records/1;2;3;에 대해 프록시가 내려줄 수 있지만, 각각에 대해서는 그러지 못한다.
  - non-REST 방식으로, 삭제할 item의 id들을 포함하는 JSON을 전달
    - best 방법, RESTfull하게 할 수 있다.
    - 첫 번째 방법
    	- 'change request' resource를 생성(E.g> records=[1,2,3]을 body에 담아 /delete-requets로 POST 요청)하는 메서드를 만들고, 해당 request가 accepted 됐는지, reject(거부) 됐는지, in progress(진행중) 인지, competed(완료) 됐는지 polling을 통해 확인한다.
  	- 오래 걸리는 operation에 유용하다.
    - 두 번째 방법
    	- body에 삭제할 리소스 리스트와 수행할 액션을 포함(format은 자유롭게)하여 /records에 PATCH 요청
  	- 짧게 걸리는 operation에 유용


- https://stackoverflow.com/a/50979689
  - Mozilla Storage Service SyncStorage API v1.5
    - BSO는 basic storage object로, 해당 서비스의 storage 단위로 보임
    - collections 전부를 삭제할 경우
    ```http
    DELETE https://<endpoint-url>/storage/<collection>
    ``` 
   
    - single item 삭제할 경우
    ```http
    DELETE https://<endpoint-url>/storage/<collection>/<id>
    ``` 
  
    - multiple items 삭제할 경우
    ```http
    DELETE https://<endpoint-url>/storage/<collection>?ids=<ids>
    ``` 
    - Question
    	- /collection/ids=1,2,3으로 요청했는데, 3이 이미 존재하지 않는 경우 상태 코드를 어떻게 내려줘야 할까?

- https://www.cikorea.net/bbs/view/etc_qna?idx=20840&lists_style=
  - RESTful을 잠시 잊고 그냥 새로운 라우트를 정의
  ```
  HTTP PATCH /board/drop?id=1,2,3,4,5,10
  ```
