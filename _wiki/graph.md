---
layout    : wiki
title     : 그래프
summary   : 
date      : 2020-03-24 23:06:53 +0900
updated   : 2020-03-25 08:21:30 +0900
tag       : 
public    : true
published : true
parent    : [[data-structure]]
latex     : false
---

## 1. 정의 및 특성
- 어떤 상태 혹은 객체 간의 관계를 나타내는 자료구조
- 그래프는 정점(Vertex)과 간선(Edge)으로 구성
	- 정점(Vertex) : 어떠한 상태 혹은 객체를 나타냄
	- 간선(Edge) : 그러한 정점 간의 관계, 그중에서도 연결성을 표현하는 요소
- 무방향 그래프(undirected graph)와 단방향 그래프(directed graph)
- 정점 u, v가 있고, 이 두 정점을 잇는 간선 e가 있을때 정점 u, v는 e로 인해 서로 인접(adjacent)한다고 한다
- 그래프 구현 방법
	- 인접 행렬
		- 공간 복잡도 : O(|V|^2)
	- 인접 리스트
		- 공간 복잡도 : O(|E|)
