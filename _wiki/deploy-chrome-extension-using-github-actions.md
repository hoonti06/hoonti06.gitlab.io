---
layout    : wiki
title     : Github actions를 이용한 Chrome Extension 배포
summary   : 
date      : 2021-12-03 22:44:48 +0900
updated   : 2021-12-05 17:43:20 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
alub의 Chrome Extension을 배포해야 하는 상황에서 Github actions를 통해 해보고 싶었다.

## 과정
### Actions 선정
Chrome Extension 배포에 대한 Action들이 마켓에 여러 개 올라와 있고, 그 중 하나를 선택해야 헀다.  
- [Passiverecords/chrome-extension-upload-action](https://github.com/Passiverecords/chrome-extension-upload-action )
- [Klemensas/chrome-extension-upload-action](https://github.com/Klemensas/chrome-extension-upload-action )
- [trmcnvn/chrome-addon](https://github.com/trmcnvn/chrome-addon )
- [mnao305/chrome-extension-upload](https://github.com/mnao305/chrome-extension-upload )

위 항목 중에 **mnao305/chrome-extension-upload**만 가장 최근까지 업데이트가 되어 있어 선택하게 되었다.  

<br><br>
### 'Chrome Web Store API' 활성화(Enable)하기
[Google Cloud Platform(GCP) console](https://console.cloud.google.com/home/dashboard )에 접속한다.

<br>
'API 및 서비스 >  라이브러리' 를 선택한다.  
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144986064-cfa5e4de-6ef4-484b-9f41-ccc9df96114c.png )

<br>
'Chrome Web Store API'를 검색하여 활성화한다.  
<br><br>

### OAuth 클라이언트 ID 생성
mnao305/chrome-extension-upload의 README.md에 링크되어 있는 [How to generate Google API keys.md](https://github.com/fregante/chrome-webstore-upload/blob/main/How%20to%20generate%20Google%20API%20keys.md )를 참고하여 진행하면 된다.  

<br>
'API 및 서비스 > 사용자 인증 정보 > +사용자 인증 정보 만들기 > OAuth 클라이언트 ID'을 선택한다.  
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144986149-11dbc167-0c55-4d8e-b6a1-5194e8fb7e04.png )

<br>
애플리케이션 유형으로 'Chrome 앱'을 선택하고, 애플리케이션 ID에는 배포할 Extension의 ID를 입력한다.
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144877847-0e31d0b5-8b1c-4d91-8fd7-739c93d4ba03.png )  

<br>
다음과 같이 클라이언트 ID가 생성되었다.  
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144879950-1e58926a-5713-4f8a-9047-53d820ced27d.png )


<br><br>
### Refresh token 생성

코드를 얻기 위해 browser로 다음 url에 접속한다($CLIENT_ID에는 생성된 클라이언트 ID를 입력한다).
```url
https://accounts.google.com/o/oauth2/auth?response_type=code
&scope=https://www.googleapis.com/auth/chromewebstore
&redirect_uri=urn:ietf:wg:oauth:2.0:oob&access_type=offline&approval_prompt=force
&client_id=$CLIENT_ID
```

<br>
다음과 같이 코드를 얻을 수 있고, 해당 코드를 복사해놓는다.  
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144882162-779c66b1-7370-4424-9699-31a8b90fee65.png )  

<br>
다음 curl 명령어를 통해 API를 호출한다.
```sh
curl "https://accounts.google.com/o/oauth2/token" -d \
"client_id=$CLIENT_ID&code=$CODE&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob"
```

<br>
응답으로 Refresh token을 얻을 수 있다.
```json
{
  "access_token": "1q2w3e4r1q2w3e4r",
  "expires_in": 3599,
  "refresh_token": "1//0e1q2w3e4r-4r3e2w1q-1q2w3e4r",
  "scope": "https://www.googleapis.com/auth/chromewebstore",
  "token_type": "Bearer"
}
```

### Workflow YAML 작성

[workflow_dispatch](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#manual-events ) keyword를 통해 workflow를 수동 실행할 수 있도록 할 수 있다.
```yml
on: workflow_dispatch
```

[mnao305/chrome-extension-upload](https://github.com/mnao305/chrome-extension-upload )를 적용하여 Chrome Extension을 업로드 및 배포한다.
```yml
- name: Upload & release
  uses: mnao305/chrome-extension-upload@2.1.0
  with:
    file-path: frontend/extension/build.zip
    extension-id: 'abcdefghijklmnopqrstuvwxyzabcdef'
    client-id: ${{ secrets.GOOGLE_CLIENT_ID }}
    refresh-token: ${{ secrets.GOOGLE_REFRESH_TOKEN }}
```

## 시행착오

### OAuth 클라이언트 ID 생성과 Refresh token 생성 과정

\1. 구글 API 응답 400 에러

mnao305/chrome-extension-upload을 실행하는 과정에서 응답 코드가 400(Bad Request)으로 내려오면서 에러가 발생했다.
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144994453-ff75f953-2c06-491c-acee-bfc7f8c94788.png )

<br>
refresh token을 다시 새로 받아 적용했더니 해결되었다.


<br><br>
### Workflow YAML 작성 과정

\1. 'on' 생략  

'on' 항목을 생략하면서 '웹상에서 수동으로 실행 가능하겠지'라는 안일한 생각을 가졌다가 다음과 에러가 발생했다.  
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144987656-dd9de06d-e807-44cb-93ec-ccb7bdbf3dd5.png )

<br>
[on](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#on )은 required로 반드시 작성해주어야 하는 항목이었고, 수동 실행에 대한 keyword인 'workflow_dispatch' 따로 찾아내어 적용하였다.


<br><br>
\2. working directory 미설정

다음과 같이 npm 명령어가 제대로 실행되지 않았다는 에러가 발생했다.
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144987073-51650dd3-b21d-41a4-8be8-05df66c2b54b.png )

<br>
root directory에서 명령어가 실행되어 에러가 발생했고, [어느 블로그](https://velog.io/@bluestragglr/%EC%9B%90%ED%95%98%EB%8A%94-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC%EC%97%90%EC%84%9C-Github-Actions-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0 )에 나와있는 코드를 참고하여 working directory를 설정하여 해결할 수 있었다.


<br><br>
\3. CI env

'npm run build:prod' 실행하는데 다음과 같은 에러가 발생하였다.
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144991353-01a1a648-4b86-44f1-aa8c-53e56734fc49.png )  

<br>
[stackoverflow](https://stackoverflow.com/a/64168473 )를 보고 'CI' env를 false로 설정했더니 해결되었다.



<br><br>
## 마무리

다음과 같이 버튼 클릭을 통해 수동으로 Chrome Extension 배포를 할 수 있게 되었다.  
![]( /wiki-img/deploy-chrome-extension-using-github-actions/144947301-cd65c2ff-d5af-448e-973a-6a351f66ca9b.png )

## 참고
- <https://l-u-k-e.medium.com/continuously-deploying-a-chrome-extension-e95eeb7cca81>
- <https://github.com/mnao305/chrome-extension-upload>
- <https://github.com/fregante/chrome-webstore-upload/blob/main/How%20to%20generate%20Google%20API%20keys.md>
