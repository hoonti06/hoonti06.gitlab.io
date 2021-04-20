---
layout    : wiki
title     : Union-Find
summary   : 
date      : 2021-03-18 10:13:14 +0900
updated   : 2021-03-24 17:27:26 +0900
tag       : 
public    : true
published : true
parent    : [[tree-algorithm]]
latex     : false
---
* TOC
{:toc}

- Disjoint-set(서로소 집합)이라고도 한다.
 
- 초기화
```cpp
int init() {
	for (int i = 1; i <= N; i++)
		root[i] = i;
}
```

- find
```cpp
int find(int x) {
	return root[x] == x? x : find(root[x]);
}

// Path Compression : return되는 root 값을 이용하여 root 바로 밑으로 옮겨 경로를 압축하는 방법
int find2(int x) {
	if (root[x] == x) return x;
	return root[x] = find(root[x]);
}
```

- union
```cpp
// union이 keyword이기 때문에 함수명을 merge로 명명
void merge(int x, int y) { 
	x = find(x);
	y = find(y);
	
	root[y] = x;
}
```

```cpp
// subtree x와 y의 높이(rank)를 비교하여 낮은 높이의 트리가 높은 트리의 하위로 합쳐진다
// Path Compression이 적용된 find2()를 사용하면 rank가 실제 트리의 높이를 의미하지 않게 될 수 있다.
// 하지만, Path Compression과 rank를 같이 쓸 수는 있고, 조금이나마 최적화가 될 수 있다.
// 깊이(depth)나 높이(height)를 쓰지 않고 rank를 쓰는 이유는 Path Compression을 통해 실제 트리의 높이를 의미하지 않게 될 수 있기 때문이다.
void merge2(int x, int y) { 
	x = find(x);
	y = find(y);
	
	if (x == y) return;
	if (rank[x] < rank[y])
		root[x] = y;
	else {
		root[y] = x;
		if (rank[x] == rank[y])
			rank[x]++;
	}
}
```

```cpp
// 집합의 원소 개수를 계산한다
int merge3(int x, int y) { 
	x = find(x);
	y = find(y);
	
	if (x != y) {
		root[x] = y;
		nodeCnt[x] += nodeCnt[y];
		nodeCnt[y] = 1;
	}
	return nodeCnt[x];
}
```

- root 배열 하나로 집합의 원소 개수까지 나타낼 수 있다.
	- -1로 초기화

```cpp
int root[N+1];

void init() {
	for (int i = 1; i <= N; i++)
		root[i] = -1;
}

int find(int x, int y) {

}

int merge(int x, int y) {

}

```

