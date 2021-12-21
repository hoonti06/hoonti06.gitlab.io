---
layout    : wiki
title     : WebClient uri의 path variable 이슈
summary   : 
date      : 2021-12-01 22:44:59 +0900
updated   : 2021-12-21 20:40:34 +0900
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
```java
RequestBodySpec spec = githubApiClient.put()
	.uri("/repos/{userName}/{repoName}/contents/{dirPath}/README.md", 
		userName, repoName, dirPath);
```

<br>
breakpoint를 통해 확인해보니 dirPath의 값이 length가 0인 empty string 일때 발생했다(이미지에서 `contents//README.md`를 확인할 수 있다).
![]( /wiki-img/webclient-uri-path-variable-issue/145489415-7e9cd2f6-a3dc-425a-a12b-1e849abc2c4b.png )

<br>
curl 명령어를 통해서도 breakpoint에서 찍혀있는 uri 그대로 API 호출을 해보았다.
```sh
curl -X PUT -H "Accept: application/vnd.github.v3+json" \
-H "Authorization: token gho_1q2w3e4r1q2w3e4r1q2w3e4r" \
"https://api.github.com/repos/hoonti06/test10/contents//README.md" \
-d '{"message":"commit message", "content":"Y29udGVudHM="}' 

# 참고 : content는 base64 형식이어야 한다.
```

<br>
동일하게 다음과 같은 에러를 응답 받을 수 있었다.
```json
{
  "message": "path cannot start with a slash",
  "errors": [
    {
      "resource": "Commit",
      "field": "path",
      "code": "invalid"
    }
  ],
  "documentation_url": "https://docs.github.com/rest/reference/repos#create-or-update-file-contents"
}
```

<br>
위 코드를 debugging 해봤더니 uri가 완성되기 전에 연속된 slash(//)를 하나의 slash로 변환해주는 sanitize를 수행하게 되어 결국 완성된 uri에 있는 연속 slash는 제거가 안 됐던 것이다.  
![]( /wiki-img/webclient-uri-path-variable-issue/146988072-eafd2502-8ec2-40ac-9a81-dc4bbb7ed662.png )

<br>
그래서 String.format을 통해 미리 uri를 완성해놓고 그 값을 첫 번째 parameter로 전달했다.
```java
// dirPath가 root("")일 경우를 위해 String.format() 사용
String uri = String
.format("/repos/%s/%s/contents/%s/README.md", user.getName(), repoName, dirPath);

RequestBodySpec spec = githubApiClient.put()
	.uri(uri);
```

<br>
위 코드를 debugging 해보니 sanitize를 통해 slash가 하나로 변환되었다.  
![]( /wiki-img/webclient-uri-path-variable-issue/146987873-ce4dcbc5-39b6-46d1-8810-b3f0947d91c2.png )

<br>
그래서 String.format을 적용하여 해결되는 듯 했으나 또 다른 문제가 발생했다. 이번 문제는 dirPath에 띄어쓰기나 !,@ 등의 특수문자가 포함되어 있을 때 발생했다.  

<br>
String.format()의 경우 특수문자를 encoding해주지 않지만, uri() 메서드의 parameter로 전달되는 값들은 encoding을 해주기 때문에 
첫 번째 코드가 제대로 동작한다.
```java
RequestBodySpec spec = githubApiClient.put()
	.uri("/repos/{userName}/{repoName}/contents/{dirPath}/README.md", 
		userName, repoName, dirPath);
```

<br>
그래서 오버로딩되어 있는 다른 uri 메서드를 활용하였다. Map 변수를 parameter로 전달할 수 있는데, 이때, dirPath가 empty string일 경우 Map에 insert하지 않도록 하였다.
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

RequestBodySpec spec = githubApiClient.put()
	.uri(uri.toString(), uriPathVariables);
```

## 마무리
- 여러 번 수정하는 일이 없도록 처음부터 좀 더 많은 경우를 고려하여 코드를 작성해야겠다.  
- 오버로딩되어 있는 메서드를 적절히 사용해보았던 경험이 되었다.
- 단순 library 사용에 그치는게 아닌, 직접 dubugging을 통해 코드가 어떻게 진행되는지 확인해 본 좋은 경험이었다.

