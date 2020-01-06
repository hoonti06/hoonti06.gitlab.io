---
layout  : wiki
title   : vimwiki
summary : 
date    : 2019-07-24 00:14:19 +0900
updated : 2019-12-18 18:09:05 +0900
tag     : 
public  : true
parent  : vim
latex   : false
---

## 사용법

'hoonti06.gitlab.io' directory에서 vi를 실행한 후 `<LocalLeader>ww(<LocalLeader>='\')`를 하면 vimwiki의 index.md가 load된다.

`<leader>tm(<leader>=',')`으로 vim-table-mode의 table-mode를 toggle할 수 있다.

'run_Docker-Jekyll.sh'를 실행해서  local에서 page가 잘 나오는지 확인할 수 있다. ('_site' directory)
(우선, hoonti06/ruby-pandoc-node를 pull해야 한다.)

'build_Docker-Jekyll.sh'는 배포를 위해 build를 진행하는 shell script다.

'run_Docker-Jekyll.sh'나 'build_Docker-Jekyll.sh'을 한 번 수행하고 종료하면 docker container는 유지된다. 그럼 shell script 내부에서 수행하는 bundle 명령어를 그대로 입력하면 재 실행할 수 있다.

word에 enter를 입력하면 link(대괄호-중괄호)가 생성되는데, 이중 대괄호를 써야 blog page에서도 자동으로 link가 연결된다.
(johngrab.github.io에서 enter를 입력했을 때 이중 대괄호가 적용되도록 설정을 해놓았는데, 그렇게 설정을 해놓으면 vim에서 .md 파일인데도 filetype이 markdown으로 적용이 되지 않아 markdown형식의 highlight가 안 된다.)

generateData.js는 tag 관련 데이터를 생성해주는 shell script로, .gitlab-ci.yml에서 수행된다.

