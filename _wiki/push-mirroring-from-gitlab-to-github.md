---
layout    : wiki
title     : gitlab repo를 github repo에 미러링하기 
summary   : 
date      : 2021-06-01 10:41:08 +0900
updated   : 2021-06-01 15:24:38 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}
gitlab의 물 주기와 github의 잔디 심기가 각각 따로 되어 있으니 손해보는 느낌이 들었다. gitlab page를 사용하는 블로그 때문에 gitlab을 계속 써야되기 때문에 gitlab page repo를 github로 mirroring하여 물을 주면 잔디도 심어지게 해보려고 한다.

<br>
우선, [github/hoonti06.gitlab.io repo](https://github.com/hoonti06/hoonti06.gitlab.io )를 생성했다(hoonti06.github.io라고 지을까 살짝 고민했다).  

그다음 <https://docs.gitlab.com/ee/user/project/repository/repository_mirroring.html>의 'Setting up a push mirror from GitLab to GitHub'에 나와있는대로 github personal access token을 생성했다.  

![](/wiki-img/push-mirroring-from-gitlab-to-github/github-personal-access-token.png)  

<br>
gitlab/hoonti06.gitlab.io repo의 'Settings > Repository' 메뉴에 가서 mirroring repository에 생성한 github/hoonti06.gitlab.io repo의 주소인 `https://github.com/hoonti06/hoonti06.gitlab.io.git`을 입력하고, password에 위에서 생성했던 github personal access token을 입력했다. Mirror direction은 push로 설정하고 `Mirror repository` 버튼을 클릭하여 설정을 완료했다.  

![](/wiki-img/push-mirroring-from-gitlab-to-github/mirroring-repositories.png)  

<br>
`Update now` 버튼을 클릭했더니 다음과 같은 에러가 발생했다.  

![](/wiki-img/push-mirroring-from-gitlab-to-github/update-mirroring-error.png)  

> 13:close stream to gitaly-ruby: rpc error: code = Unknown desc = Gitlab::Git::CommandError: remote: No anonymous write access. fatal: Authentication failed for 'https://github.com/hoonti06/hoonti06.gitlab.io.git/'.  

<br>
이리저리 찾아보다가 [어떤 블로그](https://forum.gitlab.com/t/error-when-trying-to-push-mirror-gitlab-private-project-to-github-private-repo/45937/2 )에서 github의 username을 https:// 다음에 붙여줘야 한다는 것을 알게 되었다. [Gitlab docs](https://docs.gitlab.com/ee/user/project/repository/repository_mirroring.html )에서도 적혀 있었는데 내가 제대로 확인 못한 탓이었다.  

<br>
그래서 repo URL을 'https://github.com/hoonti06/hoonti06.gitlab.io.git' 에서 'https://hoonti06@github.com/hoonti06/hoonti06.gitlab.io.git' 으로 변경해주었더니 mirroring에 성공하였다.
![](/wiki-img/push-mirroring-from-gitlab-to-github/modified-mirroring-repositories-setting.png)
