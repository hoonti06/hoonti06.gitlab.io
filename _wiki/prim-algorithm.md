---
layout    : wiki
title     : 프림 알고리즘
summary   : 
date      : 2021-03-18 15:22:46 +0900
updated   : 2021-03-18 18:53:35 +0900
tag       : 
public    : true
published : true
parent    : [[graph-algorithm]]
latex     : false
---
* TOC
{:toc}

- 하나의 정점에서 연결된 간선들 중 하나씩 선택하면서 MST를 만들어 가는 방식
- 순서
	- 임의 정점을 하나 선택하여 시작
	- 선택한 정점과 인접하는 정점들 중의 최소 비용의 간선이 존재하는 정점을 선택
	- 모든 정점이 선택될 때까지 반복
- 서로소인 2개의 집합 정보를 유지
	- 트리 정점들 : MST를 만들기 위해 선택된 정점들
	- 비트리 정점들 : 아직 선택되지 않은 정점들

```java
static class Edge implements Comparable<Edge> {
	int to, weight;
	Edge(int to, int weight) {
		this.to = to;
		this.weight = weight;
	}
	@Override
	public int compareTo(Edge o) {
		return this.weight - o.weight;
	}
}

public static void main(String[] args) throws Exception {
	BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
	
	int N = Integer.parseInt(in.readLine());
	int[][] adjMatrix = new int[N][N];
	boolean[] visited = new boolean[N];
	int[] minEdge = new int[N];
	int res = 0;
	
	StringTokenizer st = null;
	for (int i = 0; i < N; i++) {
		st = new StringTokenizer(in.readLine(), " ");
		for (int j = 0; j < N; j++)
			adjMatrix[i][j] = Integer.parseInt(st.nextToken());
		
		minEdge[i] = Integer.MAX_VALUE;
	}
	
	// Solution1
	PriorityQueue<Edge> pq = new PriorityQueue<>();
	int start = 0;
	visited[start] = true;
	for (int to = 0; to < N; to++) {
		if (adjMatrix[start][to] != 0)
			pq.offer(new Edge(to, adjMatrix[start][to]));
	}
	
	while (!pq.isEmpty()) {
		Edge cur = pq.poll();
		if (visited[cur.to]) continue;
		visited[cur.to] = true;
		
		res += cur.weight;
		int from = cur.to;
		for (int to = 0; to < N; to++) {
			if (adjMatrix[from][to] != 0 && !visited[to])
				pq.offer(new Edge(to, adjMatrix[from][to]));
		}
	}
	System.out.println(res);
	
	
	// Solution2
	minEdge[0] = 0;
	for (int c = 0; c < N; c++) {
		int min = Integer.MAX_VALUE;
		int minVertex = 0;
		for (int i = 0; i < N; i++) {
			if (!visited[i] && minEdge[i] < min) {
				min = minEdge[i];
				minVertex = i;
			}
		}
		
		res += min;
		
		visited[minVertex] = true;
		for (int i = 0; i < N; i++) {
			if (!visited[i] && adjMatrix[minVertex][i] != 0
					&& minEdge[i] <= adjMatrix[minVertex][i])
				continue;
				
			minEdge[i] = adjMatrix[minVertex][i];
		}
	}
	System.out.println(res);
}


	int N = Integer.parseInt(in.readLine());
	int[][] adjMatrix = new int[N][N];
	boolean[] visited = new boolean[N];
	
	StringTokenizer st = null;
	for (int i = 0; i < N; i++) {
		st = new StringTokenizer(in.readLine(), " ");
		for (int j = 0; j < N; j++) {
			adjMatrix[i][j] = Integer.parseInt(st.nextToken());
		}
	}
	
}

/* input
7
0 32 31 0 0 60 51
32 0 21 0 0 0 0
31 21 0 0 46 0 25
0 0 0 0 34 18 0
0 0 46 34 0 40 51
60 0 0 18 40 0 0
51 0 25 0 51 0 0
*/
/* output
175
*/
```
