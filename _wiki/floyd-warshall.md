---
layout    : wiki
title     : 플로이드-워셜 알고리즘
summary   : 
date      : 2020-03-19 14:20:42 +0900
updated   : 2020-03-24 21:38:10 +0900
tag       : graph graph-algorithm dp
public    : true
published : true
parent    : [[graph-algorithm]]
latex     : false
---

## 1. 플로이드-워셜 알고리즘
 - 모든 정점 사이의 최단 거리
 - 다익스트라 N번 수행하는 것보다 빠름
 - 시간복잡도 : O(V^3) (단, V는 정점의 개수)
 - 정점쌍 (i, j)에 대해 정점 k 경유지를 거쳤을 때 더 빠른 경우 갱신한다.
 - dp[i][j] 는 정점 i에서 정점 j 까지의 거리


```cpp
for (k = 0; k < V; k++)
	for (i = 0; i < V; i++)
		for (j = 0; j < V; j++)
			dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);
```

### 1.2 예제 코드
```{.cpp .numberLines}
#include <iostream>
 
#define MAX 105
#define INF 0x7fffffff
 
using namespace std;
 
int V, dp[MAX][MAX];
 
void floydWarwhall() 
{
    for (int k = 1; k <= V; k++)
    {
        for (int i = 1; i <= V; i++)
        {
            for (int j = 1; j <= V; j++) 
            {
                if (dp[i][k] == INF || dp[k][j] == INF) 
                    continue;
 
				dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);
            }
        }
    }
}
 
int main() 
{
    cin >> V;
 
    for (int i = 1; i <= V; i++)
    {
        for (int j = 1; j <= V; j++) 
        {
            cin >> d[i][j];
 
            if (d[i][j] == 0) 
                d[i][j] = INF;
        }    
    }
 
    floydWarwhall();
 
    for (int i = 1; i <= n; i++) 
    {
        for (int j = 1; j <= n; j++) 
            cout << dp[i][j] << " ";
        cout << endl;
    }
}
```
