---
layout    : wiki
title     : powershell script 
summary   : 
date      : 2020-08-05 12:57:57 +0900
updated   : 2021-01-04 10:10:01 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

- exception 이름 알아내기 
  ```powershell
  $error[0].exception.getType().fullname
  ```  
<br>

- catch 문
  ```powershell
  try {
  	...
  } catch {
  	Write-Warning $_
  }
  ```  
<br>

- eventlog 얻기
  ```powershell
  get-eventlog system -source *Hyper-V* -EntryType error, warning `
  					  -after "2020/07/20" -before "2020/08/04" | out-gridview
  ```  
<br>

- get-computerinfo 안 먹힐 때
  ```powershell
  winrm quickconfig -quiet
  ```  
<br>

- stdout null로 redirect
  ```powershell
  | Out-Null  
  ```
<br>
 
- Import module
  ```powershell
  Import-module "module1.psm1" 
  Import-module ".\common.ps1"
  . ".\common.ps1"
  ```  
<br>

  - module에 parameter 전달  
    ```powershell
    Import-module "module1.psm1" -ArgumentList $args[0], $args[1]
    Import-module "module1.psm1" -Dev:$true # switchparameter(있으면 true, 없으면 false인 parameter)
    ```  
<br>

- approved verbs (승인된 동사)
  - 함수명 작성 시 prefix로 승인된 동사가 정해져 있다.
  - https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7
  - powershell에 get-verbs를 입력하면 나온다.  
<br>
 
- 사전 hwinfo 조사
  ```powershell
  get-ciminstance -class "cim_physicalmemory" | % { $physicalMemSize += [long]$_.Capacity }
  $physicalMemSize /= 1GB
  	# OR
  $currentPhysicalMemSize = (Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property capacity -Sum).sum / 1GB
  
  Set-VMMemory $VM_NAME -StartupBytes $startupMemorySize  # 수정 필요 (동적 할당 여부, 기본 메모리 사이즈)
  Set-VmProcessor $VM_NAME -Count $startupProcessorCount # 수정 필요 (processor core 개수, )
  
  
  Get-CimInstance -Class CIM_Processor -ErrorAction Stop | Select-Object * | Select -ExpandProperty Name
  #'Intel(R) Core(TM) i7-8700K CPU @ 3.70GHz' 에서 '8700' 중 8이 세대(generation)를 의미
  #'AMD Ryzen 7 1700X' 에서 '7'은 성능, '1700' 중 1이 세대(generation)를 의미
  Get-CimInstance -Class CIM_Processor -ErrorAction Stop | Select-Object * | Select -ExpandProperty NumberOfCores
  Get-CimInstance -Class CIM_Processor -ErrorAction Stop | Select-Object * | Select -ExpandProperty NumberOfLogicalProcessors
  ```  
<br>
 
- powershell script 실행 에러(권한 문제)
  ```powershell
  powershell.exe -ExecutionPolicy Bypass -File .\example.ps1
  ```
