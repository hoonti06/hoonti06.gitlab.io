---
layout    : wiki
title     : PDB(Program DataBase)
summary   : PDB의 활용
date      : 2019-08-05 09:46:05 +0900
updated   : 2021-12-05 12:59:40 +0900
tag       :
public    : true
parent    : [[debugging]]
published : true
latex     : false
---
* TOC
{:toc}

## 0. 개요

PDB : Program DataBase의 약자로, Symbol 파일로도 불린다.
각각의 실행 파일(*.exe / *.dll 등)에 대응되는 PDB 파일에는 Debugging을 위한 각종 정보가 기록되어 있습니다.
따라서, [[crash-dump]]{Crash Dump} 분석, Vtune 성능 측정, [[memory-leak]]{Gflags} 분석 등의 Debugging을 하기 위해서는 PDB가 반드시 필요하다.
	
## 1. Symbol 서버
'네트워크에 저장되어 있는 PDB 파일'의 '위치'를 저장해놓은 서버이다.
Symbol 서버를 이용하면 분석할 dump에 맞는 PDB 파일들을 자동으로 download해주기 때문에 분석하는 데 좀 더 수월하다.  
Symbol 서버가 구축되어 있지 않으면 분석에 필요한 올바른 PDB 파일을 직접 찾아 Local에 저장하여 연결 후 진행해야 한다.

### 1.1. Symbol 서버 접속 방법

```bat
net use "\\192.169.219.18\SymSrv" /user:"hoonti" "P@ssw0rd"

:: Z 드라이브로의 연결
net use Z: "\\192.169.219.18\SymSrv" /user:"hoonti" "P@ssw0rd"
```

### 1.2. Symbol 서버 구축 방법
참고 : dbg_amd64_6.12.2.msi'가 반드시 설치되어 있어야 한다.  

```bat
:: ------- Do NOT Touch (START Line) -------
setlocal

:: cmd창에 한글을 출력하기 위한 코드
@chcp 65001 1> NUL 2> NUL
:: ------- Do NOT Touch (End Line) -------

:: 'symstore.exe'를 사용하기 위해 반드시 dbg_amd64_6.12.2.msi를 설치해야 한다.

SET PROJECT_DIR=proj


:: 'PROJECT_DIR'에 맞는 Revision 번호로 변경한다.
SET REVISION=10000


:: ------- Do NOT Touch (START Line) -------
SET MY_SYM_SERVER=\\192.168.219.18\SymSrv
net use "%MY_SYM_SERVER%"

SET PDB_BASE=\\192.168.219.18\pdb

SET PDB_ZIP_FILE=%REVISION%(Release)_pdb.zip
SET PDB_FOLDER=%REVISION%(Release)_pdb

SET PDB_PATH=%PDB_BASE%\%PROJECT_DIR%\%PDB_ZIP_FILE%
SET UNZIP_PDB_PATH=%PDB_BASE%\%PROJECT_DIR%\%PDB_FOLDER%


SET DBG_TOOL_PATH=C:\Program Files\Debugging Tools for Windows (x64)
SET WINDBG_EXE=%DBG_TOOL_PATH%\windbg.exe
SET SYMSTORE_EXE=%DBG_TOOL_PATH%\symstore.exe

:: DBG Tool이 설치되어 있는지 확인
IF NOT EXIST "%DBG_TOOL_PATH%" (
echo "'dbg_amd64_6.12.2.msi'를 설치하고 다시 실행해주십시오"
pause
exit /b
)


:: 압축 해제를 한다.
Call :UnZipFile "%UNZIP_PDB_PATH%" "%PDB_PATH%"

:: Symbol 서버에 PDB 연결
"%SYMSTORE_EXE%" add /r /p /f "%UNZIP_PDB_PATH%\*.*" /s %MY_SYM_SERVER% 
/t "%PROJECT_DIR%" /v "%PROJECT_DIR%" /c "Built from %PROJECT_DIR%"


net use /d "%MY_SYM_SERVER%"

pause
exit /b

:UnZipFile <ExtractTo> <newzipfile>
set vbs="%temp%\_.vbs"
if exist %vbs% del /f /q %vbs%
>%vbs%  echo Set fso = CreateObject("Scripting.FileSystemObject")
>>%vbs% echo If NOT fso.FolderExists(%1) Then
>>%vbs% echo fso.CreateFolder(%1)
>>%vbs% echo End If
>>%vbs% echo set objShell = CreateObject("Shell.Application")
>>%vbs% echo set FilesInZip=objShell.NameSpace(%2).items
>>%vbs% echo objShell.NameSpace(%1).CopyHere(FilesInZip)
>>%vbs% echo Set fso = Nothing
>>%vbs% echo Set objShell = Nothing
cscript //nologo %vbs%
if exist %vbs% del /f /q %vbs%
:: ------- Do NOT Touch (END Line) -------
```


## 2. PDB 경로 등록 방법

Visual Studio 에는 PDB 파일 저장 서버(NAS)나 Symbol 서버의 주소를 그냥 적으면 되지만, 만일 환경 변수나 Vtune Amplifier에 등록하기 위해서는 아래의 규칙을 참고하여 적어야 한다.
- PDB 파일 저장 서버(NAS) : 경로를 직접 적는다.
- Symbol 서버 : 아래의 문법에 맞춰 적는다.  
	- srv\*[Local에서 Symbol을 저장할 Cache 폴더 경로]\*[Symbol 서버 주소]  
	- 예시
  	- srv\*D:\Symbol\*\\192.168.219.18\SymSrv
  	- srv\*D:\Symbol\*\\msdl.microsoft.com\download\symbols  
	- 참고 : 여러 Symbol 서버에 대해 하나의 'Local Cache 폴더'를 지정해도 된다.
	
	
## 3. _NT_SYMBOL_PATH 환경 변수 선언

Gflags 등을 쓰기 위해서는 _NT_SYMBOL_PATH 라는 환경 변수에 PDB 경로를 등록해야 한다.  
여러 개의 PDB 경로를 나열할 때에는 ';'으로 구분해야 한다.  
예를 들어, Windows Symbol Server와 Symbol 서버, 그리고 Local의 파일들(ex> C:\localPDB)을 등록하려면 하기와 같이 입력하면 된다.  

```bat
set _NT_SYMBOL_PATH=srv\*D:\symbol\*https://msdl.microsoft.com/download/symbols;
srv\*D:\symbol\*\\192.168.219.18\SymSrv;
D:\localPDB
```

<br>
참고 : 시스템 환경 변수 설정을 통해 환경 변수를 설정할 수도 있지만, 해당 변수가 계속 유지되기 때문에 bat파일을 통한 환경 변수 설정을 하는 것을 추천한다.

