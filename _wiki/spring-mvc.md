---
layout    : wiki
title     : 스프링 웹 MVC
summary   : 
date      : 2020-02-10 12:16:49 +0900
updated   : 2020-02-20 23:45:39 +0900
tag       : spring mvc web inflearn
public    : true
published : true
parent    : [[]]
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


### 1.2 Servlet

- 서블릿(Servlet)
	- Java EE는 Web Application 개발용 spec과 API를 제공. 
		- 제공하는 클래스 중 가장 중요한 것 중 하나가 HttpServlet
	- 요청당 Thread (만들거나, **Pool에서 가져다가**) 사용 (한 프로세스의 자원을 공유하는 Thread를 만들어서)
 
- 서블릿 등장 이전에 사용하던 기술인 CGI(Common Gateway Interface)
	- 요청당 프로세스를 만들어 사용
	- 
- 서블릿의 장점 (CGI에 비해)
	- 빠르다
	- 플랫폼 독립적
	- 보안
	- 이식성

- 서블릿 엔진 또는 서블릿 컨테이너 (톰캣, 제티, 언더토, ...)
	- 서블릿 스펙을 준수하여 
	- 초기화, 실행, 사용 등의 서블릿 라이프 사이클을 관리
	- 서블릿 애플리케이션은 우리가 직접 실행할 수 없고, 서블릿 컨테이너가 실행할 수 있다.
	- 세션 관리, 네트워크 서비스 MIME 기반 메시지 인코딩 디코딩

- 서블릿의 생명주기
	- 서블릿 컨테이너가 서블릿 인스턴스의 init() 메소드를 호출하여 초기화한다.
		- 최초 요청을 받았을 때 초기화를 한 번 하고 나면 그 다음 요청부터는 이 과정을 생략한다.
	- 서블릿이 초기화된 다음부터 클라이언트의 요청을 처리할 수 있다. 각 요청은 별도의 쓰레드로 처리하고 이때 서블릿 인스턴스의 service() 메소드를 호출한다.
		- 이 안에서 HTTP 요청을 받고 클라이언트로 보낼 HTTP 응답을 만든다.
		- service()는 보통 HTTP Method에 따라 doGet(), doPost() 등으로 처리를 위임한다.
		- 따라서 보통 doGet() 또는 doPost()를 구현한다.
	- 서블릿 컨테이너 판단에 따라 해당 서블릿을 메모리에서 내려야 할 시점에 destroy()를 호출한다.

```java
// src/main/java/me.hoonti06/HelloServlet.java
public class HelloServlet extends HttpServlet {
	@Override
	public void init() throws ServletException {
		System.out.println("init");
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("doGet");
		resp.getWriter().write("<html>");
		resp.getWriter().write("<head>");
		resp.getWriter().write("<body>");
		resp.getWriter().write("<h1>Hello Servlet</h1>");
		resp.getWriter().write("</body>");
		resp.getWriter().write("</head>");
		resp.getWriter().write("</html>");
	}

	@Override
	public void destory() {
		System.out.println("destory");
	}
}


```  
<br>
```xml
<!-- src/main/webapp/WEB-INF/web.xml -->
<web-app>
	<display-name>web app</display-name>
	
	<servlet>
		<servlet-name>hello</servlet-name>
		<servlet-class>me.hoonti06.HelloServlet</servlet-class>
	</servlet>

	<servlet-mapping>
		<servlet-name>hello</servlet-name>
		<url-pattern>/hello</url-pattern>
	</servlet-mapping>
</web-app>
```  
<br>
```xml
<dependency>
	<groupId>javax.servlet</groupId>
	<artifactId>javax.servlet-api</artifactId>
	<version>4.0.1</version>
	<scope>provided</scope> 
</dependency>
```


- 참고)
	- maven 의존성 scope
		- compile : Default scope, 모든 상황에서 의존성이 포함된다.
		- provided : 서블릿 컨테이너에서 기본 제공되어 마지막 패지킹할 때 해당 의존성이 포함되지 않는다.
		- runtime : 런타임 및 테스트 시 classpath에 포함되지만, 컴파일 시에는 포함되지 않음
		- test : 테스트시에만 사용
		- system
		- import
	- Servlet application
		- application context를 '/'(root)로 설정한다.
		- war_exploded : war를 푼 상태로 배포(Deployment)하는 방법

### 1.3 Servlet Listener and Filter

- 서블릿 리스터
	- 웹 애플리케이션에서 발생하는 주요 이벤트를 감지하고 각 이벤트에 특별한 작업이 필요한 경우에 사용할 수 있다.
		- 서블릿 컨텍스트 수준의 이벤트
			- 컨텍스트 라이프사이클 이벤트
			- 컨텍스트 애트리뷰트 변경 이벤트
		- 세션 수준의 이벤트
			- 세션 라이프사이클 이벤트
			- 세션 애트리뷰트 변경 이벤트
- 서블릿 필터
	- 틀어온 요청을 서블릿으로 보내고, 또 서블릿이 작성한 응답을 클라이언트로 보내기 전에 특별한 처리가 필요한 경우에 사용할 수 있다.
	- 체인 형태의 구조  

{% ditaa -T -E %}
      +---------------------+
      |cBLU                 |
      |  Servlet Container  |
      |                     |
      +---+-----------------+
          |            ^
          |            |
        +-+------------|-+
        | |  Filter A  | |
        +-|------------+-+
          |            |
   request|            |responce
          |            |
        +-+------------|-+
        | |  Filter B  | |
        +-|------------+-+
          |            |
          v            |
      +----------------+---+
      |cPNK                |
      |       Servlet      |
      |                    |
      +--------------------+
{% endditaa %}		


### 1.4 DispatcherServlet
#### 1.4.1 DispatcherServlet
![이미지 출처 : [https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc
](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc)](/wiki-img/Spring-MVC/DispatcherServlet.png)  

<br>

- 서블릿 애플리케이션에 스프링 연동하기  
  <br>
	- 서블릿에서 스프링이 제공하는 IoC 컨테이너를 활용하는 방법
		- ContextLoaderListener  

			```xml
			<web-app>
				<display-name>Demo Web App</display-name>

				<context-param>
					<param-name>contextClass</param-name>
					<param-value>org.springframework.web.conetext.support.AnnotationConfigWebApplicationContext</param-value>
				</context-param>

				<context-param>
					<param-name>contextConfigLocation</param-name>
					<param-value>me.hoonti06.AppConfig</param-value>
				</context-param>

				<listener>
					<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
				</listener>
				.
				.
				.
			<web-app>
			```
			root WebApplicationContext의 빈은 me.hoonti06.AppConfig.class에서 등록된다.
			- 서블릿 리스너의 구현체
			- ApplicationContext를 만들어준다. (Spring 설정 파일이 필요하다.)
			- ApplicationContext를 ServletContext 라이프사이클에 따라 등록하고 소멸시켜준다.
			- 서블릿에서 IoC 컨테이너를 ServletContext를 통해 꺼내 사용할 수 있다.  
			  <br>
	- 스프링이 제공하는 서블릿 구현체 DispatcherServlet 사용하기
		- DispatcherServlet  

			```xml
			<web-app>
				.
				.
				.
				<servlet>
					<servlet-name>app</servlet-name>
					<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
					<init-param>
						<param-name>contextClass</param-name>
						<param-value>org.springframework.web.conetext.support.AnnotationConfigWebApplicationContext</param-value>
					</init-param>
					<init-param>
						<param-name>contextConfigLocation</param-name>
						<param-value>me.hoonti06.WebConfig</param-value>
					</init-param>
				</servlet>

				<servlet-mapping>
					<servlet-name>app</servlet-name>
					<url-pattern>/app/*</url-pattern>
				</servlet-mapping>
			</web-app>
			```  
			Servlet WebApplicationContext의 빈은 me.hoonti06.webConfig.class에서 등록된다.
			app/* 요청은 모두 DispatcherServlet으로 들어간다.


		- 스프링 MVC의 핵심
		- Front Controller의 역할 (Front Controller 참고 : 
		                          [자료1](http://www.corej2eepatterns.com/FrontController.htm), 
								  [자료2](https://www.oracle.com/technetwork/java/frontcontroller-135648.html),
								  [자료3](https://martinfowler.com/eaaCatalog/frontController.html))

- 참고)
	- 의존성 'org.springframework::spring-webmvc'
	- Listener 'org.springframework.web.context.ContextLoaderListener'
		- Servlet 컨텍스트의 라이프 사이클에 맞춰 Spring이 제공해주는 애플리케이션 컨텍스트를 연동해준다.
	- Spring boot를 쓰지 않고 Spring만 쓰게 되면 의존성을 추가할 때 버전을 다 명시해주어야 한다.
	- ServletContext : 모든 Sevlet이 사용할 수 있는 공용 저장소
	- Dispatch : 분배하다.
	- Root WebApplicationContext는 다른 Context에서 사용할 수 있으나, DispatcherServlet 의 applicationContext는 DispatcherServlet 안에서만 사용할 수 있다. 
	- 여러 DispatcherServlet에서 특정 빈을 공용으로 쓸 수 있게 하기 위해 Servlet Webapplication과 Root WebApplicationContext를 상속 관계로 만들었다.
	- Root WebApplicationContext에는 주로 web과 관련된 빈은 등록되지 않고, 공용으로 쓸 수 있는 Service나 Repository를 빈으로 등록한다.
	- WebApplicationContext는 해당 DispatchServlet에 한정된 빈들을 등록한다.
	- Root WebApplicationContext  

		```java
		@ComponentScan(excludeFilters = @ComponentScan.Filter(Controller.class))
		public class AppConfig {
		}
		```
	- Servlet WebApplicationContext  

		```java
		@ComponentScan(useDefaultFilters = false, includeFilters = @ComponentScan.Filter(Controller.class))
		public class WebConfig {
		}
		```

	- 하지만 최근에는 대부분 상속 관계를 가지지 않고 DispatcherServlet 하나만 등록하여 해당 Servlet WebApplicationContext에 모든 빈을 등록한다.
	- Spring vs Spring boot
		- servlet container(tomcat, netty 등)가 먼저 뜨고, 그 안에 등록되는 servlet Application에다가 spring을 연동하는 방법이다. => servlet container 안에 spring이 들어가 있는 형태
		- spring boot의 경우 spring boot application(java app)이 먼저 뜨고, 내장되어 있는 Tomcat이 뜨게 된다. boot가 내장 Tomcat에 DispatcherServlet을 코드로 등록한다. => spring boot application(java app) 안에 tomcat이 들어가 있는 형태


#### 1.4.2 동작 원리

- DispatcherServlet 초기화
	- 다음의 특별한 타입의 빈들을 찾거나, 기본 전력에 해당하는 빈들을 등록한다.
	- HandlerMapping : 핸들러를 찾아주는 인터페이스 (strategy pattern)
	- HandlerAdapter : 핸들러를 실행하는 인터페이스 (strategy pattern)
	- HandlerExceptionResolver
	- ViewResolver : resource(view) 이름에 해당하는 resource(view)를 찾아 변환해준다.
	  <br>
- DispatcherServlet 동작 순서 (doDispatch())
	1. 요청을 분석한다. (locale, theme, multipart(file upload))
	2. (HandlerMapping에게 위임하여) 요청을 처리할 핸들러를 찾는다. (getHandler())
	3. (등록되어 있는 HandlerAdapter 중에) 해당 핸들러를 실행할 수 있는 "HandlerAdapter"를 찾는다. (getHandlerAdapter())
	4. 찾아낸 "핸들러 어댑터"를 사용해서 핸들러의 응답을 처리한다. (handle())
		- 핸들러의 리턴값을 보고 어떻게 처리할지 판단한다.
			- 뷰 이름에 해당하는 뷰를 찾아서 모델 데이터를 랜더링한다.
			- @RepsonseEntity가 있다면 converter를 사용해서 응답 본문(response body)을 만든다. 그리고, mv(modelAndView는 null이 된다.)
	5. (부가적으로) 예외가 발생했다면, 예외 처리 핸들러에 요청 처리를 위임한다.
	6. 최종적으로 응답을 보낸다.

- @ResponseBody
	- HandlerMapping : RequestMappingHandlerMapping (annotation 기반의 요청)
	- HandlerAdapter : RequestMappingHandlerAdapter  
	  
	  ```java
	  // @RestController
	  @Controller
	  public class HelloController {
	  
	  	@Autowired
		HelloService helloService;
		
		@GetMapping("/hello")
		@ReponseBody
		public String hello() {
			return "Hello, " + helloService.getName();
		}
		
		@GetMapping("/bye")
		public String bye() {
			return "/WEB-INF/bye.jsp";
		}
	  }
	  ```  
	  hello()의 경우 return값을 response body로 넣는다. mv(modelAndView)가 null이다.
	  bye()의 경우 return값으로 resource(view)의 경로를 넘겨주어 해당 view를 response body로 넣는다.
	  
	
- Controller 구현체
	- HandlerMapping : BeanNameUrlHandlerMapping
	- HandlerAdapter : SimpleControllerHandlerAapter  
	  
		```java
		@org.springframework.stereotype.Controller("/thanks")
		public class SimpleController implements Controller {
			@Override
			public ModelAndView handleRequest(HttpServletRequest request, 
											  HttpServletResponse response) 
											  		throws Exception {
				return new ModelAndView("/WEB-INF/thanks.jsp");
			}
		}
		```

- 커스텀 ViewResolver
	- ViewResolver
		- InternalResourceViewResolver
			- Prefix
			- Suffix

```java
@Configuration
@ComponentScan
public class WebConfig {
	@Bean
	public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setPrefix("/WEB-INF/");
		viewResolver.setSuffix(".jsp");
		return viewResolver;
	}
}
```
```java
@org.springframework.stereotype.Controller ("/thanks")
public class SimpleController implements Controller {
	@Override
		public ModelAndView handleRequest(HttpServletRequest request, 
										  HttpServletResponse response) 
										  		throws Exception {
		return new ModelAndView("thanks");
	}
}
```  


- 참고)
	- DispatcherServlet에는 beanNameUrlHandlerMapping, requestmMappingHandlerMapping이 기본으로 등록되어 있다.
	- class에 @RestController를 선언하면, 해당 class 안에 있는 모든 메소드에 @ResponseBody를 선언한 형태와 같다.
	- mv(modelAndView)가 null이 아니면 mapping된 jsp를 response body에 넣는다.  
	  

### 1.5 스프링 MVC 구성 요소  

{% ditaa -T -E %}
+---------------------------------+
| DispatcherServlet               |
| +-----------------------------+ |
| |      MultipartResolver      | |
| +-----------------------------+ |
| |       LocaleResolver        | |
| +-----------------------------+ |
| |        ThemeResolver        | |
| +-----------------------------+ |
| |       *HandlerMapping       | |
| +-----------------------------+ |
| |       *HandlerAdapter       | |
| +-----------------------------+ |
| | *HandlerExceptionResolvers  | |
| +-----------------------------+ |
| | RequestToViewnameTranslator | |
| +-----------------------------+ |
| |       *ViewResolvers        | |
| +-----------------------------+ |
| |       FlashMapManager       | |
| +-----------------------------+ |
+---------------------------------+
{% endditaa %}

- DispatcherServlet의 기본 전략
	- DispatcherServlet.properties
- MultipartResolver
	- 파일 업로드 요청 처리에 필요한 인터페이스 
	- HttpServletRequest를 MultipartHttpServletRequest로 변환해주어 요청이 담고 있는 File을 꺼낼 수 있는 API 제공. 
- LocaleResolver 
	- 클라이언트의 위치(Locale) 정보를 파악하는 인터페이스 
	- 기본 전략은 요청의 accept-language를 보고 판단. 
- ThemeResolver 
	- 애플리케이션에 설정된 테마를 파악하고  변경할 수 있는 인터페이스 
	- 참고: [https://memorynotfound.com/spring-mvc-theme-switcher-example/](https://memorynotfound.com/spring-mvc-theme-switcher-example/)
- HandlerMapping 
	- 요청을 처리할 핸들러를 찾는 인터페이스 
- HandlerAdapter 
	- HandlerMapping이 찾아낸 "핸들러"를 처리하는 인터페이스 
	- 스프링 MVC 확장력의 핵심 
- HandlerExceptionResolver 
	- 요청 처리 중에 발생한 에러를 처리하는 인터페이스 
- RequestToViewNameTranslator 
	- 핸들러에서 뷰 이름을 명시적으로 리턴하지 않은 경우, 요청을 기반으로 뷰 이름을 판단하는 인터페이스 
- ViewResolver 
	- 뷰 이름(string)에 해당하는 뷰를 찾아내는 인터페이스 
- FlashMapManager 
	- FlashMap 인스턴스를 가져오고 저장하는 인터페이스 
	- FlashMap은 주로 리다이렉션을 사용할 때 요청 매개변수를 사용하지 않고 데이터를 전달하고 정리할 때 사용한다. 
	- redirect:/events 

### 1.6 정리 

- DispatcherServlet : 결국엔 서블릿(하지만 굉장히 복잡한)

- DispatcherServlet 초기화
	1. 특정 타입에 해당하는 빈을 찾는다.
	2. 없으면 기본 전략을 사용한다. (DispatcherServlet.properties에 명시되어 있는 것들로)

- 스프링 부트를 사용하지 않는 스프링 MVC
	- 서블릿 컨테이너(ex 톰캣)에 등록한 웹 애플리케이션(WAR)에 DispatcherServlet을 등록한다.
		- web.xml에 서블릿 등록
			- spring-web-mvc을 등록하면 dispatcherservlet을 쓸 수 있게 된다.
		- 또는 WebApplicationInitializer에 자바 코드로 서블릿 등록 (스프링 3.1+, 서블릿 3.0+)
			```java
			public class WebApplication implements WebApplicationInitializer {
				@override
				public void onStartup(ServletContext servletContext) throws ServletException {
					AnnotationConfigApplicationContext context 
											= new AnnotationConfigApplicationContext();
					context.register(WebConfig.class);
					context.refresh();
					
					DispatcherServlet dispatcherServlet = new DispatcherServlet(context);
					ServletRegistration.Dynamic app = servletContext.addServet("app", dispatcherServlet);
					app.addMappnig("/app/*");
				}
			}
			```
	- 세부 구성 요소는 빈 설정하기 나름
- 스프링 부트를 사용하는 스프링 MVC
	- 자바 애플리케이션에 내아 톰캣을 만들고 그 안에 DispatcherServlet을 등록한다.
		- 스프링 부트 자동 설정이 자동으로 해준다.
	- 스프링 부트의 주관에 따라 여러 인터페이스 구현체를 빈으로 미리 등록한다.
	- 웬만한건 다 설정이 되어 있다.







{% ditaa -T %}
+----------------------------------+
|Spring Application                |
|                                  |
|  +-----------------------------+ |
|  |     Spring IoC Container    | |
|  +-----------------------------+ |
|                 ^                |
|  +--------------|--------------+ |
|  |              |              | |
|  |     +--------+--------+     | |
|  |     |DispatcherServlet|     | |
|  |     +-----------------+     | |
|  |                             | |
|  |Embedded Tomcat              | |
|  +-------------+---------------+ |
+----------------------------------+
{% endditaa %}  


## 내용 출처
[inflearn - '스프링 웹 MVC(백기선)' 강의 및 강의 노트](https://www.inflearn.com/course/%EC%9B%B9-mvc)


## footnotes
[^1]: spring-boot-autoconfigure/META-INF/spring.factories
