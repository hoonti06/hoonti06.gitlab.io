---
layout    : wiki
title     : 
summary   : 
date      : 2020-01-28 11:12:44 +0900
updated   : 2020-01-28 15:33:32 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 0. test

{% mermaid %}
graph TD
	A[Christmas] -->|Get money| B(Go shopping)
	B --> C{Let me think}
	C -->|One| D[Laptop]
	C -->|Two| E[iPhone]
	C -->|Three| F[fa:fa-car Car]
{% endmermaid %}

{% mermaid %}
graph LR
A[working directory] --> |add| B[staging area]
B --> |commit| C[local repository]
C --> |merge| A
C --> |push| D[remote repository]
D --> |fetch| C
D --> |pull| A
{% endmermaid %}

{% mermaid %}
classDiagram
classA --|> classB : Inheritance
classC --* classD : Composition
classE --o classF : Aggregation
classG --> classH : Association
classI -- classJ : Link(Solid)
classK ..> classL : Dependency
classM ..|> classN : Realization
classO .. classP : Link(Dashed)
{% endmermaid %}
