---
layout    : wiki
title     : 스프링 웹 MVC
summary   : 
date      : 2020-02-10 12:16:49 +0900
updated   : 2020-02-11 09:08:29 +0900
tag       : Spring MVC Web inflearn
public    : true
published : true
parent    : 
latex     : false
---

## 1. Spring MVC 동작 원리

### 1.1 Spring MVC
- MVC
	- 모델(M)
		- 도메인 객체 또는 DTO로 화면에 전달하거나 화면으로부터 전달 받은 데이터를 담고 있는 객체
		- 평범한 자바 객체, POJO
	- 뷰(V)
		- 데이터를 보여주는 역할. 다양한 형태로 보여줄 수 있다. (HTML, JSON, XML, ...)
		- HTML, JSP, 타임리프, ...
	- 컨트롤러(C)
		- 사용자 입력을 받아 모델 객체의 데이터를 변경하거나 모델 객체를 뷰에 전달하는 역할
			- 입력값 검증
			- 입력 받은 데이터로 모델 객체 변경
			- 변경된 모델 객체를 뷰에 전달
		- 스프링 @MVC

```java
// EventController.java
@Controller
public class EventController {
	// == @RequestMapping(value="/events", method=RequestMethod.GET)
	@GetMapping("/events") // Since Spring 4.3
	public String events(Model model) {
		model.addAttribute("events", eventService.getEvents()); // key-value 형식 (map과 비슷)
		return "events"; // view의 이름
	}
}
// ###

// Event.java
@Getter @Setter // lombok annotation
@Builder @NoArgsConstructor @AllargsConstructor // lombok annotation
public class Event {
	private String name;
	private int limitOfEnrollment;
	private LocalDateTime startDateTime;
	private LocalDateTime endDateTime;
}
// ###

// EventService.java
@Service
public class EventService {

	public List<Event> getEvents(Model model) {
		Event event1 = Event.builer()
				.name("1. Spring boot 스터디")
				.limitOfEnrollment(5)
				.StartDateTime(LocalDateTime.of(2020, 2, 2, 19, 00))
				.endDateTime(LocalDateTime.of(2020, 2, 2, 21, 00))
				.build();
		
		Event event2 = Event.builer()
				.name("2. Spring MVC 스터디")
				.limitOfEnrollment(10)
				.StartDateTime(LocalDateTime.of(2020, 2, 10, 22, 00))
				.endDateTime(LocalDateTime.of(2020, 2, 10, 23, 30))
				.build();
				
		return List.of(event1, event2);
	}
}
// ###
```  
<br>
```html
// events.html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="UTF-8">
	<title>Title</title>
</head>
<body>
	<h1>이벤트 목록</h1>
	<table>
		<tr>
			<th>이름</th>
			<th>참가 인원</th>
			<th>시작</th>
			<th>종료</th>
		</tr>
		<tr th:each="event: ${events}">
			<th th:text="${event.name}">event N</th>
			<th th:text="${event.limitOfEnrollment}">M</th>
			<th th:text="${event.startDateTime}">yyyy/MM/dd hh:mm</th>
			<th th:text="${event.endDateTime}">yyyy/MM/dd hh:mm</th>
		</tr>
	</table>
</body>
</html>
```

- MVC 패턴의 장점
	- 동시 다발적(Simultaneous) 개발 : 백엔드 개발자와 프론트엔드 개발자가 독립적으로 개발을 진행할 수 있다.
	- 높은 결합도 : 논리적으로 관련 있는 기능을 하나의 컨트롤러로 묶거나, 특정 모델과 관련 있는 뷰를 그룹화할 수 있다.
	- 낮은 의존도(loosely coupled) : 뷰, 모델, 컨트롤러는 각각 독립적이다.
	- 개발 용이성 : 책임이 구분되어 있어 코드 수정하는 것이 편하다.
	- 한 모델에 대한 여러 형태의 뷰를 가질 수 있다.  
	  <br>
- MVC 패턴의 단점
	- 코드 네비게이션이 복잡함.(여러 군데의 코드를 확인하면서 파악하는 것이 어려움)
	- 코드 일관성 유지에 노력이 필요함.
	- 높은 학습 곡선  
	  <br><br>

- 참고)
	- [Model-View-Controller - 위키피디아](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
	- [Thymeleaf Document](https://www.thymeleaf.org/doc/tutorials/2.1/usingthymeleaf.html)


###1.2 Servlet

- 서블릿(Servlet)
	- Java EE는 Web Application 개발용 spec과 API를 제공. 
		- 제공하는 클래스 중 가장 중요한 것 중 하나가 HttpServlet
	- 요청당 Thread (만들거나, **Pool에서 가져다가**) 사용 (한 프로세스의 자원을 공유하는 Thread를 만들어서)
- 서블릿 등장 이전에 사용하던 기술인 CGI(Common Gateway Interface)
	- 요청당 프로세스를 만들어 사용
- 서블릿의 장점 (CGI에 비해)
	- 빠르다
	- 플랫폼 독립적
	- 보안
	- 이식성
- 서블릿 엔진 또는 서블릿 컨테이너 (톰캣, 제티, 언더토, ...)
	- 서블릿 스펙을 준수하여 
	- 초기화, 실행, 사용 등의 서블릿 라이프 사이클을 관리
	- 서블릿 애플리케이션은 우리가 직접 실행할 수 없고, 서블릿 컨테이너가 실행할 수 있다.
- 서블릿의 생명주기
	- 서블릿 컨테이너가 서블릿 인스턴스의 init() 
```java
public class HelloServlet extends HttpServlet {
	@Override

	init()
	
	doGet() {
	}

}

```



## 내용 출처
[inflearn - '스프링 웹 MVC(백기선)' 강의 및 강의 노트](https://www.inflearn.com/course/%EC%9B%B9-mvc#)


## footnotes
[^1]: spring-boot-autoconfigure/META-INF/spring.factories
