---
layout    : wiki
title     : jeykll markdown code block 안의 이중 중괄호 안 text가 삭제되는 이슈
summary   : 
date      : 2021-12-16 11:53:20 +0900
updated   : 2021-12-16 12:28:49 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작

다음과 같이 code block을 작성하였다.
{% raw %}
~~~
```yml
- name: Upload & release
  uses: mnao305/chrome-extension-upload@2.1.0
  with:
    file-path: frontend/extension/build.zip
    extension-id: 'abcdefghijklmnopqrstuvwxyzabcdef'
    client-id: ${{ secrets.GOOGLE_CLIENT_ID }}
    refresh-token: ${{ secrets.GOOGLE_REFRESH_TOKEN }}
```
~~~
{% endraw %}

하지만, 이중 중괄호 안의 `secrets.GOOGLE_CLIENT_ID`와 `secrets.GOOGLE_REFRESH_TOKEN`이 사라져 있다.
```yml
- name: Upload & release
  uses: mnao305/chrome-extension-upload@2.1.0
  with:
    file-path: frontend/extension/build.zip
    extension-id: 'abcdefghijklmnopqrstuvwxyzabcdef'
    client-id: ${{ secrets.GOOGLE_CLIENT_ID }}
    refresh-token: ${{ secrets.GOOGLE_REFRESH_TOKEN }}
```

그래서 이 문제를 해결하고자 했다.

## 과정

처음에는 필자가 사용하는 gem 중의 하나인 [jekyll-spaceship](https://github.com/jeffreytse/jekyll-spaceship )의 문제인 줄 알았고, [이슈에 글도 남겼다](https://github.com/jeffreytse/jekyll-spaceship/issues/68 ).

<br>
하지만, jekyll-spaceship을 제거해도 동일한 이슈가 발생하여 해당 gem의 문제가 아니었다.

<br>
이것 저것 해보다가 [stackoverflow의 답변](https://stackoverflow.com/a/24102537 )을 통해 해결 방법을 알게 되었다.

<br>
`{``% raw %``}`'와 `{``% endraw %``}`를 code block의 시작과 끝에 추가를 하면 다음과 같이 잘 나온다.

{% raw %}
```yml
- name: Upload & release
  uses: mnao305/chrome-extension-upload@2.1.0
  with:
    file-path: frontend/extension/build.zip
    extension-id: 'abcdefghijklmnopqrstuvwxyzabcdef'
    client-id: ${{ secrets.GOOGLE_CLIENT_ID }}
    refresh-token: ${{ secrets.GOOGLE_REFRESH_TOKEN }}
```
{% endraw %}

## 마무리
jekyll-spaceship 이슈에 글을 남길 때 좀 더 확인해보고 글을 남길 걸 그랬다.

## 참고
- https://stackoverflow.com/a/24102537
