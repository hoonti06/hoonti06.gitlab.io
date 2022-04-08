---
layout    : wiki
title     : 프로그래머스 64064. 불량 사용자
summary   : 
date      : 2022-04-08 18:54:14 +0900
updated   : 2022-04-08 18:54:14 +0900
tag       : 
public    : true
published : true
parent    : [[programmers]]
latex     : false
---
* TOC
{:toc}

- <https://programmers.co.kr/learn/courses/30/lessons/64064>
- 아이디 길이와 '*'를 고려하여 매치되는 아이디를 2차원 boolean 배열로 관리
- 재귀 함수로 경우의 수 계산
- 제재 아이디 목록들을 구했을 때 내용이 동일하다면 같은 것으로 처리해야 한다.
  - N의 크기가 최대 8이기 때문에 비트마스킹으로 중복 처리가 가능하다.

<br>
```java
import java.util.*;

public class Solution {
  static int N, M;
  static boolean[][] matched;
  static Set<Integer> visitedBits;
  static int res;
  
  public int solution(String[] user_id, String[] banned_id) {
    res = 0;
    N = banned_id.length;
    M = user_id.length;
    matched = new boolean[N][M];
    visitedBits = new HashSet<>();

    for (int i = 0; i < N; i++) {
      char[] bannedId = banned_id[i].toCharArray();
      for (int j = 0; j < M; j++) {
        if (bannedId.length != user_id[j].length()) {
          continue;
        }
        char[] userId = user_id[j].toCharArray();
        boolean isMatched = true;
        for (int k = 0; k < userId.length; k++) {
          if (bannedId[k] != '*' && bannedId[k] != userId[k]) {
            isMatched = false;
            break;
          }
        }
        if (isMatched) {
          matched[i][j] = true;
        }
      }
    }

    go(0, 0);

    return res;
  }

  public void go(int idx, int bit) {
    if (idx >= N) {
      res++;
      return;
    }

    for (int j = 0; j < M; j++) {
      if (!matched[idx][j] || ((bit & (1 << j)) > 0)) {
        continue;
      }
      int nextBit = bit | 1 << j;
      if (visitedBits.contains(nextBit)) {
        continue;
      }
      visitedBits.add(nextBit);
      go(idx + 1, nextBit);
    }
  }
}
```
