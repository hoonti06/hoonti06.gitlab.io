---
layout    : wiki
title     : 
summary   : 
date      : 2021-07-09 22:08:49 +0900
updated   : 2021-07-10 00:27:15 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

Oracle Cloud의 VM 인스턴스에 jenkins docker container 설치하고 maven build를 수행했는데, 메모리가 100퍼까지 올라가면서 수행을 할 수 없었다. 알고보니 VM 인스턴스는 memory가 1GB이고 swap memory 설정이 안 되어 있다(AWS EC2 인스턴스도 마찬가지로 설정이 안 되어 있다)

swap memory를 설정하는 방법을 알아보자

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


재부팅 후에도 시스템에서 스왑 파일을 사용할 수 있도록 `/etc/fstab`에 다음 코드를 추가
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


## 참고
- <https://extrememanual.net/12975>
 
