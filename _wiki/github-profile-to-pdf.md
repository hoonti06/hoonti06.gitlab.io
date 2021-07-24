---
layout    : wiki
title     : github profile(README.md)을 PDF로 변환하기
summary   : 
date      : 2021-06-17 14:29:52 +0900
updated   : 2021-06-18 19:32:21 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작
마이다스 아이티 채용 지원서 작성을 하는 와중에 포트폴리오 파일을 업로드하게끔 되어있다. 네이버의 경우 내 github url을 입력할 수 있었는데 말이다. 그래서 github profile로 적었던 markdown을 포트폴리오로 제출하고 싶었는데, github profile을 쉽게 pdf로 변환하는 방법이 없을까 생각을 해봤다.

## 과정
우선, pandoc을 통해 markdown에서 pdf로 변경해보려고 했다.

docker hub에 pandoc/core와 pandoc/latex 2 가지 이미지가 있는데, 뭔 차이가 있는지는 모르겠다. (<https://github.com/jgm/pandoc/blob/master/INSTALL.md#docker>와 <https://pandoc.org/installing.html#docker> 에 다 나와 있었다)

일단, 2 가지 이미지를 모두 pull 받아서 다음과 같이 실행했다(/bin/bash는 안 먹힌다)
```sh
$ docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/core README.md -o output.pdf
```
> pdflatex not found. Please select a different --pdf-engine or install pdflatex

<br>
```
$ docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/core README.md --pdf-engine=xelatex -o output.pdf
```
> xelatex not found. Please select a different --pdf-engine or install xelatex

<br>
한글이 다 깨짐
```sh
$ docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/latex README.md --pdf-engine=xelatex -o output.pdf
```
> [WARNING] Missing character: There is no 김 (U+AE40) (U+AE40) in font [lmroman12-bold]:mapping=tex-
> [WARNING] Missing character: There is no 지 (U+C9C0) (U+C9C0) in font [lmroman12-bold]:mapping=tex-




<br>
```sh
$ docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/latex README.md --pdf-engine=xelatex -o output.pdf
```
> [WARNING] Missing character: There is no 김 (U+AE40) (U+AE40) in font [lmroman12-bold]:mapping=tex-
> [WARNING] Missing character: There is no 지 (U+C9C0) (U+C9C0) in font [lmroman12-bold]:mapping=tex-


이전에 docker image에 pandoc을 설치한 경험을 통해 local에 있는 ruby container에서 pandoc을 설치 및 실행시켜보고자 했다.
```sh
$ docker run -it --name=pandoc --volume "`pwd`:/srv" 8fe6e1f7b421 /bin/bash
```

ruby container에서 pandoc 설치 (참고 : <https://github.com/hoonti06/dk-hoonti06.gitlab.io-env/commit/b375f6ada6196f52f2edcaf7d4fe4d40506ea5a1#diff-dd2c0eb6ea5cfc6c4bd4eac30934e2d5746747af48fef6da689e85b752f39557R15>)
```sh
$ curl -o pandoc.deb -fsSL https://github.com/jgm/pandoc/releases/download/2.7.3/pandoc-2.7.3-1-amd64.deb && \
dpkg -i pandoc.deb && \
rm -f pandoc.deb
```

xelatex 관련 의존성 설치
```sh
apt-get -qq update && \
apt-get install texlive-xetex texlive-fonts-recommended texlive-latex-recommended
```

다시 시도했지만 한글이 다 깨짐
```sh
pandoc README.md --pdf-engine=xelatex  -o output.pdf
```

markdown을 html로 변환 후, html을 pdf로 변환 시도하였지만 실패하여 파일 조차 생성 안됨(html은 한글까지 잘 나옴)
```sh
pandoc README.md -o temp.html
pandoc temp.html --pdf-engine=xelatex -o output.pdf
```
> [WARNING] Could not convert image '/tmp/tex2pdf.-150905f53fd98563/2564ecca5ab28f434dea29b27542d596a5bf6e73.svg': check that rsvg-convert is in path.
  rsvg-convert: createProcess: runInteractiveProcess: exec: does not exist (No such file or directory)
[WARNING] Could not convert image '/tmp/tex2pdf.-150905f53fd98563/7c7823741f191b59bf57ac31848f96a98e8946c6.svg': check that rsvg-convert is in path.
Error producing PDF.
! LaTeX Error: Cannot determine size of graphic in /tmp/tex2pdf.-150905f53fd985
63/2564ecca5ab28f434dea29b27542d596a5bf6e73.svg (no BoundingBox).

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...                                              
                                                  
l.90 ...4ecca5ab28f434dea29b27542d596a5bf6e73.svg}

다음과 같이 설치하면 위 rsvg-convert 에러는 안뜨지만, 한글을 제대로 인식 못한다
```sh
$ apt-get install librsvg2-bin
```

wkhtmltopdf을 설치하여 pdf engine으로 사용할 수 있지만, 한글만 잘 나오고 emoji는 안 나온다.
```sh
$ apt-get install wkhtmltopdf
$ pandoc README.md --pdf-engine=wkhtmltopdf -o output.pdf
```

header.html을 다음과 같이 작성한다
```html
<style>
img.emoji {
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}
</style>
<script src="https://twemoji.maxcdn.com/2/twemoji.min.js?11.2"></script>
<script>window.onload = function () { twemoji.parse(document.body);}</script>
```

다음과 같이 -H 옵션을 주면 emoji까지 잘 나오는 pdf를 얻을 수 있다.
```sh
$ pandoc README.md -f markdown+emoji -t html5  --pdf-engine=wkhtmltopdf -o out.pdf -H header.html
```

정리하자면, 온전히 잘 변환된 PDF 결과를 얻기 위해 다음 과정을 진행하면 된다

header.html 작성
```html
<style>
img.emoji {
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}
</style>
<script src="https://twemoji.maxcdn.com/2/twemoji.min.js?11.2"></script>
<script>window.onload = function () { twemoji.parse(document.body);}</script>
```

docker container 실행
```sh
$ docker run -it --rm --volume "`pwd`:/data" ubuntu /bin/bash

# in container

# DEBIAN_FRONTEND=noninteractive : 상호작용 방지
$ DEBIAN_FRONTEND=noninteractive apt-get update -qq && apt-get -yq install wget curl wkhtmltopdf

# install pandoc
$ curl -o pandoc.deb -fsSL https://github.com/jgm/pandoc/releases/download/2.7.3/pandoc-2.7.3-1-amd64.deb && \
dpkg -i pandoc.deb && \
rm -f pandoc.deb

# install nanumfont for ko
$ mkdir -p /usr/share/fonts/nanumfont
$ cd /usr/share/fonts/nanumfont/
$ wget http://static.campaign.naver.com/0/hangeul/renew/download/NanumFont_TTF.zip
$ unzip Nanum*.zip

# execute pandoc
$ cd /data
$ pandoc README.md -f markdown+emoji -t html5 --pdf-engine=wkhtmltopdf -o out.pdf -H header.html
```


참고로, pandoc/latex docker image에는 wkhtmltopdf가 없어서 다음과 같이 쓰면 에러가 발생한다.
```sh
docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/latex README.md -f markdown+emoji -t html5 --pdf-engine=wkhtmltopdf -H header.html -o out.pdf
```

---
다른 방법 찾아보기


pandoc으로 html은 만들었으니까, html을 pdf로 변환하는 다른 방법을 찾아보게 되었고, wkhtmltopdf를 알게 되었다.  
개인이 올려놓은 wkhtmltopdf image가 있어서 실행시켰다.

```sh
$ docker run -it --rm --name=wkhtmltopdf --volume "`pwd`:/data" insightsoftware/wkhtmltopdf:1.0.10 /bin/bash
```

container 내부에서 다음과 같이 실행했는데, 한글이 깨졌다
```sh
$ wkhtmltopdf temp.html output.pdf
```

다음과 같이 나눔폰트를 다운 받았다
```sh
$ apt-get update -qq && apt-get install wget zip

$ mkdir /usr/share/fonts/nanumfont
$ cd /usr/share/fonts/nanumfont/
$ wget http://static.campaign.naver.com/0/hangeul/renew/download/NanumFont_TTF.zip
$ unzip Nanum*.zip
```

한글은 나왔지만, emoji가 깨져서 나왔다.
```sh
$ wkhtmltopdf --encoding 'utf-8' temp.html output.pdf
```

<https://github.com/wkhtmltopdf/wkhtmltopdf/issues/2913#issuecomment-443175335> 여기 나와 있는 것처럼 html에 다음 코드를 추가한 다음,
```html
<style>
img.emoji {
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}
</style>
<script src="https://twemoji.maxcdn.com/2/twemoji.min.js?11.2"></script>
<script>window.onload = function () { twemoji.parse(document.body);}</script>
```

다시 시도해보니 emoji도 잘 나왔다.
```sh
$ wkhtmltopdf --encoding 'utf-8' temp.html output.pdf
```


<br>
html을 pdf로 바꾸는 또 다른 방법으로, <https://md2pdf.netlify.app/> 해당 page에서 transform을 클릭하면 print 창이 열리고 PDF로 저장할 수 있도록 되어있다.  
이걸 보고 chrome을 통해 PDF로 print를 할 수 있을 것 같아 command line로 할 수 있는 방법을 찾아봤다.

<br>
<https://stackoverflow.com/a/47663066>의 Example2 처럼 가능하다.


그래서 ubuntu docker container에서 chrome을 설치했다.
```sh
$ docker run -it --rm --name=ubuntu ubuntu /bin/bash
```

container에서 chrome을 설치했다(chrome 설치 중간에 살고 있는 위치와 timezone을 물어보는데, 이는 ubuntu의 특성인 듯 하다)
```sh
$ apt-get update -qq && apt-get install wget
$ wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
$ apt-get install ./google-chrome-stable_current_amd64.deb
```

다음 명령어로 변환했는데, 또 한글이 깨진다.
```sh
$ google-chrome --headless --disable-gpu --no-sandbox --print-to-pdf=out.pdf temp.html
```

폰트를 다운 받는다.
```sh
$ apt-get update -qq && apt-get install wget zip

$ mkdir /usr/share/fonts/nanumfont
$ cd /usr/share/fonts/nanumfont/
$ wget http://static.campaign.naver.com/0/hangeul/renew/download/NanumFont_TTF.zip
$ unzip Nanum*.zip
```

아래 명령어로 실행했는데, emoji가 안 나온다
```sh
$ google-chrome --headless --disable-gpu --no-sandbox --print-to-pdf=out.pdf temp.html
```

다음 코드를 html에 추가했는데도 emoji가 안 된다. 그 이유는 local 파일의 경우 window.onload가 되기 전 변환을 수행하는 듯 하다
```html
<style>
img.emoji {
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}
</style>
<script src="https://twemoji.maxcdn.com/2/twemoji.min.js?11.2"></script>
<script>window.onload = function () { twemoji.parse(document.body);}</script>
```

이것도 해봤으나 당연히 emoji가 안 된다(똑같은 chrome이기 때문에)
```sh
$ docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --print-to-pdf-no-header --print-to-pdf=output.pdf --hide-scrollbars temp.html
```

하지만, url을 통한 pdf 변환은 한글도, emoji도 잘 된다
```sh
$ docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --print-to-pdf-no-header --print-to-pdf=output.pdf --hide-scrollbars https://hoonti06.gitlab.io
```

<https://stackoverflow.com/a/58698226> Selenium으로도 가능하나 해보진 않았다




## 마무리
Dockerfile을 만들었다.
```dockerfile
FROM ubuntu

MAINTAINER hoonti06 <hoonti06@gmail.com>

ENV LANG C.UTF-8
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Upgrade OS 
ARG DEBIAN_FRONTEND=noninteractive

RUN DEBIAN_FRONTEND=noninteractive apt-get -qq update && apt-get install -yq wget curl wkhtmltopdf > /dev/null


# install pandoc
RUN curl -o pandoc.deb -fsSL https://github.com/jgm/pandoc/releases/download/2.7.3/pandoc-2.7.3-1-amd64.deb && \
	dpkg -i pandoc.deb && \
	rm -f pandoc.deb

# install nanumfont for ko
RUN mkdir -p /usr/share/fonts/nanumfont && \
	cd /usr/share/fonts/nanumfont && \
	wget http://static.campaign.naver.com/0/hangeul/renew/download/NanumFont_TTF.zip && \
	unzip Nanum*.zip

WORKDIR /data
ENTRYPOINT ["pandoc"]
```

docker 빌드
```sh
docker build -t  md2pdf .
```

docker container를 통한 PDF 변환 실행
```sh
$ docker run --rm -it -v "`pwd`:/data" md2pdf README.md -f markdown+emoji -t html5 --pdf-engine=wkhtmltopdf -o out.pdf -H header.html
```
