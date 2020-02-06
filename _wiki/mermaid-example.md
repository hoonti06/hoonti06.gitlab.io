---
layout    : wiki
title     : 
summary   : 
date      : 2020-01-28 11:12:44 +0900
updated   : 2020-02-05 18:51:20 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 0. test

{% mermaid %}
graph TD
	A['Christmas'] -->|Get money| B(Go shopping)
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


{% mermaid %}
gantt
       dateFormat  YYYY-MM-DD
       title Adding GANTT diagram functionality to mermaid
	   excludes weekdays 2014-01-10

       section A section
       Completed task            :done,    des1, 2014-01-06,2014-01-08
       Active task               :active,  des2, 2014-01-09, 3d
       Future task               :         des3, after des2, 5d
       Future task2              :         des4, after des3, 5d

       section Critical tasks
       Completed task in the critical line :crit, done, 2014-01-06,24h
       Implement parser and jison          :crit, done, after des1, 2d
       Create tests for parser             :crit, active, 3d
       Future task in critical line        :crit, 5d
       Create tests for renderer           :2d
       Add to mermaid                      :1d

       section Documentation
       Describe gantt syntax               :active, a1, after des1, 3d
       Add gantt diagram to demo page      :after a1  , 20h
       Add another diagram to demo page    :doc1, after a1  , 48h

       section Last section
       Describe gantt syntax               :after doc1, 3d
       Add gantt diagram to demo page      :20h
       Add another diagram to demo page    :48h
{% endmermaid %}
	  

{% mermaid %}
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
{% endmermaid %}
