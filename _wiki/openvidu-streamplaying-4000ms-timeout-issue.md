---
layout    : wiki
title     : openvidu streamPlaying timeout 이슈
summary   : 
date      : 2021-08-14 01:08:40 +0900
updated   : 2021-08-14 23:03:56 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

openvidu로 연결을 하는데 다음과 같이 `streamPlaying`에서 timeout이 났다는 warning이 발생했다.  

![]( /wiki-img/openvidu-streamplaying-4000ms-timeout-issue/129388897-8b5ebb7c-ce4d-4c2c-91c6-68c4a11a9be3.png )


더불어 IceConnection도 timeout으로 disconnected된다는 warning을 받았다.  

![]( /wiki-img/openvidu-streamplaying-4000ms-timeout-issue/129388905-2ecf2ba8-1a71-446b-81be-b78f3b95ce5f.png )


openvidu 서버에서 해결을 할 수 있을까 라는 생각을 하면서 찾아보게 되었다.

<br>
<https://docs.openvidu.io/en/2.19.0/api/openvidu-browser/enums/exceptioneventname.html>에서 exception이 명시되어 있고, timeout property를 변경할 수 있다고 적혀있다.

<https://docs.openvidu.io/en/2.19.0/api/openvidu-browser/interfaces/openviduadvancedconfiguration.html#nostreamplayingeventexceptiontimeout>에서 property에 대해 확인할 수 있었다.


<https://github.com/OpenVidu/openvidu/blob/master/openvidu-browser/src/OpenViduInternal/Interfaces/Public/OpenViduAdvancedConfiguration.ts>에서 property가 정의되어 있는 모습도 확인할 수 있다.

코드 작성 방법은 <https://github.com/OpenVidu/openvidu-screen-sharing-chrome-extension#how-to-test-your-extension> 예시를 통해 알게 되었다.


front에서 Openvidu 객체를 생성할 떄 다음 코드와 같이 작성하여 property인 timeout값을 변경할 수 있다(default 값은 둘다 4000이다).

```js
OV = new OpenVidu();
OV.setAdvancedConfiguration({
	noStreamPlayingEventExceptionTimeout: 7000,
	iceConnectionDisconnectedExceptionTimeout: 7000,
});
```

