---
layout    : wiki
title     : markdown 연습장
summary   : 
date      : 2019-09-29 17:32:09 +0900
updated   : 2019-10-09 01:53:06 +0900
tag       : 
public    : true
published : true
parent    : etc
latex     : false
---

## 1. 연습장

| layer       | description |   |
|-------------|-------------|---|
| application | - build     |   |
|             | - aa        |   |
|-------------|-------------|---|
|             |             |   |

| 계층           | 설명   |     |
| :------------: | :----: | --- |
| application    |        |     |
| presentation   |        |     |
| session        |        |     |
| transport      |        |     |
| network        |        |     |
| data link      |        |     |
| physical       |        |     |


| Column 1        | Column 2     | Column 3    | Column 4     |
| --------------- | :----------- | :---------: | :----------- |
| First Row       | Some value   | Another     | 1. yoyo      |
|                 |              |             | 2. baz       |
|                 |              |             | 3. bar       |
|-----------------|--------------|-------------|--------------|
| Second row      | hey yo       | I'm cool    | Totally      |
|-----------------|--------------|-------------|--------------|
| Third  row      | asdf         | andmore     | sweet        |
{:.altTableClass}

<table>
  <tbody>
    <tr>
      <th>Tables</th>
      <th align="center">Are</th>
      <th align="right">Cool</th>
    </tr>
    <tr>
      <td>col 3 is</td>
      <td align="center">right-aligned</td>
      <td align="right">$1600</td>
    </tr>
    <tr>
      <td>col 2 is</td>
      <td align="center">centered</td>
      <td align="right">$12</td>
    </tr>
    <tr>
      <td>zebra stripes</td>
      <td align="center">are neat</td>
      <td align="right">$1</td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>item1</li>
          <li>item2</li>
        </ul>
      </td>
      <td align="center">See the list</td>
      <td align="right">from the first column</td>
    </tr>
  </tbody>
</table>


```javascript
var x = 10;
  document.getElementById("demo").innerTHML = x;
```
 ```cpp
$ var x = 10;
$ document.getElementById("demo").innerTHML = x;
```
```cpp
```cpp
```
  ```
```cpp
 ```

{% highlight  linenos %}
  $ sudo su
  # apt-get install nodejs npm
{% endhighlight %}

{% highlight cpp linenos %}
#include <cstdio>
int main()
{
	int x = 10;
	cout << x << endl;
	return 0;
}
{% endhighlight %}

  ```cpp   
#include <cstdio>
int main()
{
	int ap = 10;
	cout << ap << endl;
	return 0;
}
   ```  

{% highlight cpp linenos %}
#include <cstdio>
int main()
{
	int x = 10;
	cout << x << endl;
	return 0;
}
{% endhighlight %}


```pandoc-table
+---------------+---------------+--------------------+
| Fruit         | Price         | Advantages         |
+===============+===============+====================+
| Bananas       | $1.34         | - built-in wrapper |
|               |               | - bright color     |
+---------------+---------------+--------------------+
| Oranges       | $2.10         | - cures scurvy     |
|               |               | - tasty            |
+---------------+---------------+--------------------+
```

+---------------+---------------+--------------------+
| Fruit         | Price         | Advantages         |
+===============+===============+====================+
| Bananas       | $1.34         | - built-in wrapper |
|               |               | - bright color     |
+---------------+---------------+--------------------+
| Oranges       | $2.10         | - cures scurvy     |
|               |               | - tasty            |
+---------------+---------------+--------------------+

+----------------------------------------------------------------------+-------------------------------------------------------------------------+
| process                                                              | thread                                                                  |
+======================================================================+=========================================================================+
| OS로부터 자원을 할당 받는 `작업의 단위`                              | 프로세스가 할당 받은 자원을 이용하는 `실행의 단위`                      |
+----------------------------------------------------------------------+-------------------------------------------------------------------------+
| - 프로그램에 대한 인스턴스                                           | - 프로세스 내에서 실제로 작업을 수행                                    |
| <ul><li>프로그램 수행에 필요한 자원을 하나의 개체에서 관리</li></ul> | - 하나의 프로세스 안에서 각각의 레지스터, 스택 공간을 제외한            |
| - 모든 프로세스에는 하나 이상의 쓰레드 존재                          | 나머지 공간(heap, data, bss, code)과 자원을 다른 쓰레드와 공유          |
| - 자신만의 고유 공간과 자원을 할당 받는다.                           | - 스택과 레지스터만 switching하므로 context switching 속도가 상대적으로 |
| (메모리 공간과 자원 소모가 상대적으로 큼)                            | - 자원 공유로 인한 동기화 문제가 발생                                   |
|                                                                      | - 디버깅이 어려움                                                       |
+----------------------------------------------------------------------+-------------------------------------------------------------------------+


```
{% youtube https://www.youtube.com/watch?v=G33WiEktUo8 %}
{% youtube https://www.youtube.com/embed/V69UAnkoYHM %}
<iframe width="942" height="704" src="https://www.youtube.com/embed/V69UAnkoYHM" frameborder="0" 
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe title="YouTube video player" width="640" height="390" src="https://www.youtube.com/embed/7HiBFeLZlHM" frameborder="0" allowfullscreen></iframe>
```
