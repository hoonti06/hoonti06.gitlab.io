---
layout    : wiki
title     : 
summary   : 
date      : 2020-02-03 19:50:36 +0900
updated   : 2021-01-04 09:59:44 +0900
tag       : 
public    : true
published : false
parent    : [[algorithm-problem]]
latex     : false
---
* TOC
{:toc}

## 1.

B, O, Y 세 글자만을 사용한 문자열을 입력받는다.(대소문자 구별 없음)  
입력한 문자열에 포함된 BOY의 개수를 찾아 리턴하시오  
예를 들어 "BOYY"에는 2개, "BOBOY"에는 3개, "BOYBOY"에는 4개, "BBOOYY"는 8개의 BOY가 있다.
입력 문자열에 B, O, Y가 아닌 다른 문자나 숫자가 입력되면, -1을 리턴한다.

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

using namespace std;

int solution(string input)
{
	vector<int> vecCntB;
	vector<int> vecSumB;

	int res = 0;
	int cntB = 0;
	int sumB = 0;
	for (int i = 0; i < input.length(); i++)
	{
		char ch = input[i];
		switch (ch)
		{
			case 'B':
				cntB++;
				break;
			case 'O':
				vecCntB.push_back(cntB);
				sumB += cntB;
				break;
			case 'Y':
				vecSumB.push_back(sumB);
				break;
			default:
				return -1;
		}
	}
	for (int i = 0; i < vecSumB.size(); i++)
		res += vecSumB[i];

	return res;
}

int main()
{
	freopen("in.txt", "r", stdin);

	int testcase;
	cin >> testcase;
	for (int tc = 1; tc <= testcase; tc++)
	{
		string input;
		cin >> input;

		transform(input.begin(), input.end(), input.begin(), ::toupper);

		cout << solution(input) << endl;
	}
}
```

input
```
9
BOYY
BOBOY
BOYBOY
BBOOYY
boy
bbOOYY
BOYBBOOYY
BOYBOOYY
BOY2
```

output
```
2
3
4
8
1
8
15
11
-1
```
