---
layout    : wiki
title     : 에라토스테네스의 체
summary   : 
date      : 2022-04-18 23:52:01 +0900
updated   : 2022-04-18 23:56:23 +0900
tag       : algorithm
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

- 소수의 배수는 소수가 아니라는 것을 활용
- N의 약수는 자기 자신을 제외하고 N의 제곱근보다 클 수 없다 => N의 제곱근까지만 확인하면 된다.
- 한 번 계산 후, 배열로 저장하여 재사용할 수 있음

```java
boolean[] isPrime = new boolean[N];

public void calPrimes() {
  Arrays.fill(isPrime, true);
  isPrime[1] = false;

  int sqrtN = (int) Math.sqrt(N);
  for (int i = 2; i <= sqrtN; i++) {
    if (!isPrime[i]) {
      continue;
    }
    for (int j = i + i; j < N; j += i) {
      isPrime[j] = false;
    }
  }
}
```
