---
layout    : wiki
title     : github, gitlab issue 사용법
summary   : 
date      : 2020-07-05 22:11:29 +0900
updated   : 2020-07-05 23:59:19 +0900
tag       : 
public    : true
published : true
parent    : etc
latex     : false
---

## 1. gitlab issue 사용법
1. issue를 등록한다.

2. 'Create merge request and branch'를 클릭한다. 해당 이슈를 대한 merge request와 remote branch(branch\_to\_solve\_issue)가 생성된다.

4. 생성된 remote branch와 연동할 local branch를 생성한다.
	1. git fetch origin
	2. git checkout -b {branch\_to\_solve\_issue} origin/{branch\_to\_solve\_issue}  
	
5. local branch에서 코드를 수정 및 추가하여 commit한다. (commit 개수는 상관없다.)

6. master와의 conflict를 해결한다.
	1. git fetch origin
	2. git pull origin master
	3. git checkout {branch\_to\_solve\_issue}
	4. git rebase master
	5. conflict 해결
	6. git rebase --continue
	7. git push origin {branch\_to\_solve\_issue}

7. 해당 이슈의 merge request에서 'Resolve WIP status'를 클릭하여 merge를 요청한다.

8. 관리자는 code review 후에 문제가 없다면 merge를 클릭한다.
	- merge에 대한 commit 메시지에 'close #{issue\_번호}'가 포함되어 issue가 자동으로 close 상태로 변한다.  
	(참고 : master의 commit 메시지에 'close #{issue\_번호}가 포함되면 close 상태로 변하게 되는 기능이 발현되는 것)
	- issue에 대한 remote branch는 merge하면서 자동 삭제할 수 있다.
	- issue에 대한 local branch는 알아서 삭제해야 한다.

## 2. github issue 사용법
1. issue를 등록한다.

2. issue 해결을 할 local branch를 생성한다.  
   git checkout -b origin/{base\_branch} origin/{branch\_to\_solve\_issue} (일반적으로, base\_branch는 master)

4. local branch에서 코드를 수정 및 추가하여 commit한다. (commit 개수는 상관없다.)

5. master와의 conflict를 해결한다.
	1. git fetch origin
	2. git pull origin {base\_branch}
	3. git checkout {branch\_to\_solve\_issue}
	4. git rebase {branch\_to\_solve\_issue}
	5. conflict 해결
	6. git rebase --continue
	7. git push origin {branch\_to\_solve\_issue}

6. Pull requests를 진행한다.
	1. 'New pull request'를 클릭한다.
	2. destination branch(base\_branch)와 source branch(branch\_to\_solve\_issue)를 선택한다.
	3. 'Create pull request'를 클릭한다.

7. 관리자는 code review 후에 문제가 없다면 merge를 클릭한다.
	- merge에 대한 commit 메시지에 'close #{issue\_번호}'가 포함되어 issue가 자동으로 close 상태로 변한다.  
	(참고 : master의 commit 메시지에 'close #{issue\_번호}가 포함되면 close 상태로 변하게 되는 기능이 발현되는 것)
	- issue에 대한 remote branch는 merge하면서 자동 삭제할 수 있다.

