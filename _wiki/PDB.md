---
layout    : wiki
title     : PDB(Program DataBase)
summary   : PDB의 활용
date      : 2019-08-05 09:46:05 +0900
updated   : 2019-10-03 14:41:23 +0900
tag       :
public    : true
parent    : Debugging
published : true
latex     : false
---

## 0. 개요

PDB : Program DataBase의 약자로, Symbol 파일로도 불린다.
각각의 실행 파일(*.exe / *.dll 등)에 대응되는 PDB 파일에는 Debugging을 위한 각종 정보가 기록되어 있습니다.
따라서, [[Crash-Dump]]{Crash Dump} 분석, Vtune 성능 측정, [[Memory-leak]]{Gflags} 분석 등의 Debugging을 하기 위해서는 PDB가 반드시 필요하다.
	
## 1. Symbol 서버
'네트워크에 저장되어 있는 PDB 파일'의 '위치'를 저장해놓은 서버이다.
Symbol 서버를 이용하면 분석할 dump에 맞는 PDB 파일들을 자동으로 download해주기 때문에 분석하는 데 좀 더 수월하다.  
Symbol 서버가 구축되어 있지 않으면 직접 분석에 필요한 올바른 PDB 파일을 찾아 Local에 저장하여 분석을 진행해야 한다.

### 1.1 Symbol 서버 접속 방법
```dos
net use "\\192.168.219.18\SymSrv" /user:"hoonti" "0000"

net use Z: "\\192.168.219.18\SymSrv" /user:"hoonti" "0000"
```

### 1.2 Symbol 서버 구축 방법
dbg_amd64_6.12.2.msi'가 반드시 설치되어 있어야 한다.

[Register_Specific_PDB_at_VisionSymSrv_v1.bat](https://gitlab.com/hoonti06/hoonti06.gitlab.io/uploads/05b3135db23f69f2b309edb07902f59a/Register_Specific_PDB_at_VisionSymSrv_v1.bat)


## 2. PDB 경로 등록 방법

Visual Studio 에는 PDB 파일 저장 서버(NAS)나 Symbol 서버의 주소를 그냥 적으면 되지만, 만일 환경 변수나 Vtune Amplifier에 등록하기 위해서는 아래의 규칙을 참고하여 적어야 합니다.
- PDB 파일 저장 서버(NAS) : 경로를 직접 적는다.
- Symbol 서버 : 아래의 문법으로 적는다.  
   srv\*[Local에서 Symbol을 저장할 Cache 폴더 경로]\*[Symbol 서버 주소]  
   예시)
  - srv\*D:\Symbol\*\\192.168.219.18\SymSrv
  - srv\*D:\Symbol\*\\msdl.microsoft.com\download\symbols  
	※참고 : 여러 Symbol 서버에 대해 하나의 'Local Cache 폴더'를 지정해도 됩니다.
	
	
## 3. _NT_SYMBOL_PATH 환경 변수 선언

Gflags 등을 쓰기 위해서는 _NT_SYMBOL_PATH 라는 환경 변수에 PDB 경로를 등록해야 한다
여러 개의 PDB 경로를 나열할 때에는 ';'으로 구분해야 한다.
예를 들어, Windows Symbol Server와 Symbol 서버 그리고 Local의 파일들(ex> C:\localPDB)을 등록하려면 하기와 같이 입력하면 된다.
set _NT_SYMBOL_PATH=srv\*D:\symbol\*http://msdl.microsoft.com/download/symbols;srv\*D:\symbol\*\\192.168.219.18\SymSrv;D:\localPDB

※참고 : 환경 변수 주의
하기의 이미지와 같은 환경 변수 설정 창으로 환경 변수를 선언하게 되면 _NT_SYMBOL_PATH가 고정된다.  
<center><img src="https://gitlab.com/hoonti06/hoonti06.gitlab.io/uploads/e440adfb5ead274f2779ee35964a564a/image.png" alt="drawing" style="max-width: 100%; height: auto;"></center>  
<br>
반면, cmd 또는 bat파일을 통한 설정은 cmd창이 종료되거나 bat파일의 실행이 종료되면 설정한 환경 변수가 사라지게 된다.  
따라서, cmd 또는 bat파일을 통한 설정 방법을 추천한다.


