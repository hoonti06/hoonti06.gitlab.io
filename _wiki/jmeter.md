---
layout    : wiki
title     : jmeter
summary   : 
date      : 2021-07-01 17:12:55 +0900
updated   : 2021-07-04 16:35:04 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

<https://jmeter.apache.org/download_jmeter.cgi>에서 binaries zip 파일을 다운로드 받는다.


zip을 압축 해제하여 나온 directory 하위로 이동한다  

plugin manager를 <https://jmeter-plugins.org/install/Install/>에서 다운 받아 jar 파일을 jmeter directory 하위의 lib/ext에 위치시킨다.

jmeter를 영문으로 실행하기 위해 bin/jmeter.sh에 다음 코드를 추가한다
```sh
JVM_ARGS="$JVM_ARGS -Duser.language=en -Duser.region=EN"
```

`./jmeter.sh`를 통해 jmeter를 실행한다


jmeter가 실행되면 우측의 plugin manager 아이콘을 클릭하여 plugin manager를 실행한다.

available plugins tab에서 '3-basic-graph'와 'jpgc-Standard Set'을 선택 및 설치한다(jmeter가 자동 재실행된다)

file > templates에서 recording 선택 후 create를 클릭한다

thread group이 기본적으로 존재하는데 부하 설계를 편하게 할 수 있는 ultimate thread group으로 대체한다
![]( /wiki-img/jmeter/124348058-c9f1d500-dc22-11eb-94bd-571fc4a26c93.png )



thread group에 있는 recording controller를 추가한 ultimate thread group으로 옮긴 후, thread group을 삭제한다  
![]( /wiki-img/jmeter/124348098-fa397380-dc22-11eb-9ba1-82cf2bd77b6e.png )


ultimate group을 우클릭하여 listener를 추가한다
- active threads over time
- response times over time
- transactions per second

![]( /wiki-img/jmeter/124348113-13dabb00-dc23-11eb-9fee-1444b973125d.png )

http(s) test script recorder를 클릭한 후, global settings에서 port가 8888인지 확인하고, https domains에 google.com을 입력한다.
start를 클릭한다

alert 창이 하나 뜨는데, https를 위한 테스트용 임시 인증서가 자동 생성되었다는 의미이다.

이후, transactions control window가 뜨는데, recording log 접두어인 Transaction name에 'google'을 입력하고, 해당 창을 무시한다(꺼지지도 않는다)

테스트용 임시 인증서 'ApacheJMeterTemporaryRootCA.crt'가 bin에 있어서 해당 파일을 실행시키면 키체인에 등록하겠냐고 뜬다.

시스템에 등록한다.

'키체인 > 시스템' 에 가서 임시 인증서를 다시 더블클릭한 후, 신뢰에서 이 인증서 사용 시 '항상 신뢰'로 변경한다
(참고 : <https://support.securly.com/hc/en-us/articles/206058318-How-to-install-the-Securly-SSL-certificate-on-Mac-OSX->)

시스템 환경 설정 > 네트워크에 가서 사용중인 이더넷 또는 와이파이 선택 후 고급을 클릭한다.
프록시 tab에서 웹 프록시와 보완 웹 프록시 선택하고 둘 다 주소를 127.0.0.1:8080으로 작성한다
(참고 : <https://subscription.packtpub.com/book/application_development/9781783988280/1/ch01lvl1sec11/recording-a-script-via-http-s-test-script-recorder>)
![]( /wiki-img/jmeter/124111629-75c0e680-daa4-11eb-8739-1d215d64cee4.png )

이제, 브라우저에 가서 recording할 동작을 수행한다(부하 테스트 시 녹화된 해당 동작들을 수행하게 된다)

ultimate thread group을 클릭하여 threads schedule을 작성한다.
![]( /wiki-img/jmeter/124111528-5aee7200-daa4-11eb-909d-fd5073b16802.png )

상단 bar의 start 버튼을 클릭하여 부하 테스트를 실행한다.
