---
layout    : wiki
title     : OS
summary   : 
date      : 2019-09-29 16:55:46 +0900
updated   : 2020-04-27 09:10:21 +0900
tag       : os
public    : true
published : true
parent    : [[]]
latex     : false
---

## 1. OS
- OS는 하드웨어 바로 위에 설치되어 하드웨어와 소프트웨어 및 사용자를 연결하는 소프트웨어 
- 목적은 자원의 효율적인 관리 (OS는 `자원 관리자`)
	- H/W 자원(추상화) : CPU, memory, I/O
	- S/W 자원 : 프로세스, 파일, 메시지
- 항상 수행되고 있는 유일한 프로그램(kernel)
- OS = kernel(핵심) + 사용자 인터페이스(shell, GUI, 도구 및 서비스)
- **동기/비동기, Cache, Schduling 등 현대 컴퓨터 과학 및 개발에 필요한 기초적인 이론의 대부분을 다루고 있다.**
 
### 1.1 Kernel
- OS의 핵심 부분, 메모리에 상주하여 계속 실행된다.
- 보안, 자원 관리, 추상화 등의 역할을 수행한다.(low level의 서비스)
  
### 1.2 컴퓨터 시스템 구조

#### 1.2.1 CPU
#### 1.2.2 Memory

#### 1.2.3 Timer
한 프로세스가 CPU를 점유하는 시간이 정해진 시간을 초과하면 CPU에 interrupt를 보낸다.

#### 1.2.4 Device controller
- 해당 I/O Device를 관리하는 일종의 작은 CPU
- local buffer(일종의 Data register)를 갖는다.
- I/O는 실제 Device와 local buffer 사이에 일어난다.
- I/O가 완료되면 controller는 CPU에 interrupt를 보낸다.
 
#### 1.2.5 Local buffer
- I/O의 Data를 저장하는 임시 공간

#### 1.2.6 DMA(Direct Memory Access) controller
- CPU의 개입 없이 I/O Device와 memory 간의 데이터 전송을 담당
- I/O Device의 interrupt가 너무 많이 발생하여 CPU를 비효율적으로 사용되는 문제를 해결
 
#### 1.2.7 MMU(Memory Management Unit)
- logical memory를 physical memory로 매핑해주는 H/W Device


#### 1.2.1 Mode bit
- 0
	- 커널 모드, 모니터 모드, 시스템 모드
	- 모든 instruction 수행 가능(커널 모드에서만 수행 가능한 특권 명령이 존재)
	- interrupt나 exception 발생 시 H/W가 mode bit을 0으로 변경한다.
- 1
	- 사용자 모드
	- 사용자 process를 수행
	- 제한된 instruction만 수행 가능
	- 사용자 프로세스에 CPU를 넘기기 전에 mode bit을 1로 변경

### 1.3 Interrupt
- Interrupt(넓은 의미)
	- Interrupt(H/W 인터럽트) : H/W가 발생시킨 인터럽트
	- Trap(S/W 인터럽트)
		- exception : 프로세스가 오류를 범한 경우(e.g. devide by zero)
		- system call : 프로세스가 커널 함수를 호출하는 경우
- 인터럽트 벡터 (인터럽트 벡터 테이블)
	- 해당 인터럽트의 처리 루틴 주소를 가지고 있다.
	- 0 ~ 31 : exception(non-maskable interrupt)
	- 32 ~ 255 : maskable interrupt (cf> 128 : system call)
- 인터럽트 처리 루틴(인터럽트 서비스 루틴, 인터럽트 핸들러)
	- 해당 인터럽트를 실제로 처리하는 커널 함수

## 2. process
### 2.1 process
프로그램 수행에 필요한 자원을 할당받고 그 자원을 하나의 개체에서 관리하는 시스템의 작업 단위

#### 2.1.1 Process 상태(state)
- Running
  - CPU를 잡고 instruction을 수행중인 상태

- Ready
  - CPU를 기다리는 상태(메모리 등 다른 조건을 모두 만족)
  - 스케쥴링의 대상

- Blocked(wait, sleep)
  - CPU가 주어져도 당장 instruction을 수행할 수 없는 상태
  - Process 자신이 요청한 event(I/O 등)가 즉시 만족되지 않아 이를 기다리는 상태
  - 디스크에서 file을 읽어와야 하는 경우

- New : 프로세스가 생성중인 상태
- Terminated : 수행(Execution)이 끝난 상태

- Suspended(stopped)
  - 외부적인 이유로 프로세스의 수행이 정지된 상태
  - 프로세스는 통째로 디스크에 Swap out된다.
  - e.g. 
    - 사용자가 프로그램을 일시 정지시킨 경우(break key)
    - 시스템이 프로세스를 잠시 중단시킴(메모리에 너무 많은 프로세스가 올라와 있을 때)       

- block vs suspended
  - block은 자신이 요청한 이벤트가 만족되면 ready
  - suspended는 외부에서 resume 해주어야 active된다.

#### 2.1.1 Process Context
- CPU 수행 상태를 나타내는 H/W 문맥
	- 각종 register(PC 등)
- 프로세스 주소 공간
	- code, data, stack
- 프로세스 관련 커널 자료구조
	- PCB
	- kernel stack(system call)
 
##### 2.1.1.1 PCB(Process Control Block)
- OS가 각 프로세스 관리를 위해 프로세스당 유지하는 정보
- 구성 요소(구조체로 유지)
	- OS 관리상 사용하는 정보
		- process state, PID
		- 스케줄링 priority 
	- CPU 수행 관련 H/W 값
		- register(PC 등)
	- 메모리 관련 정보
		- code, data, stack의 위치 정보
	- 파일 관련 정보
		- file descriptor table(-> file table -> inode table)

#### 2.1.1.2 Context switching
- CPU를 한 프로세스에서 다른 프로세스로 넘겨주는 과정
- CPU가 다른 프로세스로 넘어갈 때의 과정
	1. CPU를 내어주는 프로세스의 상태를 그 프로세스의 PCB에 저장
	2. CPU를 얻는 프로세스의 상태를 PCB에서 읽어온다.
- 프로세스 A에서 system call이나 interrupt가 발생했을 때 다시 프로세스 A로 복귀할 경우보다 프로세스 B가 수행될 경우의 overhead가 더 큼(e.g. cache memory flush)
	 

### 2.2 thread
프로세스가 할당 받은 자원을 이용하는 실행의 단위


참고)
linux는 기본적으로 thread를 지원하지 않는다. 그러나 thread와 유사한 형태의 프로세스를 생성하여 사용할 수 있다.

### 2.3 process vs thread
+------------------------------------------------------+-----------------------------------------------------------------------------------------------+
| process                                              | thread                                                                                        |
+======================================================+===============================================================================================+
| OS로부터 `자원을 할당받는` 시스템의 작업 단위        | 프로세스가 할당 받은 `자원을 이용`하는 `실행의 단위`                                          |
+------------------------------------------------------+-----------------------------------------------------------------------------------------------+
| - 프로그램에 대한 Instance                           | - 프로세스 내에서 실제로 작업을 수행                                                          |
| - 프로그램 수행에 필요한 자원을 하나의 개체에서 관리 | - 하나의 프로세스 안에서 각각의 레지스터, 스택 공간을 제외한                                  |
| - 모든 프로세스에는 하나 이상의 thread 존재          | 나머지 공간(heap, data, bss, code)과 자원을 다른 쓰레드와 공유                                |
| - 자신만의 고유 공간과 자원을 할당 받는다.           | - 스택과 레지스터만 switching하므로 context switching 속도가 상대적으로 빠름(overhead가 적다) |
| (메모리 공간과 자원 소모가 상대적으로 큼)            | - 자원 공유로 인한 동기화 문제 발생                                                           |
|                                                      | - 디버깅이 어려움                                                                             |
|                                                      |                                                                                               |
+------------------------------------------------------+-----------------------------------------------------------------------------------------------+

### 2.2.2 kernel thread vs user thread
- kernel thread : kernel에서 직접 관리
- user thread(library) : 라이브러리를 통해 thread가 관리되고, 여러 개의 thread가 있어도 OS 입장에서는 하나의 프로세스로 인식한다.

## 2. CPU scheduling
### 2.0 Dispatcher
### 2.0 Scheduling Algorithm
- FCFS
- SJF
- RR(Round Robin) - time quantum(time slice)

## 3. 동기화(Synchronization)


### 3.1 Mutex vs Semaphore
+-------+-----------+
| Mutex | Semaphore |
+=======+===========+
|       |           |
+-------+-----------+
| -     | -         |
| -     | -         |
| -     | -         |
+-------+-----------+


## 4. 데드락(Deadlock)
- 

## 5. 메모리 관리
### 5.1. Address Binding
- symbolic address(함수 이름, 변수 이름) -> logical address -[이 시점이 언제인지]-> pyhsical address
- 분류
	- Compile time
		- logical address와 physical address가 완전 동일
		- 안 쓴다
	- Load time
		- 수행 시작 전에 비어 있는 physical address에 올림
	- Execution time
		- logical address와 다른 physical address에 올림
		- 수행 도중 변경 가능(H/W 지원이 필요 - MMU)

### 5.2. Virtual Memory
- 적은 양의 physical memory를 
- logical memory와 physical memory를

## 7. IPC(InterProcess-Communication)

## 7. FS(File System)
- Boot block
	- boot에 필요한 파일 및 코드 등
- superblock
	- Inode table 사이즈
- Inode table
	- 
- inode
	- 파일의 meta 데이터
	- file마다 하나씩 생성된다.
		- inode 생성, directory에 등록
		- file 삭제 시
			- data block 반납, inode 삭제, directory에서 해제
	- permission, file type, link count(몇 개가 접근중인 지), file size, file addresses
- data blocks
	- 자료 보관
