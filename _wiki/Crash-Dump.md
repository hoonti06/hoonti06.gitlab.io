---
layout  : wiki
title   : Crash Dump
summary : 
date    : 2019-08-06 10:19:27 +0900
updated : 2019-09-28 21:24:49 +0900
tag     : 
toc     : true
public  : true
parent  : Debugging
latex   : false
---
* TOC
{:toc}

## 0. 개요
Crash Dump : 어떠한 원인으로 인하여 Crash가 발생했을 때 그 때의 오류의 원인 등의 내용을 기록하여 저장한 파일을 의미한다.

## 1. Dump 분석 방법
우선, Crash가 발생한 버전의 [[PDB]]와 Source Code가 필요하다. 그리고 해당 버전을 설치해놓는다.

### 1.1 Visual Studio
1. 먼저, command line으로 Symbol서버에 Login한다.
	```dos
	net use "\\192.169.219.18\SymSrv" /user"hoonti" "P@ssw0rd"
	```
<br>
2. Symbol 경로 설정
	1. '.dmp' 파일을 실행 후 'Set symbol paths'를 클릭한다.  
<img src="https://gitlab.com/hoonti06/hoonti06.gitlab.io/uploads/dcf0b827d3e10e608d60e54ab1224176/image.png" alt="drawing" style="max-width: 100%; height: auto;">
	2. PDB 경로를 설정한다.
		1. '네트워크에 있는 PDB의 경로'를 설정하거나 네트워크에 있는 PDB를 Local에 다운로드하여 'Local의 PDB 경로'를 설정한다.
		2. Symbol서버는 주소 그대로 등록한다.
		3. 'MS > PDB > Symbol 서버' 순서로 설정한다.
			참고 : Microsoft Symbol Server는 Dump 분석을 처음 진행할 때에만 체크하여 Cache 폴더에 저장해 놓으면 편리하다.(매번 체크하게 되면 느리다)  
<br>
3. Debugging
	1. 'Debug with Native Only'을 클릭한다.  
<img src="https://gitlab.com/hoonti06/hoonti06.gitlab.io/uploads/376179ee0c03fdf5fd033f05a05ad328/image.png" alt="drawing" style="max-width: 100%; height: auto;">
	2. 하기의 정보를 통해 분석을 진행한다.
		- output창 : Crash 원인(ex> null pointer, )
		- Call stack : 함수 및 코드의 위치 확인
		- Watch : 변수를 등록하여 값 확인(정확한 값이 아닐 확률이 높음)  
<br>

### 1.2 WinDbg.exe

[WinDbg.exe 설치](https://docs.microsoft.com/en-us/windows-hardware/
drivers/debugger/debugger-download-tools)

아래 batch 파일의 내용을 참고한다.  
[Analyze_Dump_via_LocalPDB.bat](https://gitlab.com/hoonti06/hoonti06.gitlab.io/uploads/8d9d5385779d611a500cafc1994bfd65/Analyze_Dump_via_LocalPDB.bat)


## 2. 원격 Debugging
