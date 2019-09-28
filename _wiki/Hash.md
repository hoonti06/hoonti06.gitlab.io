---
layout  : wiki
title   : 
summary : 
date    : 2019-03-26 23:30:15 +0900
updated : 2019-09-28 21:26:50 +0900
tag     : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# 1. 롤링 해시

abcdefgh 에서 bcd를 찾으려할 때
bcd => b*13^0 + c*13^1 + d*13^2 라고 하고,

abcdefgh 에서 abc => a*13^0 + b*13^1 + c*13^2 이고,
bcd로 가기 위해서
1. a 빼기 : (a*13^0 + b*13^1 + c*13^2) - a*13^0
2. 13으로 나누기 : (b*13^1 + c*13^2) / 13
3. d 더하기 : (b*13^0 + c*13^1) + d*13^2

이게 롤링 해시
