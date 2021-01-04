---
layout    : wiki
title     : topological sort(위상 정렬)
summary   : 
date      : 2020-03-19 01:54:32 +0900
updated   : 2021-01-04 10:05:42 +0900
tag       : topological-sort graph graph-algorithm
public    : true
published : true
parent    : [[graph-algorithm]]
latex     : false
---
* TOC
{:toc}

## 1. 위상 정렬

### 1.1. 정의 및 특징
- 어떤 일을 하는 순서를 찾는 알고리즘
- 방향성의 circle이 없는 그래프
- 위상 정렬 알고리즘의 핵심은 inDegree에 있다.
	- InDegree란, 한 정점에 들어오는 edge의 개수를 의미한다.
	- 들어오는 edge가 없는 node들부터 queue에 저장한 후, 연결된 node들을 방문하면서 InDegree의 수를 감소시킨다.
	- 방문하는 node 중에 InDegree의 수가 0이 되면 해당 node는 그 다음을 방문할 수 있다는 의미이므로 queue에 저장해준다.
	- queue가 빌 때까지 진행하면 된다.

### 1.2. 예시 코드
```{.cpp .numberLines}
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <vector>
#include <queue>
 
using namespace std;
 
#define MAX_N 1010
 
vector<int> vec[MAX_N];
int inDegree[MAX_N];
int N, M;
 
void topologicalSort()
{
    queue<int> q;
    for (int i = 1; i <= N; i++)
        if (inDegree[i] == 0)
            q.push(i);
 
    while (!q.empty())
    {
        int from = q.front();
        q.pop();
 
        printf("%d ", from);
 
        for (int i = 0; i < vec[from].size(); i++)
        {
            int to = vec[from][i];
            inDegree[to]--;
            if (inDegree[to] <= 0)
                q.push(to);
        }
    }
}
 
int main()
{
    scanf("%d%d", &N, &M);
    for (int i = 0; i < M; i++)
    {
        int from, to;
        scanf("%d", &from, &to);
 
        vec[from].push_back(to);
        inDegree[to]++;
    }
    topologicalSort();
}
```
