---
layout    : wiki
title     : 정렬
summary   : 
date      : 2019-09-14 10:17:04 +0900
updated   : 2020-03-06 17:07:44 +0900
tag       : 
public    : true
published : true
parent    : Algorithm-Concept
latex     : false
---

## 0. 개요

## 1. 삽입 정렬(Insertion sort)
- 정렬되어 있는 배열에 아직 정렬되지 않은 원소의 들어갈 위치를 찾아 삽입하는 정렬  
- 정렬되어 있을 때 가장 효율이 높다. 정렬되어 있는 배열의 가장 끝에 있는 원소만 정렬되지 않은 원소와 비교하면 되기 때문이다. O(N)
- 시간 복잡도
	- 평균 : O(N^2)
	- 최선 : O(N)
	- 최악 : O(N^2)

### 1.1 코드
오름차순 정렬
```{.cpp .numberLines}
void insertionSort(int arr[], int N)
{
	for (int i = 1; i < N; i++)
	{
		int key = arr[i];
		for (int j = i-1; j >= 0; j--)
		{
			if (key < arr[j])
				arr[j+1] = arr[j];
			else
				break;
		}
		arr[j+1] = key;
	}
}
```

### 1.2 이진 삽입 정렬(Binary insertion sort)
삽입 정렬에서 정렬되지 않은 원소의 들어갈 위치를 찾을 때, [[binary-search]]{이진 탐색(binary search)}을 활용하는 정렬. 삽입 정렬에서 살짝 개선된 것  

#### 1.2.1 코드
```{.cpp .numberLines}
//void binaryInsertionSort(int arr[], int N)
//{
//	for (int i = 1; i < N; i++)
//	{
//		int key = arr[i];
//		
//		int start = 0;
//		int end = i - 1;
//	
//		int mid;
//		while (start < end)
//		{
//			mid = (start + end) / 2;
//			if (key >= mid)
//			{
//				start = mid + 1;
//			}
//			else
//			{
//				end = mid;
//			}
//		}
//	}
//}
```

## 2. 선택 정렬(Selection sort)
매번 그 때의 가장 작은(큰) 원소의 index를 찾아내어 현재 index의 원소와 swap하는 정렬

## 3. 버블 정렬(Bubble sort)

## 4. 기수 정렬(Radix sort)

## 5. 퀵 정렬(quick sort)
- pivot의 위치를 찾아가면서 진행되는 정렬 알고리즘
	- pivot보다 작은 혹은 큰 원소의 개수만 알면 pivot의 최종 위치를 알 수 있다.  
- 일반적으로 가장 빠른 정렬
- 이미 정렬되어 있을 경우 **O(N^2)**로, 효율이 가장 낮다. 
	- 재귀 함수가 1과 N-1, N-1이 다시 1과 N-2, ... 분할이 N만큼 일어난다. 
	- N-1 + N-2 + N-3 + ... + 1 = (N-1)*N/2 &nbsp; **=>** &nbsp; O(N^2)
- [[divide-and-conquer]]{분할 정복(divide and conquer)} 방법으로 구현된다.(재귀 함수)
- in-place 정렬 알고리즘(그 자리에서 값을 바꾸는 알고리즘)
- cache hit rate가 좋다.
  - pivot을 이용하므로 시간 지역성 높고, 순차적으로 배열에 접근하면서 비교하기 때문에 공간 지역성이 높다.
- 시간 복잡도
	- 평균 : O(NlogN)
	- 최선 : O(NlogN)
	- 최악 : O(N^2)
- 공간 복잡도 : O(logN) ~ O(N)
	- 퀵 정렬에서는 재귀적인 호출을 이용하기 때문에 스택을 관리하기 위한 메모리가 별도로 필요하다. 스택에 소모되는 메모리는 재귀 함수의 깊이와 비례하게 된다. 그러므로 분할이 이상적으로 이루어진 경우 O(logN)의 스택 메모리가 소요된다. 최악의 경우, 즉 분할이 한쪽으로만 이루어진 경우에는 O(N)의 스택 메모리가 필요하다


### 5.1 코드
정해진 pivot보다 작은(또는 큰) 원소가 몇 개인지 알면 해당 pivot에 해당하는 원소가 정렬했을 때 몇 번째 위치인지 알 수 있다.  
아래의 코드는 오름차순 정렬이다.
left가 start+1부터 시작하게 되면 원소가 2개인 경우에 문제가 발생하기 때문에, start부터 시작하게 된다.  

`while (arr[left] <= pivot && left < end)`에만 `left < end` 조건이 있는 이유는 `while(pivot < arr[right])`에서는 항상 right가 pivot위치에 가게 되면 해당 while이 종료되기 때문이다.  

결국 **최상위 while이 종료된 후의 right는 항상 pivot보다 작거나 같은 값을 갖는 부분 집합의 마지막 index를 가리키게 된다.**
그리고 최상위 while문 밖에서 pivot의 위치인 start와 right(pivot보다 작거나 같은 값을 갖는 부분 집합의 마지막 index)와 swap하게 되고, pivot 양쪽으로 재귀 함수를 호출한다.

```{.cpp .numberLines}
void quickSort(int arr[], int start, int end)
{
	if (start >= end)
		return;

	int pivot = arr[start];

	int left = start;
	int right = end;

	while (left < right)
	{
		while (arr[left] <= pivot && left < end)
			left++;
		while (pivot < arr[right])
			right--;

		if (left < right)
			swap(arr[left], arr[right]);
	}

	swap(arr[start], arr[right]);

	quickSort(arr, start, right - 1);
	quickSort(arr, right + 1, end);
}
```

## 6. 머지 정렬

## 7. 힙 정렬

## 8. 셸 정렬

