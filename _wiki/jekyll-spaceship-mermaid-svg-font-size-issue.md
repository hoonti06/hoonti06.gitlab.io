---
layout    : wiki
title     : jekyll-spaceship mermaid svg의 글자가 짤리는 이슈
summary   : 
date      : 2021-06-13 11:53:04 +0900
updated   : 2021-06-14 10:52:42 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
jekyll-spaceship mermaid를 사용하게 되면 어쩌다가 다음과 같이 글자가 짤리는 것을 볼 수 있다.  
![](https://user-images.githubusercontent.com/17792043/121829775-7153aa00-ccfe-11eb-9c28-ce5e648a210e.png )  

```mermaid!
graph LR
A[working directory] --> |add| B[staging area]
B --> |commit| C[local repository]
C --> |merge| A
C --> |push| D[remote repository]
D --> |fetch| C
D --> |pull| A
```

## 과정
jekyll-spaceship이 default로 mermaid를 생성하는 방법은 [mermaid.ink](https://mermaid.ink/ )를 통해 link로 연결하는 것이기 때문에 [mermaid.ink github]()에서 issue를 확인해봤다.  


<br>
[이 issue](https://github.com/jihchi/mermaid.ink/issues/18 )의 내용을 통해서 애초에 [mermaid](https://github.com/mermaid-js/mermaid ) 자체의 원인임을 확인할 수 있었다.  

<br>
그래서 mermaid code block에 다음과 같은 code를 추가해주면 된다.  
```
%%{init: {"themeCSS": ".label foreignObject { font-size: 90% }"}}%%
```

## 마무리
위 코드를 통해 font 사이즈를 줄여주니 글자가 좀 작아져 짤리지 않는 모습을 확인할 수 있다. 
![](https://user-images.githubusercontent.com/17792043/121829826-93e5c300-ccfe-11eb-8df4-c74b34192a4e.png)  

```mermaid!
%%{init: {"themeCSS": ".label foreignObject { font-size: 90% }"}}%%
graph LR
A[working directory] --> |add| B[staging area]
B --> |commit| C[local repository]
C --> |merge| A
C --> |push| D[remote repository]
D --> |fetch| C
D --> |pull| A
```
