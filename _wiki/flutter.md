---
layout    : wiki
title     : 
summary   : 
date      : 2020-09-03 03:06:28 +0900
updated   : 2021-01-04 10:10:52 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

- Barcode_scan을 쓰려면 최소 18 버전 이상이어야 했고, android/app/src/build.gradle의 minSdkVersion
이 16으로 되어 있어서 18로 올렸다.

- https://github.com/madewithfelt/flutter_layout_grid
  - layout_grid
- https://github.com/flutter/flutter/pull/56409
  - interactiveViewer Widget example
- https://stackoverflow.com/questions/53717521/flutter-grid-view-is-not-scrolling
  - gridview scroll
- https://api.flutter.dev/flutter/widgets/InteractiveViewer-class.html
  - interactiveView class
- https://pub.dev/packages/extended_image
  - LIVE 이미지할 때 쓰면 좋을듯
- https://pub.dev/packages/diagonal_scrollview/example
  - CGV 같이 빨간 박스로 표시하는 거 예제

- InteractiveView의 onInteractionUpdate listener가 현재 손가락의 위치가 widget의 전체 사이즈에서  어느 위치인지 좌표로 갖고 있는 듯 하다.

- https://medium.com/@alexander.arendar/dragging-zooming-and-placing-object-on-indoor-map-with-flutter-67667ef415ec

- https://api.flutter.dev/flutter/widgets/InteractiveViewer/transformationController.html
  - 이 예제로 interactiveView의 child를 가운데 놓을 수도 있고, 좌표도 구할 수도 있을 것 같다.
 
- https://flutteragency.com/interactiveviewer-widget/
  - interactiveViewer 예제

- https://brunch.co.kr/@mystoryg/123
  - private, public이 따로 없어서 private의 경우 이름 맨 앞에 underscore(_)를 추가한다. _function()
 
- Row나 Column은 screen 범위를 넘어가면 안 된다. screen 범위를 넘어가기를 원하면 listview를 써야 한다.
	- Expand class
	  - Row, Column과 같은 screen이라는 최대 범위를 가지는 class의 children에서 Expand class로 screen을 꽉 채울 수 있다.
 
- Screen Size
  ```dart
  height: (MediaQuery.of(context).size.height),
  width: (MediaQuery.of(context).size.width),
  ```
- https://dalgonakit.tistory.com/103
  - scaffold 설명

- https://brunch.co.kr/@mystoryg/123
  - flutter 생성자
 
 
- list to map
  - new Map.fromIterable(list, key: (v) => v, value: (v) => list.indexOf(v));

- testEditingController는 dispose가 필요하다.
 
- 개발
  - 평면도
    - 평면도의 bottom을 입구가 있도록?
    - 예약
	  - refresh
    - 층(floor)
	- table
	  - 인원수
	  - ID
	  - 등급
		- priority
	    - 조절이 필요하다면?
	- 상단 네이게이터
	  - 테이블 하나를 픽셀 하나로 표현? (like CGV)
	  - 움직일 때마다 매번 ratio로 나누기? (성능?)
    - 하단의 예약 버튼 등의 네비게이터
	  - 고정으로 해두고, 계속 노출되도록
	  - 테이블 클릭을 해야 버튼 활성화되도록 

- 브레인스토밍
  - 게시글이 다음날이면 필요 없는거 아닌가? (일회성)
  - 한 클럽의 여러 MD가 올릴건데 그 중 어떤 걸 채택해야 하나?
    - 무조건 많이 올리는 클럽이 유리한 게 아닌가?
	- 아니면 내가 select한 MD의 것만 올라오는건가?
	- 클럽에 따른 게시글을 하나로 모아서 보여주면 좋으려나
  - 그 나라의 클럽을 인식하는 방법
  - Hot한 클럽은 그날그날 바뀌는건지
  - 소위 물 좋은 클럽은 어떻게 알 수 있는지
  - 클럽 추천
    - GPS
	  - 가까운 거리
	  - 최적화
	    - 나라, 지역 등으로 filtering?
	- 사람 많은 곳
	  - 이게 중요한 부분인지?
	  - OR 물 좋은 곳(예쁘고 잘생긴)이 중요한지
      - 사람 많은 곳 어떻게 판단?
	    - 클럽 팔찌? 밴드?
    - 라이브 영상
	  - 가능한건지?
	    - 심한 노출 등의 자극적인 경우는?
		- 틱톡과 같은 짧은 영상? 
		  - 시간, 로고 워터 마크
		    - 맨 앞에 잠깐?
		- 용량(데이터) == 돈 -> 저장
	- 라이브 이미지
	  - 예전 사진 쓸 수도 있음
	    - 그 자리에서 찍은 사진만 업로드할 수 있도록
		- 시간, 로고 워터 마크
	  - 심한 노출 등의 자극적인 경우는?
	    - AI 같은걸로 filtering 할 수 있으려나..?

- keytool -exportcert -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore
  - default password : android
