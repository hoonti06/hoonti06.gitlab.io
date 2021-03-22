---
layout    : wiki
title     : 크루스칼 알고리즘
summary   : 
date      : 2021-03-18 14:24:14 +0900
updated   : 2021-03-18 15:44:24 +0900
tag       : graph tree
public    : true
published : true
parent    : [[graph-algorithm]]
latex     : false
---
* TOC
{:toc}

- 간선을 하나씩 선택하여 MST를 찾는 알고리즘
- 순서
	- 모든 간선을 가중치에 따라 오름차순으로 정렬
	- 가중치가 가장 낮은 간선부터 선택하면서 트리를 증가시킨다
		- 사이클이 존재하면 다음 간선을 선택(사이클 존재 여부 확인은 [[Union-Find]] 알고리즘을 사용)
	- (정점-1)개의 간선이 선택될 때까지 반복한다.

```java
static class Edge implements Comparable<Edge> {
	int from, to, weight;
	
	Edge(int from, int to, int weight) {
		this.from = from;
		this.to = to;
		this.weight = weight;
	}
	
	@Override
	public int compareTo(Edge o) {
		return Integer.compare(this.weight, o.weight);
	}
}

static int V, E;
static int[] root;
static Edge[] edges;

static void init() {
	for (int i = 0; i < V; i++)
		root[i] = i;
}

static int find(int x) { 
	if (root[x] == x) return x;
	return root[x] = find(root[x]);
}

static boolean union(int x, int y) {
	int xRoot = find(x);
	int yRoot = find(y);
	
	if (xRoot == yRoot) return false;
	
	root[yRoot] = xRoot;
	return true;
}

public static void main(String[] args) throws Exception {
	BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
	
	StringTokenizer st = new StringTokenizer(in.readLine(), " ");
	V = Integer.parseInt(st.nextToken());
	E = Integer.parseInt(st.nextToken());
	edges = new Edge[E];
	root = new int[E];
	init();
	
	for (int i = 0; i < E; i++) {
		st = new StringTokenizer(in.readLine(), " ");
		int from = Integer.parseInt(st.nextToken());
		int to = Integer.parseInt(st.nextToken());
		int weight = Integer.parseInt(st.nextToken());
		edges[i] = new Edge(from, to, weight);
	}
	Arrays.sort(edges);
	
	int res = 0;
	int cnt = 0;
	for (Edge edge : edges) {
		if (union(edge.from, edge.to)) {
			res += edge.weight;
			if (++cnt == V-1) break;
		}
	}
	System.out.println(res);
}

/* input
7 11
0 1 32
0 2 31
0 5 60
0 6 51
1 2 21
2 4 46
2 6 25
3 4 34
3 5 18
4 5 40
4 6 51
*/

/* output
175
*/
```
