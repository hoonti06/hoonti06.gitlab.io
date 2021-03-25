---
layout    : wiki
title     : 순열(Permutation)과 조합(Combination)
summary   : 
date      : 2021-03-25 22:18:07 +0900
updated   : 2021-03-25 22:38:37 +0900
tag       : 
public    : true
published : true
parent    : [[algorithm-concept]]
latex     : false
---
* TOC
{:toc}

## 순열(Permutation)
- ${}_n \mathrm{ P }_r  = \frac{n!}{(n-r)!}$
### next permutation

- cpp
	- STL(algorithm lib)에 next_permutation()이 포함되어 있어 해당 함수를 이용하면 된다.

```cpp
#include <algorithm>

sort(arr, arr + N);
do {
	...
} while (next_permutation(arr, arr + N));

// OR 

sort(vec.begin(), vec.end());
do {
	...
} while (next_permutation(vec.begin(), vec.end()));
```

- java
	- java에는 따로 구현된 library가 없어 직접 구현해야 한다.
```java
void solution() {
	Arrays.sort(arr);

	do {
		...
	} while (nextPermutation(arr));
	
}

boolean nextPermutation(int[] arr) {
	// Step1
	int i = N-1;
	while (i > 0 && arr[i-1] >= arr[i]) i--;
	
	if (i <= 0) return false;
	
	// Step2
	int j = N-1;
	while (arr[i-1] >= arr[j]) j--;
	
	// Step3
	swap(arr, i-1, j);
	
	// Step4
	int k = N-1;
	while (i < k) swap(arr, i++, k--);
		
	return true;
}
```

### prev permutation
- cpp
	- STL(algorithm lib)에 prev_permutation()이 포함되어 있어 해당 함수를 이용하면 된다.
```cpp
#include <algorithm>

sort(arr, arr + N);
do {
	...
} while (prev_permutation(arr, arr + N));

// OR 

sort(vec.begin(), vec.end());
do {
	...
} while (prev_permutation(vec.begin(), vec.end()));
```



## 조합(Combination)
- ${}_n \mathrm{ C }_r  = \frac{n!}{r!(n-r)!}$


### next permutation을 활용한 조합(Combintaion) 구현
- ${}_n \mathrm{ C }_r$의 경우 n개 배열을 0으로 초기화시킨 후, r개의 원소를 1로 설정한다.
- 1로 설정한 원소는 뒤에서부터 채운다.
	- 정렬을 시키면 된다.
	- 뒤에서부터 채우는 이유는 뒤에서 채워야 순열 형태 중 최솟값이 되기 때문이다.

- cpp
```cpp
#include <algorithm>

memset(arr, 0, sizeof(arr));
for (int i = 0; i < R; i++) arr[i] = 1;
sort(arr, arr + N);
do {
	...
} while (next_permutation(arr, arr + N));

// OR 

vector<int> vec(N, 0);
for (int i = 0; i < R; i++) vec[i] = 1;
sort(vec.begin(), vec.end());
do {
	...
} while (next_permutation(vec.begin(), vec.end()));
```

- java
```java
void solution() {
	int arr[] = new int[N];
	Arrays.fill(arr, 0);
	for (int i = 0; i < R; i++) arr[i] = 1;
	Arrays.sort(arr);

	do {
		...
	} while (nextPermutation(arr));
}

boolean nextPermutation(int[] arr) {
	// Step1
	int i = N-1;
	while (i > 0 && arr[i-1] >= arr[i]) i--;
	
	if (i <= 0) return false;
	
	// Step2
	int j = N-1;
	while (arr[i-1] >= arr[j]) j--;
	
	// Step3
	swap(arr, i-1, j);
	
	// Step4
	int k = N-1;
	while (i < k) swap(arr, i++, k--);
		
	return true;
}
```
