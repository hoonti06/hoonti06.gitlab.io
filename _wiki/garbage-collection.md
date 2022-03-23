---
layout    : wiki
title     : Garbage Collection(GC)
summary   : 
date      : 2022-03-21 23:03:19 +0900
updated   : 2022-03-24 01:12:04 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 1. 개념
Java에서는 **개발자가** 프로그램 코드로 **메모리를 명시적으로 해제하지 않기 때문에** 가비지 컬렉터(Garbage Collector)가 더 이상 필요 없는 (쓰레기) 객체를 찾아 지우는 작업 수행

<br>
## 2. GC의 두 가지 전제 조건

- 대부분의 객체는 금방 접근 불가능 상태(unreachable)가 된다.
- 오래된 객체에서 젊은 객체로의 참조는 아주 적게 존재한다.

<br>
## 3. 영역 구분

- Young 영역
  - 자바 객체의 대부분이 생성될 때 저장되는 공간(너무 커서 이 영역에 들어갈 수 없는 객체는 더 윗 세대(?)로 들어간다)
  - 시간이 지나 우선순위가 낮아지면 `Old` 영역으로 옮겨진다. 이 영역에서 객체가 사라질 때 `Minor GC`가 발생
  - 세부 영역
    - Eden 영역
    - Survivor 영역(2개)
- Old 영역
  - Young 영역에서 저장되었던 객체 중에 오래된 객체가 이동되어 저장되는 영역
  - 이 영역에서 객체가 사라질 때 `Major GC(Full GC)`가 발생


<br>
## 4. Minor GC 방식

- 세부 과정
  - 새로 생성한 대부분의 객체는 Eden 영역에 위치
  - Eden 영역에서 GC가 한 번 발생한 후 살아남은 객체는 Survivor 영역 중 하나로 이동된다.
  - Eden 영역에서 GC가 발생하면 이미 살아남은 객체가 존재하는 Survivor 영역으로 객체가 계속 쌓인다.
  - 하나의 Survivor 영역이 가득 차게 되면 그 중에서 살아남은 객체를 다른 Survivor 영역으로 이동한다. 그리고 가득 찬 Survivor 영역은 아무 데이터도 없는 상태로 된다.
  - 이 과정을 반복하다가 계속해서 살아남아 있는 객체는 Old 영역으로 이동하게 된다.
- Survivor 영역 중 하나는 반드시 비어 있는 상태로 남아 있어야 한다.
  - 두 Survivor 영역에 모두 데이터가 존재하거나, 두 영역 모두 사용량이 0이라면 여러분의 시스템은 정상적인 상황이 아니라고 생각하면 된다.


## 5 Major GC 방식

- Serial GC
  - Young 영역에서의 GC는 위의 Minor GC 방식 사용
  - Old 영역에서의 GC는 mark-sweep-compact 방식 사용
    - mark : Old 영역에 살아 있는 객체를 식별
    - sweep : 힙(heap)의 앞 부분부터 확인하여 살아 있는 것만 남긴다
    - compaction(조각 모음) : 각 객체들이 연속되게 쌓이도록 힙의 가장 앞 부분부터 채워서 객체가 존재하는 부분과 객체가 없는 부분으로 나눈다. (Stop-the-world)

- Parallel GC
  - Parallel GC는 Serial GC와 기본적인 알고리즘은 같지만 Parallel GC와는 다르게 GC를 처리하는 쓰레드가 여러 개인 방식
  - Throughput GC라고도 불린다.

- Parallel Old GC
  - Young 영역에서의 GC는 Parallel GC의 방식과 동일
  - Old 영역에서의 GC는 Mark-Summary-Compaction 방식
    - Summary :  GC를 수행한 영역에 대해서 별도로 살아 있는 객체를 식별한다는 점에서 Mark-Sweep-Compaction 알고리즘의 Sweep 단계와 다르며, 약간 더 복잡한 단계를 거친다
        

- CMS GC
    
- G1 GC
  - 전체 heap을 체스판처럼 여러 영역(Region)으로 나누고 Region에 역할(Eden, Survivor, Old)이 동적으로 부여되는 상태  
    - 세부 과정
      - 비어 있는 영역에만 새로운 객체가 들어간다.
      - 쓰레기가 쌓여 꽉 찬 영역을 우선적으로 청소한다.
      - 꽉 찬 영역에서 라이브 객체를 다른 영역으로 옮기고, 꽉 찬 영역은 깨끗하게 비운다.
      - 이렇게 옮기는 과정이 조각 모음의 역할도 한다.
    - 일시 정지 시간을 줄이기 위해 병렬로 GC 작업을 한다. 각각의 스레드가 자신만의 영역을 잡고 작업하는 방식
      - 일시 정지 시간을 최소화하지만, 완전히 없애지는 못하기 때문에, 실시간(real-time) GC가 아니다.

### 6 버전 별 default GC 방식

- JDK 8 까지 default GC는 parallel GC
- JDK 9 이후의 default GC는 G1 GC


## 참고

- <https://d2.naver.com/helloworld/1329>
- <https://johngrib.github.io/wiki/java-g1gc>
- <https://johngrib.github.io/wiki/java-gc-tuning/>
- <https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector.htm#JSGCT-GUID-15921907-B297-43A4-8C48-DC88035BC7CF>
