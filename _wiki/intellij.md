---
layout    : wiki
title     : intellij
summary   : 
date      : 2020-09-19 19:05:08 +0900
updated   : 2020-09-22 23:14:05 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## shortcut
- `<option> + F1` (editor, project window) : project 윈도우로 갈 수 있다.
- `<option> + <enter>` (editor window) 
  - static import 설정 (Add on-demand static import for 'org.assertj.core.api.Assersions')
  - import 설정
- `<esc>` (project window) : editor window로 이동
- `<command> + N` (editor) : generate(getter & setter, constructor 등)
- `<command> + N` (project) : new (파일 생성)
- `<ctrl> + <shift> + R` (editor) : cursor 위치에서 run
- `<ctrl> + R` (editor) : 이전 run
- `<command> + <option> + R` (editor) : Resume Programe
- `<ctrl> + <shift> + D` (editor) : cursor 위치에서 Debug
- `<ctrl> + D` (editor) : 이전 Debug
- `<ctrl> + T` (editor) : Refactor 관련 실행 리스트가 나온다.(Preference > Editor > Vim Emulation에서 `<ctrl> + T`의 Handlder를 `IDE`로 변경한다)
- `<command> + <option> + V` (editor) : 해당 method의 리턴 타입으로 변수 생성(Extract > Indroduce Variable)
- `<command> + <option> + M` (editor) : 해당 block을 method로 추출할 수 있다.(Extract > Extract Method)
- `<command> + <option> + N` (editor) : 해당 변수를 저장하는 값으로 inline한다.(Inline Variable)
- `<command> + <option> + P` (editor) : 해당 변수를 parameter로 추출한다.(Extract > Parameter)
- `<command> + P` (editor) : method의 parameter info를 볼 수 있다. (Parameter Info)
- `<command> + <shift> + T` (editor) : 해당 클래스의 Test 클래스를 생성한다.
- `<command> + <shift> + A` (editor) : Find Action
- `<command> + <shift> + O` (editor) : Find file (Navigate -> File)
- `<command> + B` (editor) : method declaration으로 이동 (Navigate -> Go to Declaration or Usages)
- `<command> + P` (editor) : method의 parameter info를 볼 수 있다. (Parameter Info)
- `<shift> + <shift>` (editor) : 모두 찾기
- `<command> + O` (editor) : class 찾기 
- `<command> + [` (editor) : 이전 위치로 이동 (Navigate -> Back)
- `<option> + space` (editor) : 해당 파일에 가지 않고 method, variable, class의 정의를 볼 수 있다. (Quick Definition)
- `<command> + E` (editor) : 최근 파일을 보여준다. (Recent Files)
- `<F1>` (editor) : Doc 즉시 보기 (Quick Document)
- `<F2>` (editor) : 오류난 곳으로 한 번에 이동 (Navigate -> Next Highlighted Error)
- `<F6>` (editor) : inner 클래스명에 커서를 두고 추출할 수 있다. (move)
- `<ctrl> + <shift> + <space>` (editor) : Class, parameter 등 smart 자동 완성 (Completion -> Start type)
- `(<ctrl> + <space>) x2` (editor) : AssertThat 자동 완성 (Completion -> basic)
- `<ctrl> + I` (editor) : override할 method들을 생성한다. (Implements Methods)
- `<option> + up` (editor) : visual 범위가 점점 늘어난다.
- `<shift> + <F6>` (editor) : Rename
- `<command> + <shift> + <F6>` (editor) : 메서드의 리턴 타입, 변수 타입 등을 변경 (Type migration)
- `<ctrl> + <option> + O` (editor) : Import 정리 
- `<command> + <F8>` (editor) : Toggle Line breakpoint
- `break point 우클릭 + condition 입력` : 해당 condition을 만족할 때 break가 걸린다.
- `Debug 모드 break 걸린 상황에서 <option> + <F8>` : break 걸린 상황에서 java code를 입력하여 실행해볼 수 있다. (Evaluate Expression)
- `<option> + <F12>` : terminal 창
 
## Live Template
- `<Command> + J` : Live Tempate 리스트 (Insert Live Template)
- `'sout' 입력 + <enter>` (editor window & .java file) : System.out.println() 자동 완성
- `'psvm' 입력 + <enter>` (editor window & .java file) : main method 자동 완성

## ideavim

- $HOME/.ideavimrc
- source ~/.ideavimrc : ideavimrc 새로고침
- plugin
  - [ideaVim-EasyMotion](https://github.com/AlexPl292/IdeaVim-EasyMotion)
    - 단어 단위로 쉽게 이동할 수 있다.
	- Setup
	  - Install [IdeaVim-EasyMotion](https://plugins.jetbrains.com/plugin/13360-ideavim-easymotion) 
	    and [AceJump](https://plugins.jetbrains.com/plugin/7086-acejump) plugins.
	  - `set easymotion` (.ideavimrc)
    - Emulates [vim-easymotion](https://github.com/easymotion/vim-easymotion)
    - [Commands](https://github.com/AlexPl292/IdeaVim-EasyMotion#supported-commands)
   	  - <ll>w : 커서 뒤에 있는 단어들
      - <ll>W : 커서 뒤에 있는 단어들
      - <ll>b : 커서 앞에 있는 단어들
      - <ll>B : 커서 앞에 있는 단어들
      - 참고)
        - <ll>은 mapleader를 두 번 입력한 것으로, 본인은 mapleader를 ','로 설정해놨다.
 
  - surround
    - 괄호와 따옴표 등을 추가, 변경 및 삭제할 수 있다.
    - Setup
      - `set surround` (.ideavimrc)
    - Emulates [vim-surround](https://github.com/tpope/vim-surround)
    - Commands
      - `ysiw"` : 해당 단어를 \"로 감싼다.
      - `ysi3w"` : 3개 단어를 묶어 \"로 감싼다.
      - `cs"'` : \"를 \'로 변경한다. (괄호도 된다)
      - `ds{` : \{ 괄호를 삭제한다. (\}로 해도 된다)
 
  - multiple-cursors
    - cursor가 여러 개 떠서 한 번에 변경이 가능하다(어떻게 사용하는지는 모르겠다).
    - Setup: `set multiple-cursors` (.ideavimrc)
    - Emulates [vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors)
    - Commands
      - `<A-n>`
      - `<A-x>`
      - `<A-p>`
      - `g<A-n>`
 
  - commentary
    - 주석 처리를 쉽게 하도록 도와준다(쓸모가 있는지 잘 모르겠다).
    - Setup
      - `set commentary` (.ideavimrc)
    - Emulates [commentary.vim](https://github.com/tpope/vim-commentary)
    - Commands
      - `gcc`
      - `gc + motion`
	  - `v_gc`
    - By [Daniel Leong](https://github.com/dhleong)
- 설정
  - method usage 보이기 : preference > Editor > Inlay Hints > Java > Code vision > [x] Usages

## plugins
- material
- lombok
 
 
## 설정
- `Enable Annotaion Processing` check
- `find action`에서 `optimize import on the fly current project` check
