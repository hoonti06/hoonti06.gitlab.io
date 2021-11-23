---
layout    : wiki
title     : openvidu E2E 테스트
summary   : 
date      : 2021-09-02 11:37:55 +0900
updated   : 2021-09-02 16:10:30 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

openvidu-testapp docker container 이미지를 pull한다.
```sh
docker pull openvidu/testapp:nightly-latest
```

<br>
testapp docker 이미지를 실행한다.

```sh
docker run --rm -p 4200:443 openvidu/testapp:nightly-latest
```

<br>
openvidu source code를 clone하여 v2.19.0로 checkout한다.

```sh
git clone https://github.com/OpenVidu/openvidu.git
git checkout v2.19.0
```

<br>
project root 위치에 pom.xml이 있으므로 root 위치의 maven project를 IDE로 열면 된다.

<br>
OpenViduTestAppE2eTest class의 setupAll() method에서 checkFfmpegInstallation() 호출을 주석 처리한다.

```java
public class OpenViduTestAppE2eTest extends AbstractOpenViduTestAppE2eTest {

	@BeforeAll()
	protected static void setupAll() throws Exception {
//  checkFfmpegInstallation();
		loadEnvironmentVariables();
		setupBrowserDrivers();
		cleanFoldersAndSetUpOpenViduJavaClient();
		getDefaultTranscodingValues();
	}
	...
}
```

<br>
OpenViduTestAppE2eTest class의 cleanFoldersAndSetUpOpenViduJavaClient() method에서 try-catch문을 주석 처리한다.

```java
protected static void cleanFoldersAndSetUpOpenViduJavaClient() {
//	try {
//		log.info("Cleaning folder /opt/openvidu/recordings");
//		FileUtils.cleanDirectory(new File("/opt/openvidu/recordings"));
//	} catch (IOException e) {
//		log.error(e.getMessage());
//	}
	OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
}
```

<br>
AbstractOpenViduTestAppE2eTest  class의 APP_URL에서 http를 https로 변경한다.

```java
AbstractOpenViduTestAppE2eTest {
	...
	protected static String APP_URL = "https://localhost:4200/";
	...
```

<br>




