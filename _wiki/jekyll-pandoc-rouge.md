---
layout    : wiki
title     : jekyll-pandoc-rouge
summary   : 
date      : 2021-06-14 20:21:38 +0900
updated   : 2021-06-16 16:49:06 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
jekyll에서 markdown renderer로 kramdown을 적용했을 때 option으로 다음과 같이 작성하면 highlighter인 [rouge](https://github.com/rouge-ruby/rouge )를 통해 code block의 syntax highlight와 line number 등의 적용이 가능하다.
```yml
markdown: kramdown
highlighter: rouge
kramdown:
  input: GFM
  syntax_highlighter: rouge
  syntax_highlighter_opts:
    block:
      line_numbers: true
```


<br>
나는 [[jekyll-pandoc]]{jekyll-pandoc을 통해 kramdown에서 pandoc으로 변경}했기 때문에 위의 설정을 사용하지 못한다.

<br>
물론, jekyll에서 지원하는 [liquid](https://shopify.github.io/liquid/ ) 문법을 통해 syntax highlighting과 line number를 적용할 수 있다(참고 : <https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting>)  


<br>
하지만, liquid는 작성하기 너무 불편하기 때문에 kramdown처럼 pandoc에서도 markdown의 code block을 통해 syntax highlighting이 적용되도록 하고 싶다.

<br>
TMI로, jekyll에서 code snippet(block)의 default syntax highlighter는 [pygments](https://pygments.org/ )였다. pygments는 python으로 작성되어 있기 때문에 python 설치가 추가적으로 필요했다. jekyll 3부터 ruby로 작성된 rouge가 default highlighter가 되었고, jekyll 4부터는 _config.yml에 highlighter를 pygments로 명시해도 자동으로 rouge를 사용하도록 되어 있다고 한다.


## 과정
Jekyll에는 [Hooks](https://jekyllrb.com/docs/plugins/hooks/ )가 있어 hook을 등록하여 특정 이벤트가 발생했을 때 실행될 수 있도록 할 수 있다.

<br>
'pre_render' keyword를 통해 rendering 하기 전에 hook이 호출되도록 등록한다.

<br>
regex를 활용하여 code block일 경우 liquid 문법으로 치환한다.

<br>
치환 전, 다음 명령어를 통해 code block의 language가 rouge가 지원하는 대상인지 확인한다. 대상이 아니면 pandoc에 의해 알아서 rendering되도록 내버려둔다(language의 alias도 포함).
```sh
bundle exec rougify list
```

다음과 같이 작성을 하면 jekyll-pandoc-rouge를 쓸 수 있고, 옵션으로 line number까지도 적용할 수 있다.
```yml
markdown: Pandoc
highlighter: rouge

pandoc_rouge:
  use: true
  linenos:
    use: true
```


## 마무리
잘 알지 못하는 regex 작성하느라 애를 많이 먹었다

<br>
jekyll-pandoc-rouge를 ruby gem으로 등록까지 해보게 됐다.


