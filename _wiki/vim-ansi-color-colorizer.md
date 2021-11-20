---
layout    : wiki
title     : vim에서 ANSI color가 보이도록 하는 방법, colorizer
summary   : 
date      : 2021-09-28 09:05:20 +0900
updated   : 2021-11-21 00:03:13 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

vim으로 log 파일을 열면 ANSI color가 코드 그대로 나타나서 가독성이 떨어진다.  
![]( /wiki-img/vim-ansi-color-colorizer/135002615-4ef8eb26-f88b-4168-9a97-0df0887d6a4d.png )

ANSI color를 실제 색으로 변환시켜주는 vim plugin인 [chrisbra/colorizer](https://github.com/chrisbra/colorizer )가 있다.

plugin을 설치하기 위해서는 vim의 plugin manager인 [vundle](https://github.com/VundleVim/Vundle.vim )이 필요하다.

<br>
vundle이 설치되어 있지 않다면 먼저 vundle project를 특정 위치에 clone한다.

```sh
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

<br>
`.vimrc`에 다음 코드를 추가한다.

```
oset nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
Plugin 'chrisbra/colorizer' " ANSI color
call vundle#end()            " required
filetype plugin indent on    " required
```

<br>
다음 2가지 방법 중 하나를 선택하여 `.vimrc`에 입력해놓은 plugin을 설치한다.
- vim에서 `:PluginInstall`를 실행한다.
- command line으로 `vim +PluginInstall +qall`를 입력 및 실행한다.

<br>
vim에서 log 파일을 열고 `:ColorHighlight`를 실행하면 댜음과 같이 색이 적용된다.
![]( /wiki-img/vim-ansi-color-colorizer/135004164-aeea896d-b363-4bad-8032-50569ba29443.png )

