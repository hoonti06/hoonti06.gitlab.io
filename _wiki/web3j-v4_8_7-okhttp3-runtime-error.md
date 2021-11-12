---
layout    : wiki
title     : web3j 4.8.7 버전 okhttp3 관련 런타임 에러
summary   : 
date      : 2021-10-03 17:14:45 +0900
updated   : 2021-11-16 22:54:05 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

[web3j github repo](https://github.com/web3j/web3j )에 나와있는 v4.8.7 버전을 implements 하고 [특정 블로그](https://sabarada.tistory.com/17 )를 참고하여 아래의 코드를 실행시켰다.

```java
Web3j web3j = Web3j.build(new HttpService("http://localhost:7545"));
Web3ClientVersion web3ClientVersion = web3j.web3ClientVersion().send();
System.out.println(web3ClientVersion.getWeb3ClientVersion());
```

<br>

okhttp3 관련 런타임 에러가 발생했다.  
![]( /wiki-img/web3j-v4_8_7-okhttp3-runtime-error/135745603-2f5044c3-4da1-4768-a6c3-a510403eb5a6.png )

<br>

위 블로그 글에서 사용했던 v4.2.0 버전을 implements를 하면 다음과 같이 Web3ClientVersion()의 내용이 잘 출력된다.

```
EthereumJS TestRPC/v2.13.2/ethereum-js
```

<br>

[web3j의 이슈](https://github.com/web3j/web3j/issues/1271#issuecomment-732106618 )를 보고 okhttp3 4.9.0 버전을 implements 했더니 web3j v4.8.7에서도 제대로 동작했다.

```gradle

implementation 'org.web3j:core:4.8.7'

// spring boot에 의해 3.14.9 버전이 자동 적용되는데, runtime 에러 발생
implementation 'com.squareup.okhttp3:okhttp' 

// 잘 동작함
implementation 'com.squareup.okhttp3:okhttp:4.9.0' 
```





