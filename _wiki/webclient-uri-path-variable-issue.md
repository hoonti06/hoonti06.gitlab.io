---
layout    : wiki
title     : WebClient uri의 path variable 이슈
summary   : 
date      : 2021-12-01 22:44:59 +0900
updated   : 2021-12-04 09:01:36 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

## 시작

WebClient를 활용하여 Github 특정 repository의 특정 경로에 README.md 파일을 생성하기 위해 Github API를 호출하려는 데 다음과 같은 에러가 발생하였고 이를 해결하고자 했다.  
![]( /wiki-img/webclient-uri-path-variable-issue/145489456-99580c8f-488b-46ef-9702-8ac755b8e86e.png )

## 과정

다음 코드를 실행했을 때 문제가 발생하였다. 
```java linenos
RepoContent repoContents = githubApiClient.put()
	.uri("/repos/{userName}/{repoName}/contents/{dirPath}/README.md", 
		userName, repoName, dirPath);
```

<br>
breakpoint를 통해 확인해보니 dirPath의 값이 length가 0인 empty string 일때 발생했다(이미지에서 `contents//README.md`를 확인할 수 있다).
![]( /wiki-img/webclient-uri-path-variable-issue/145489415-7e9cd2f6-a3dc-425a-a12b-1e849abc2c4b.png )

<br>
하지만, curl 명령어를 통해 breakpoint에서 찍혀있는 uri 그대로 API 호출을 해보면 정상적으로 README.md가 생성된다.
```sh
curl -X PUT -H "Accept: application/vnd.github.v3+json"
"https://api.github.com/repos/hoonti06/test10/contents//README.md" \
-d '{"message":"commit message", "content":"new file content"}'
```

<br>
다음과 같이 String.format을 통해 미리 uri를 만들어 놓고 그 값을 첫 번째 parameter로 전달했더니 에러가 발생하지 않았다  
(breakpoint로 확인해봤을 때, 아래 코드에서 생성된 uri와 에러 발생 당시 코드에서 생성된 uri에 차이가 없어 정확한 원인은 파악하지 못했다).
```java linenos
// dirPath가 root("")일 경우를 위해 String.format() 사용
String uri = String
.format("/repos/%s/%s/contents/%s/README.md", user.getName(), repoName, dirPath);

RepoContent repoContents = githubApiClient.put()
	.uri(uri)
```

그렇게 해결되는 듯 했으나 또 다른 문제가 발생했다.

<br>
이번 문제는 dirPath에 띄어쓰기나 !,@ 등의 특수문자가 포함되어 있을 때 발생했다.  

<br>
String.format()의 경우 특수문자를 encoding해주지 않지만, uri() 메서드의 parameter로 전달되는 값들은 encoding을 해주기 때문에 
다시 다음의 코드가 제대로 동작한다.
```java linenos
RepoContent repoContents = githubApiClient.put()
	.uri("/repos/{userName}/{repoName}/contents/{dirPath}/README.md", 
		userName, repoName, dirPath);
```

<br>
그래서 오버로딩되어 있는 다른 uri 메서드를 활용하였다. Map변수를 parameter로 전달할 수 있는데, 이때, dirPath가 empty string일 경우 Map에 insert하지 않도록 하였다.
```java linenos
StringBuilder uri = new StringBuilder("/repos/{userName}/{repoName}/contents");

Map<String, String> uriPathVariables = new HashMap<>();
uriPathVariables.put("userName", user.getName());
uriPathVariables.put("repoName", repoName);
if (dirPath != null && !dirPath.equals("")) {
	uri.append("/{dirPath}");
	uriPathVariables.put("dirPath", dirPath);
}

uri.append("/README.md");

RepoContent repoContents = githubApiClient.put()
	.uri(uri.toString(), uriPathVariables)
```

## 마무리
- 여러 번 수정하는 일이 없도록 처음부터 좀 더 많은 경우를 고려하여 코드를 작성해야겠다.  
- 오버로딩되어 있는 메서드를 적절히 사용해보았던 경험이 되었다.
- uri 메서드의 parameter로 empty string이 전달되었을 때 왜 제대로 동작하지 않는건지 다시 확인해봐야겠다.

