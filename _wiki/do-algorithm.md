---
layout    : wiki
title     : 알고리즘 하자
summary   : 
date      : 2021-01-19 16:02:38 +0900
updated   : 2021-03-28 01:29:09 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 2021-03-27
- [[boj-13706]]{BOJ 13706. 제곱근(브론즈1)}
	- <https://www.acmicpc.net/problem/13706>
- [[boj-16922]]{BOJ 16922. 로마 숫자 만들기(실버3)}
	- <https://www.acmicpc.net/problem/16922>
- [[boj-12904]]{BOJ 14502. A와 B(골드5)}
	- <https://www.acmicpc.net/problem/12904>
 
## 2021-03-26
- [[boj-17472]]{BOJ 17472. 다리 만들기(골드2)}
	- <https://www.acmicpc.net/problem/17472>
- [[boj-14502]]{BOJ 14502. 연구소(골드5)}
	- <https://www.acmicpc.net/problem/14502>
 
## 2021-03-25
- Integer.toBinaryString(num)

## 2021-03-23
- string 찾기 함수
	- java : indexof()
	- C++ : string::find()
	- 내부적으로는 완탐으로 구현되어 있다.

## 2021-03-21
- [[boj-1786]]{BOJ 1786. 찾기(골드1)}
	- <https://www.acmicpc.net/problem/1786>
 
## 2021-03-21
- [[boj-1477]]{BOJ 1477. 휴게소 세우기(골드5)}
	- <https://www.acmicpc.net/problem/1477>

## 2021-03-18
- [[boj-1197]]{BOJ 1197. 최소 스패닝 트리(골드4)}
	- <https://www.acmicpc.net/problem/1197>
 
- [[jungol-1863]]{JUNGOL 1863. 종교}

- [[boj-2606]]{BOJ 2606. 바이러스(실버3)}
	- <https://www.acmicpc.net/problem/2606>


## 2021-03-17
- [[boj-1449]]{BOJ 1449. 수리공 항승(실버3)}
	- <https://www.acmicpc.net/problem/1449>
 

## 2021-03-16
- [[boj-1168]]{BOJ 1168. 요세푸스 문제2(플레티넘2)}
	- <https://www.acmicpc.net/problem/1168>
	- Segment Tree

- [[boj-1260]]{BOJ 1260. DFS와 BFS(실버2)}
	- <https://www.acmicpc.net/problem/1260>
 
- c++에서 배열 등을 전역으로 정의하는 이유
	- 여러 함수에 매개변수 없이 사용
	- 함수 내에서 정의하면 stack에 할당되나, 전역으로 정의하면 heap에 할당된다.
		- stack보다 heap의 크기가 더 큰듯 하다

- [[boj-17070]]{BOJ 17070. 파이프 옮기기 1(골드5)}
	- <https://www.acmicpc.net/problem/17070>
 
- [[swea-1238]]{SWEA 1238. Contact(D4)}
 
## 2021-03-15
- [[boj-17471]]{BOJ 17471. 게리맨더링(골드5)}
	- <https://www.acmicpc.net/problem/17471>
 
- [[boj-20057]]{BOJ 20057. 마법사 상어와 토네이도(골드4)}
	- <https://www.acmicpc.net/problem/20057>

## 2021-03-11
- [[swea-2105]]{SWEA 2105. 디저트 카페}
 
- java의 경우 pair가 없어 queue에 (r, c)를 넣기 위해서 class를 따로 정의해왔다.
	- class 정의 없이 int를 담는 queue를 정의하고, r과 c를 차례로 push하고, 차례로 pop해서 사용하면 된다.
	- q의 size를 2로 나눠주어야 한다!
 
- [[swea-1486]]{SWEA 1486. 장훈이의 높은 선반(D4)}
 
## 2021-03-10
- [[swea-8382]]{SWEA 8382. 방향 전환(D4)}
 
## 2021-03-08
- [[boj-20055]]{BOJ 20055. 컨베이어 벨트 위의 로봇(실버1)}
	- <https://www.acmicpc.net/problem/20055>

## 2021-03-04
- [[boj-1766]]{BOJ 1766. 문제집(골드2)}
	- <https://www.acmicpc.net/problem/1766>
 
- [[boj-2056]]{BOJ 2056. 작업(골드4)}
	- <https://www.acmicpc.net/problem/2056>

## 2021-03-03
- [[boj-2089]]{BOJ 2089. -2진수(실버4)}
	- <https://www.acmicpc.net/problem/2089>

- [[boj-2004]]{BOJ 2004. 조합 0의 개수(실버2)}
	- <https://www.acmicpc.net/problem/2004>

## 2021-03-01
- [[boj-1525]]{BOJ 1525. 퍼즐(골드2)}
	- <https://www.acmicpc.net/problem/1525>

- [[boj-2632]]{BOJ 2632. 피자판매(골드1)}
	- <https://www.acmicpc.net/problem/2632>

- [[boj-1208]]{BOJ 1208. 부분수열의 합 2(골드2)}
	- <https://www.acmicpc.net/problem/1208>
 
- [[boj-1806]]{BOJ 1806. 부분합(골드4)}
	- <https://www.acmicpc.net/problem/1806>
 
## 2021-02-28
- [[boj-2143]]{BOJ 2143. 두 배열의 합(골드3)}
	- <https://www.acmicpc.net/problem/2143>
 
## 2021-02-26
- TreeSet, TreeMap
	- key로 정렬해준다..
 
## 2021-02-25
- merge sort
	```java
	void mergeSort(int[] list, int start, int end) {
		if (start == end) return;
		
		int mid = (start + end) / 2;
		mergeSort(list, start, mid);
		mergeSort(list, mid+1, end);
		
		merge(list, start, mid, end);
	}
	
	void merge(int[] list, int start, int mid, int end) {
		int[] temp = new int[end - start + 1];
		int k = 0;
		
		int i = start, j = mid+1;
		while (i <= mid && j <= end) {
			if (list[i] < list[j])
				temp[k++] = list[i++];
			else
				temp[k++] = list[j++];
		}
		while (i <= mid) {
			temp[k++] = list[i++];
		}
		while (j <= end) {
			temp[k++] = list[j++];
		}
		
		System.arraycopy(temp, 0, list, start, temp.length);
	}
	
	public static void main(String[] args) {
		int[] list = new int[N];
		mergesort(list, 0, list.length-1);
	}
	```
	
- counting sort
	```java
	void countingSort(int[] list) {
		final int SIZE = list.length;
		int[] result = new int[SIZE];
		int max = Integer.MIN_VALUE;
		int min = Integer.MAX_VALUE;
		
		for (int i = 0; i < SIZE; i++) {
			min = Math.min(min, list[i]);
			max = Math.max(max, list[i]);
		}
		
		// 배열 원소의 최댓값 표현 가능한 크기의 카운팅 배열 생성
		int[] count = new int[max+1];
		
		// 배열 원소 카운트
		for (int i = 0; i < SIZE; i++) {
			count[list[i]]++;
		}

		// 카운팅 변형 : 누적합
		// min에 1을 더한 이유는 count[min]은 현재의 자기 자신이 누적합이기도 하기 때문
		for (int i = min+1; i <= max; i++) {
			count[i] = count[i-1] + count[i];
		}
		
		for (int i = SIZE-1; i >= 0; i--) {
			int cur = list[i];
			count[cur]--;
			result[count[cur]] = cur;
			
//		result[--count[list[i]]] = list[i]; // 한 줄로 표현
		}
		
		System.arraycopy(result, 0, list, 0, SIZE);
	}
	```
 
- System.arraycopy(src, srcPos, dest, destPos, length);
 
- [[boj-1517]]{BOJ 1517. 버블소트(골드2)}
	- <https://www.acmicpc.net/problem/1517>
 
## 2021-02-22
- INT_MAX (#include <clmits>)

## 2021-02-18
- DFS with bitmask
	```cpp
	void dfs(int cnt, int bitmask) {
		if (cnt >= N) return;
		
		for (int next = 0; next < N; next++) {
			if ((bitmask & (1 << next)) == 0)
				continue;
			
			dfs(cnt+1, bitmask | (1 << next));
		}
	}
	```
	
- 부분 집합
	- 조합 여러번
	```cpp
	for (int bitmask = 0; bitmask < (1 << N); bitmask++) {
		for (int digit = 0; digit < N; digit++) {
			if ((bitmask & (1 << digit)) > 0) {
				...
			}
		}
	}
	```

 
- [[boj-3109]]{BOJ 3109. 빵집(골드2)}
	- <https://www.acmicpc.net/problem/3109>
 
- [[boj-1182]]{BOJ 1182. 부분수열의 합(실버2)}
	- <https://www.acmicpc.net/problem/1182>
 
## 2021-02-17
- [[permutation-and-combination]]{순열과 조합}

- [[boj-1744]]{BOJ 1744. 수 묶기(골드4)}
	- <https://www.acmicpc.net/problem/1744>


## 2021-02-14
- 중복 허용 binary search에서 같은 값의 제일 낮은 인덱스 리턴?
	```cpp
	int bsearch(int input) {
		int left = 0;
		int right = N-1;
		while (left <= right) {
			int mid = (left + right)/2;

			if (arr[mid] >= input)
				right = mid - 1;
			else
				left = mid + 1;
		}
		return left;
	}
	```

## 2021-02-11
- copy
	```cpp
	memcopy(dest, src, R * C * sizeof(src[0][0])); // #include <cstring>
	memcopy(dest, src, R * C * sizeof(int)); // #include <cstring>
	copy(&src[0][0], &src[0][0] + R * C, &dest[0][0]);
	```
 
## 2021-02-10
- operator< overloading
	```cpp
	bool operator<(const Node &a) const {
		if (r == a.r)
			return c < a.c;
		else
			return r < a.r;
	}
	```


## 2021-02-09
- reverse
	```cpp
	#include <algorithm> // reverse
	#include <vector>
	#include <string> 
	using namespace std;
	
	vector<int> vec;
	reverse(vec.begin(), vec.end());
	
	string str;
	reverse(str.begin(), str.end());
	```
	
- 최대 공약수(유클리드 호제법)
	```cpp
	int gcd(int a, int b) {
		int remain = a % b;
		return remain == 0? b : gcd(b, remain);
	}
	```
## 2021-02-08
- [[boj-6549]]{BOJ 6549. 히스토그램에서 가장 큰 직사각형(플레티넘5)}
	- <https://www.acmicpc.net/problem/6549>

## 2021-02-05
- [[boj-1167]]{BOJ 1176. 트리의 지름(골드3)}
	- <https://www.acmicpc.net/problem/1167>

## 2021-02-04

## 2021-02-03
- [[boj-11054]]{BOJ 11054. 가장 긴 바이토닉 부분 수열(골드3)}
	- <https://www.acmicpc.net/problem/11054>

- [[boj-2225]]{BOJ 2225. 합분해(골드5)}
	- <https://www.acmicpc.net/problem/2225>


## 2021-02-02
- [[boj-1406]]{BOJ 1406. 에디터(실버3)}
	- <https://www.acmicpc.net/problem/1406>

- list
	```cpp
	#include <list>
	list<char> clist;
	list<char>::iterator it;
	```
	
- substr
	```cpp
	string str;
	string sub = str.substr(startIdx, length);
	```
- vector
	- vector<int>::iterator it;
	- erase(iterator)

- Priority Queue in java
	```java
	static Queue<Integer> highestPq = new PriorityQueue<Integer>(Comparator.reverseOrder());
	static Queue<Integer> lowestPq = new PriorityQueue<Integer>();
	```

- [[boj-11053]]{BOJ 11053. 가장 긴 증가하는 부분 수열(실버2)}
	- <https://www.acmicpc.net/problem/11053>
 
- [X] [[swea-1954]]{SWEA 1954. 달팽이 숫자(D2)}
	- [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5PobmqAPoDFAUq&categoryId=AV5PobmqAPoDFAUq&categoryType=CODE&problemTitle=1954&orderBy=FIRST_REG_DATETIME&selectCodeLang=ALL&select-1=&pageSize=10&pageIndex=1 )

- [[boj-11057]]{BOJ 11057. 오르막 수(실버1)}
	- <https://www.acmicpc.net/problem/11057>

- [[swea-1208]]{SWEA 1208. Flatten(D3)}
	- [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV139KOaABgCFAYh&categoryId=AV139KOaABgCFAYh&categoryType=CODE&problemTitle=1208&orderBy=FIRST_REG_DATETIME&selectCodeLang=ALL&select-1=&pageSize=10&pageIndex=1 )
- [[boj-1912]]{BOJ 1912. 연속합(실버2)}
	- <https://www.acmicpc.net/problem/1912]]
- getline
	```cpp
	#include <iostream>
	
	string str;
	while (getline(cin, str)) {
		for (int i = 0; i < str.size(); i++) {
			...
		}
	}
	```
	

## 2021-02-02
- string
	```cpp
	#include <string>
	
	int N;
	long L;
	long long LL;
	string strN(to_string(N));
	string strL(to_string(L));
	string strLL(to_string(NN));
	
	N = atoi(strN.c_str());
	L = atol(strL.c_str());
	LL = atoll(strLL.c_str());
	```
## 2021-02-01
- stringstream
	```cpp
	#include <sstream>
	
	string str, buf;
	stringstream ss(str);
	while (ss >> buf) { }
	```

## 2021-01-29
- [[boj-10814]]{BOJ 10814. 나이순 정렬(실버5)}
	- <https://www.acmicpc.net/problem/10814>
- [[boj-2116]]{BOJ 2116. 주사위 쌓기(골드5)}
	- <https://www.acmicpc.net/problem/2116>
- operator< 오버로딩 같은 경우 그냥 class, struct 외부에 정의하면 된다.
	```cpp
	bool operator(Node a, Node b) {
		return a.x > b.x;
	}
	```

- 내림차순 정렬
	```cpp
	#include <functional> // functional lib에 포함되어 있다.
	sort(input.begin(), input.begin() + N, greater<long long>());
	```
- lower_bound and upper_bound
	- lower_bound
		- key 값보다 크거나 같은 수가 처음 등장하는 위치
		- e.g.
		```cpp
		int index = lower_bound(arr, arr + N, key) - arr;
		int index = lower_bound(vec.begin(), vec.end(), key) - vec.begin();
		```
	- upper_bound
		- key 값을 초과하는 수가 처음 등장하는 위치(key값보다 작거나 같은 수가 마지막으로 등장하는 위치의 다음 위치)
		- e.g.
		```cpp
		int index = upper_bound(arr, arr + N, key) - arr;
		int index = upper_bound(vec.begin(), vec.end(), key) - vec.begin();
		```

- 배열 초기화
	- memset(arr, 0, sizeof(arr)); // 0으로 초기화 (#include <cstring>)
	- memset(arr, -1, sizeof(arr)); // -1로 초기화 (#include <cstring>)
	- fill(arr, arr + MAX_N, 0);
	- fill(arr, arr + MAX_N, -1);
	- fill(vec.begin(), vec.end(), -1);
	- fill(&arr[0][0], &arr[MAX_R-1][MAX_C], 1); // == fill(&arr[0][0], &arr[MAX_R-1] + MAX_C, 1);
	- fill(&arr[0][0], &arr[0][0] + MAX_R*MAX_C, 0);
	- fill_n(&arr[0][0], MAX_R * MAX_C, -1);


## 2021-01-28
- [X] [[boj-1446]]{BOJ 1446. 지름길(골드5)}
	- <https://www.acmicpc.net/problem/1446>

## 2021-01-27
- [X] [[boj-2493]]{BOJ 2493. 탑(골드5)}
	- <https://www.acmicpc.net/problem/2493>
- [ ] [[boj-1038]]{BOJ 1038. `감소하는 수`(골드5)}
	- <https://www.acmicpc.net/problem/1038>
- [ ] [[boj-1662]]{BOJ 1662. `압축`(골드5)}
	- <https://www.acmicpc.net/problem/1662>

## 2021-01-26
- [ ] [[boj-1034]]{BOJ 1034. `램프`(골드5)}
	- <https://www.acmicpc.net/problem/1034>
- [X] [[boj-1011]]{BOJ 1011. Fly me to the Alpha Centauri(실버1)}
	- <https://www.acmicpc.net/problem/1011>
- [ ] [[boj-14719]]{BOJ 14719. `빗물`(골드5)}
	- <https://www.acmicpc.net/problem/14719>

## 2021-01-25
- [X] [[boj-1037]]{BOJ 1037. 약수(실버5)}
	- <https://www.acmicpc.net/problem/1037>
- [ ] [[boj-1059]]{BOJ 1059. 좋은 구간(실버5)}
	- <https://www.acmicpc.net/problem/1059>

## 2021-01-24
- [ ] [[boj-1520]]{BOJ 1520. `내리막길`(골드4)}
	- <https://www.acmicpc.net/problem/1520>
 
- [ ] [[boj-1949]]{BOJ 1949. 우수마을(골드1)}
	- <https://www.acmicpc.net/problem/1949>
	 
- [ ] [[boj-1010]]{BOJ 1010. 다리 놓기(실버5)}
	- <https://www.acmicpc.net/problem/1010>

## 2021-01-23
- [ ] [[boj-1236]]{BOJ 1236. 성 지키기(브론즈1)}
	- <https://www.acmicpc.net/problem/1236>

## 2021-01-22
- [ ] [[boj-10610]]{BOJ 10610. 30(실버5)}
	- <https://www.acmicpc.net/problem/10610>

## 2021-01-21
- [ ] [[boj-14889]]{BOJ 14889. 스타트와 링크(실버3)}
	- <https://www.acmicpc.net/problem/14889>

- [ ] [[boj-1600]]{BOJ 1600. 말이 되고픈 원숭이(골드5)}
	- <https://www.acmicpc.net/problem/1600>


## 2021-01-20
- [ ] [[boj-16235]]{BOJ 16235. 나무 재테크(골드4)}
	- <https://www.acmicpc.net/problem/16235>

- [ ] [[boj-1024]]{BOJ 1024. 수열의 합(실버2)}
	- <https://www.acmicpc.net/problem/1024>



## 2021-01-19
- [ ] [[boj- 2316]]{BOJ 2316. 도시 왕복하기 2(플레티넘3)}
	- [ ] <https://www.acmicpc.net/problem/2316>
- [ ] [[boj-1654]]{BOJ 1654. 랜선자르기(실버3)}
	- <https://www.acmicpc.net/problem/1654>
 
	 
- [ ] [[swea-1244]]{SWEA 1244. 최대 상금(D3)}
- [X] [[swea-1210]]{SWEA 1210. Ladder1(D4)}
- [X] [[swea-1211]]{SWEA 1211. Ladder2(D4)}
- [ ] [[swea-3752]]{SWEA 3752. 가능한 시험 점수(D4)}
- [ ] [[swea-1824]]{SWEA 1824. 혁진이의 프로그램 검증(D4)}
- [ ] [[swea-1868]]{SWEA 1868. 파핑파핑 지뢰찾기(D4)}
- [ ] [[swea-4112]]{SWEA 4112. 이상한 피라미드 탐험(D5)}
- [ ] [[swea-4408]]{SWEA 4408. 자기 방으로 돌아가기(D4)}
