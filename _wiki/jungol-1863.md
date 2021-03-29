---
layout    : wiki
title     : JUNGOL 1863. 종교
summary   : 
date      : 2021-03-18 21:41:11 +0900
updated   : 2021-03-29 21:02:01 +0900
tag       : union-find
public    : true
published : true
parent    : [[jungol]]
latex     : false
---
* TOC
{:toc}

- [[Union-Find]] 구현
- root 배열에 집합의 원소 개수를 저장하는 방식으로 구현
	- 음수면 자기 자신이 root, 음수의 절댓값이 해당 집합의 원소 개수
	- root 배열을 -1로 초기화
	- union시 음수 + 음수 형태
- 종교의 수를 구하기 위해 root의 개수 계산
- xRoot에 yRoot를 붙이면 accept를 받지만, yRoot에 xRoot를 붙이면 stackoverflow가 발생한다.
	- rank를 사용해야 한다.


```java
import java.io.*;
import java.util.*;

public class Main {
	static int[] root, rank;

	static int find(int x) {
		if (root[x] < 0) return x;
		return root[x] = find(root[x]);
	}

	static void union(int x, int y) {
		int xRoot = find(x);
		int yRoot = find(y);

		if (xRoot != yRoot) {
			if (rank[xRoot] <= rank[yRoot]) {

				root[yRoot] += root[xRoot];
				root[xRoot] = yRoot;

				if (rank[xRoot] == rank[yRoot])
					rank[yRoot]++;
			} else {
				root[xRoot] += root[yRoot];
				root[yRoot] = xRoot;
			}
		}
	}

	public static void main(String[] args) throws Exception {
		BufferedReader in = new BufferedReader(new InputStreamReader(System.in));

		StringTokenizer st = new StringTokenizer(in.readLine(), " ");
		int N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());
		rank = new int[N+1];
		root = new int[N+1];
		for (int i = 1; i <= N; i++) root[i] = -1;

		for (int i = 0; i < M; i++) {
			st = new StringTokenizer(in.readLine(), " ");
			int x = Integer.parseInt(st.nextToken());
			int y = Integer.parseInt(st.nextToken());
			union(x, y);
		}

		int cnt = 0;
		for (int i = 1; i <= N; i++)
			if (root[i] < 0) cnt++;

		System.out.println(cnt);
	}
}
```
