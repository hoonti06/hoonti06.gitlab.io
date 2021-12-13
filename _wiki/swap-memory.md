---
layout    : wiki
title     : swap memory 설정
summary   : 
date      : 2021-07-09 22:08:49 +0900
updated   : 2021-12-14 04:02:19 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
Oracle Cloud의 VM 인스턴스에 jenkins docker container 설치하고 maven build를 수행했는데, 메모리가 100%까지 올라가면서 수행을 할 수 없었다.  

<br>
VM 인스턴스는 memory가 1GB 밖에 안 되기 때문에 memory가 너무 적어 제대로 build 작업을 수행할 수 없었던 듯 하다.

<br>
그래서 memory를 늘리기 위해 swap memory 설정하는 방법을 찾아보게 되었다.

<br><br>
## 과정

스왑 파티션 확인(swap 항목이 0이면 파티션이 없는 것)  
```sh
free -m
```

리눅스의 swap 메모리는 파티션이 아닌 파일로 존재할 수도 있다.

다음 명령어를 통해 스왑 파일이 지정되어 있는지 확인한다(아무 메시지 출력도 없으면 없다는 것)  
```sh
swapon -s
```

스왑 파일 생성 및 시스템 등록
```sh
fallocate -l 2GB /swapfile
```


권한 설정
```sh
chmod 600 /swapfile
```

swapfile을 swap 포맷으로 변환  
```sh
mkswap /swapfile
```


스왑 파일을 시스템에 등록
```sh
swapon /swapfile
```


재부팅 후에도 시스템에서 스왑 파일을 사용할 수 있도록 `/etc/fstab`에 다음 코드 추가
```sh
/swapfile   none    swap    sw    0   0
```

스왑 파일 등록 해제
```sh
swapoff swapfile
```

스왑 파일 삭제
```sh
rm /swapfile
```

<br><br>
## 마무리
swap memory 설정을 한 후에는 maven build가 잘 수행되었다.

## 참고
- <https://extrememanual.net/12975>
 
