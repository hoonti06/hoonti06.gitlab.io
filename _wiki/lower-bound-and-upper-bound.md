---
layout    : wiki
title     : lower bound와 upper bound
summary   : 
date      : 2021-03-25 22:47:14 +0900
updated   : 2021-03-26 00:14:21 +0900
tag       : lower-bound upper-bound
public    : true
published : true
parent    : [[algorithm-concept]]
latex     : false
---
* TOC
{:toc}

## lower bound
- key 값보다 크거나 같은 수가 처음 등장하는 위치
- cpp
	- STL(algorithm lib)로 lower_bound()가 존재하여 사용하면 된다. 
	```cpp
	int index = lower_bound(arr, arr + N, key) - arr;
	int index = lower_bound(vec.begin(), vec.end(), key) - vec.begin();
	```

- java
	```java
	static int lowerBound(int[] arr, int key) {
		int res = 0;
		int left = 0, right = arr.length - 1;
		while (left <= right) {
			int mid = (left + right) / 2;
			if (key <= arr[mid]) {
				res = mid;
				right = mid - 1;
			}
			else
				left = mid + 1;
		}
		return res;
	}
	```


## upper bound

- key 값을 초과하는 수가 처음 등장하는 위치(key값보다 작거나 같은 수가 마지막으로 등장하는 위치의 다음 위치)
- cpp
	- STL(algorithm lib)로 upper_bound()가 존재하여 사용하면 된다.
	```cpp
	int index = upper_bound(arr, arr + N, key) - arr;
	int index = upper_bound(vec.begin(), vec.end(), key) - vec.begin();
	```

- java
	```java
	static int upperBound(int[] arr, int key) {
		int res = 0;
		int left = 0, right = arr.length - 1;
		while (left <= right) {
			int mid = (left + right) / 2;
			if (key < arr[mid]) { // lowerBound에서 등호만 빼면 된다.
				res = mid;
				right = mid - 1;
			}
			else {
				left = mid + 1;
			}
		}
		return res;
	}
	```
