---
layout    : wiki
title     : dijkstra(다익스트라) 알고리즘
summary   : 
date      : 2020-03-19 09:45:18 +0900
updated   : 2021-03-24 16:43:23 +0900
tag       : dijkstra graph graph-algorithm
public    : true
published : true
parent    : [[graph-algorithm]]
latex     : false
---
* TOC
{:toc}

## 1. 정의 및 특징
- 한 정점에서 나머지 정점들의 최단 거리를 구하는 알고리즘
- 음수 가중치 불가능(무한 루프)
- Min-Heap 방식(priorty queue로 구현)
- 가장 짧은 거리의 정점부터 연산
- 시간 복잡도 : O((V+E)logV)
	- 각 노드마다 미방문 노드 중 출발점으로부터 현재까지 계산된 최단 거리를 가지는 노드를 찾는데 O(VlogV)의 시간이 필요
		- 모든 노드(O(V))에 대해 Heap에서 최솟값을 검색 및 삭제(O(logV))
	- 각 노드마다 이웃한 노드의 최단 거리를 갱신할 때 O(ElogV)의 시간이 필요
		- 각 노드마다 모든 이웃을 확인하는 것은 모든 edge를 확인하는 것(O(E))과 같고, 매번 heap에서 최단 거리를 갱신(O(logV))


## 2. 예제 코드
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
 
using namespace std;

int V, E, S;
vector< vector<pair<int, int>> > edge;
 
vector<int> dijkstra(int start) {
	// 전부 -1로 초기화
	vector<int> dist(V+1, -1); 
	priority_queue<pair<int, int>> pq; // first : -dist, second : vertex_pos
	dist[start] = 0;
	
	// Min-Heap 방식을 사용하기 위해 dist에 -1을 곱해준다.
	pq.push(make_pair(-dist[start], start)); 

	while (!pq.empty()) {
		int from = pq.top().second;
		int fromDist = -pq.top().first;
		pq.pop();

		/* 
		 * 값이 커 pq 내부에서 우선순위가 계속 밀리고 밀린 애가 이제야 빠져 나오게 되었지만
		 * Dist가 더 작은 애가 먼저 빠져나와 진행되었기 때문에 여기서 걸러진다.
		 */
		if (fromDist > dist[from])     
			continue;

		for (int i = 0; i < edge[from].size(); i++) {
			int to = edge[from][i].first;
			int toDist = fromDist + edge[from][i].second;

			// 'dist[to] == -1'은 이전에 이미 node 'to'를 방문했었는지에 대한 여부를 판단하는 것
			if (dist[to] == -1 || dist[to] > toDist) {  
				// 최단 거리 갱신
				dist[to] = toDist;
				pq.push(make_pair(-toDist, to));
			}
		}
	}
	return dist;
}

int main() {
	cin >> V >> E >> S;
	edge.resize(V + 1);
	for (int i = 0; i < E; i++) {
		int from, to, dist
			cin >> from >> to >> dist;
		edge[from].push_back(make_pair(to, dist));
	}

	vector<int> dist = Dijkstra(S);
	for (int i = 1; i <= V; i++) 
		cout << dist[i] << endl;

	return 0;
}
```

## 참고
- <https://www.codeground.org/common/popCodegroundNote>
