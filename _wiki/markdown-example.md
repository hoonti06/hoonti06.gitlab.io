---
layout    : wiki
title     : markdown 연습장
summary   : 
date      : 2019-09-29 17:32:09 +0900
updated   : 2019-10-02 16:38:01 +0900
tag       : 
toc       : true
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

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
```cli
$ var x = 10;
$ document.getElementById("demo").innerTHML = x;
```

```cpp
#include <cstdio>
int main()
{
	int x = 10;
	cout << x << endl;
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
