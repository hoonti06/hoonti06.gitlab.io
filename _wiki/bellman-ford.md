---
layout    : wiki
title     : 벨만-포드 알고리즘
summary   : 
date      : 2020-03-19 10:55:16 +0900
updated   : 2020-07-19 23:47:45 +0900
tag       : graph graph-algorithm
public    : true
published : true
parent    : [[graph-algorithm]]
latex     : false
---

## 1. 벨만-포드 알고리즘

### 1.1. 정의 및 특징
- 한 정점에서 나머지 정점들의 최단 거리
- 음수 가중치 가능
- 음수 사이클 발견 가능
- 기본적인 아이디어는 다익스트라와 비슷
	- dist배열을 만들어서 최단 거리에 근접하게 계속 갱신시켜주는 방식
	- 모든 정점의 최단 거리를 구할 때까지 모든 간선들을 여러 번 확인하여 최단 거리를 구한다는 것이 차이점
	- 다익스트라보다 느림
- 시간복잡도 : O(V*E)
- V개 정점, E개 간선일 때
	1. 정점의 수만큼 모든 간선을 relax하는 작업 수행
	2. V-1(정점 개수-1)이 한 정점에서 다른 정점까지 거칠 수 있는 최대 간선 개수(모든 정점을 거친 경우가 이에 해당)
	3. V번째에서 갱신된다면 음수 사이클 존재  
	   
	   
```cpp
for (iter = 0; iter < V; iter++)
	for (from = 1; from <= V; from++)
		for (j = 0; j < edge[from].size(); j++)
```

### 1.2. 예제 코드
```{.cpp .numberLines}
#include <cstdio>
#include <algorithm>
#include <vector>
 
#define MAX_N 1010
#define INF 0x7fffffff
 
using namespace std;

int V, E, S;
vector<pair<int, int> > edge[MAX_N];
 
vector<int> bellmanFord(int start) 
{
    vector<int> upper(V + 1, INF);
    upper[start] = 0;
    bool updated;
    for (int iter = 0; iter < V; iter++) 
    {
        updated = false;
        for (int from = 1; from <= V; from++) 
        {
            for (int i = 0; i < edge[from].size(); i++) 
            {
                int to = edge[from][i].first;
                int toCost = upper[from] + edge[from][i].second;
                
                if (upper[to] > toCost) 
                {
                    upper[to] = toCost;
                    updated = true;
                }
            }
        }
        if (!updated) 
            break;
    }
	
	// V번째 iter(첫 번째 for-loop)에서 update가 되었다는 것은 음수 사이클이 존재한다는 의미
    if (updated)
        upper.clear();
    return upper;
}
 
 
int main() 
{
	cin >> V >> E >> S;
 
    for (int i = 0; i < E; i++) 
    {
		int from, to, dist;
		cin >> from >> to >> dist;
        edge[from].push_back(make_pair(to, dist));
    }
    vector<int> dist = bellmanFord(S);
    if (dist.empty())
        cout << -1 << endl;
    else 
    {
        for (int i = 1; i <= V; i++) 
            cout << dist[i] << endl;
    }
    return 0;
}
```


## 내용 출처
[https://www.codeground.org/common/popCodegroundNote](https://www.codeground.org/common/popCodegroundNote)
