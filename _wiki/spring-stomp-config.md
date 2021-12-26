---
layout    : wiki
title     : Spring에서 STOMP 사용 설정 방법
summary   : 
date      : 2021-08-10 01:56:58 +0900
updated   : 2021-12-26 23:07:08 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

다음과 같이 Spring에서 STOMP를 사용하기 위해서는 WebSocketMessageBrokerConfigurer를 구현한 class가 필요하다

<br>
특히, 다음과 같이 registerStompEndpoints 메서드를 overriding해야 한다.
```java
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws/gamesession/").setAllowedOriginPatterns("*")
			.withSockJS();
  }
}
```

이때, `setAllowedOriginPatterns()` 대신 `setAllowedOrigins()`를 사용하게 된다면 다음과 같이 CORS 문제가 발생한다.  
![]( /wiki-img/spring-stomp-config/128745132-6b9f7642-2631-4734-be5c-44c21bc5a8b8.png )

