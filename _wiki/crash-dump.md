---
layout    : wiki
title     : Crash Dump
summary   : 
date      : 2019-08-06 10:19:27 +0900
updated   : 2021-12-12 18:42:58 +0900
tag       : 
public    : true
published : true
parent    : [[debugging]]
latex     : false
---
* TOC
{:toc}

## 0. 개요
Crash Dump : 어떠한 원인으로 인하여 Crash가 발생했을 때 그 때의 오류의 원인 등의 내용을 기록하여 저장한 파일을 의미한다.

## 1. Dump 분석 방법
우선, Crash가 발생한 버전의 [[pdb]]{PDB}와 Source Code가 필요하다. 그리고 해당 버전의 application을 설치해놓는다.

### 1.1. Visual Studio
1. 먼저, command line으로 Symbol서버에 Login한다.
   
	```bat
	net use "\\192.169.219.18\SymSrv" /user:"hoonti" "P@ssw0rd"
	```
<br>
2. Symbol 경로 설정
	1. '.dmp' 파일을 실행 후 'Set symbol paths'를 클릭한다.  
		![]( /wiki-img/crash-dump/144729206-d66a570d-bfe3-4663-8eb4-7750cb3be7d1.png )
	3. PDB 경로를 설정한다.
		1. '네트워크에 있는 PDB의 경로'를 설정하거나 네트워크에 있는 PDB를 Local에 다운로드하여 'Local의 PDB 경로'를 설정한다.
		2. Symbol서버는 주소 그대로 등록한다.
		3. 'MS > PDB > Symbol 서버' 순서로 설정한다.
			참고 : Microsoft Symbol Server는 Dump 분석을 처음 진행할 때에만 체크하여 Cache 폴더에 저장해 놓으면 편리하다.(매번 체크하게 되면 느리다)  
<br>
3. Debugging
	1. 'Debug with Native Only'을 클릭한다.  
		![]( /wiki-img/crash-dump/144729214-61f10a14-c23b-41ac-9d56-18399be6b09f.png )
	3. 하기의 정보를 통해 분석을 진행한다.
		- output창 : Crash 원인(ex> null pointer, )
		- Call stack : 함수 및 코드의 위치 확인
		- Watch : 변수를 등록하여 값 확인(정확한 값이 아닐 확률이 높음)  
<br>

### 1.2. WinDbg.exe

[WinDbg.exe 설치 관련 MS 페이지](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/debugger-download-tools)

아래 batch script 내용을 참고한다.  
```bat
:: ------- Do NOT Touch (START Line) -------
setlocal
:: cmd창에 한글을 출력하기 위한 코드
@chcp 65001 1> NUL 2> NUL
:: ------- Do NOT Touch (End Line) -------


:: SYMBOL 데이터들을 저장할 Local 경로를 지정한다.(경로 맨 마지막의 '\'는 제거한다)
SET SYMBOL=D:\symbol

:: Local에 저장되어 있는 PDB 폴더의 경로로 변경한다.(경로 맨 마지막의 '\'는 제거한다)
SET PDB_PATH=D:\local_PDB

:: Dump가 저장되어 있는 경로로 변경한다.(경로 맨 마지막의 '\'는 제거한다)
SET DUMP_PATH=C:\Users\hoonti\Desktop\issue\crash-dump

:: Dump 분석할 branch의 source code 경로로 변경한다.(경로 맨 마지막의 '\'는 제거한다)
SET SOURCE_PATH=Z:\Develop\project


:: ------- Do NOT Touch (START Line) -------
SET DBG_TOOL_PATH=C:\Program Files\Debugging Tools for Windows (x64)
SET WINDBG_EXE=%DBG_TOOL_PATH%\windbg.exe
SET SYMSTORE_EXE=%DBG_TOOL_PATH%\symstore.exe

SET MS_SYMBOL=%SYMBOL%\websymbol
SET MY_SYMBOL=%SYMBOL%\mysymbol

mkdir %SYMBOL%
mkdir %MS_SYMBOL%
mkdir %MY_SYMBOL%

SET MS_SYMBOL=SRV*%MS_SYMBOL%*http://msdl.microsoft.com/download/symbols
SET MY_SYMBOL=SRV*%MY_SYMBOL%*%PDB_PATH%

SET DUMP_FILE=crashdump.dmp

:: ------- Do NOT Touch (END Line) --------


"%WINDBG_EXE%" -y "Cache*;%MY_SYMBOL%;%MS_SYMBOL%" -srcpath "%SOURCE_PATH%" 
-z "%DUMP_PATH%\%DUMP_FILE%" -c ".symopt+0x40;!analyze -v;kP" 
-logo "%DUMP_PATH%\dump_analysis_output.txt"

pause
```


## 2. 원격 Debugging

