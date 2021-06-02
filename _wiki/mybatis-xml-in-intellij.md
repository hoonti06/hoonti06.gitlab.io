---
layout    : wiki
title     : Intellij에서 Mybatis의 mapper xml 파일을 java 폴더 하위에 둔 프로젝트 실행
summary   : Intellij에서 java 폴더 하위의 리소스 파일 복사
date      : 2021-06-02 09:36:46 +0900
updated   : 2021-06-02 22:27:10 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---
* TOC
{:toc}

 
IntelliJ를 사용할 때 xml 파일이 mapper 인터페이스와 같은 패키지에 있으면 MyBatis가 같은 이름의 xml파일을 자동으로 찾아서 사용하지만 IntelliJ에서 디버깅할 때 xml파일이 'src/main/java' 폴더 아래에 있으면 찾지 못한다. 반드시 아래 그림과 같이 'src/main/resources' 폴더에 mapper package와 같은 경로를 만들어서 xml 파일을 넣어놓도록 하자. 'src/main/java' 폴더 아래 mapper 패키지에 xml파일을 넣어놓으면 찾지 못하고 예외가 발생한다. 양쪽 어디에 있건 Jar로 묶어 놓으면 같은 package에 들어가게 되지만 IntelliJ에서 디버깅할 때 만큼은 다르게 인식되는 것 같다.
Intellij

mybatis의 mapper xml 파일을 기본 리소스 폴더인 'src/main/resources'에 두지 않고, 'src/main/java' 폴더 하위에 두면 Intellij의 경우 java 폴더 

gradle을 통한 build 시 build 폴더에 class 파일들이 생성되고, intellij을 통한 build 시 out/production/classes 폴더에 class 파일들이 생성된다. sts(eclipse)는 build 시 target/classes 폴더에 class 파일들이 생성된다.  

<br>
sts는 build 시 class 파일을 생성하면서 target/classes 하위에 java 폴더 하위에 있는 xml 파일 등의 리소스가 다 복사된다. 그러나 intellij의 경우 build 시 out/production/classes 폴더에 class 파일들만 생성되고 java 폴더 하위의 리소스 파일들이 복사가 안 된다.  
![]( /wiki-img/mybatis-xml-in-intellij/120470841-fd043700-c3de-11eb-85e1-3e8e53f47c17.png )  

<br>
그래서 mybatis의 mapper xml 파일들을 java 폴더 하위에 두면 sts에서의 application 실행은 잘 되는데, intellij에서의 실행은 에러가 발생한다.  


<br>
mybatis mapper xml 파일을 java 폴더에 두고 Intellij에서 실행하기 위해서는 다음과 같이 설정을 해줘야 한다.  

<br>
- gradle 설정(build.gradle)
	```groovy
	dependencies {

		...	
		sourceSets {
			main {
				resources {
					srcDirs = ["src/main/java", "src/main/resources"]
				}
			}
		}
	}
	```  

<br>
- maven 설정(pom.xml)
	```xml
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
		<resources>
			<resource>
				<directory>src/main/java</directory>
				<includes>
					<include>**/*.xml</include>
				</includes>
			</resource>
			<resource>
				<directory>src/main/resources</directory>
			</resource>
		</resources>
	</build>
	```  

<br>
위와 같이 설정을 해주면 xml 파일이 복사된다.  
![]( /wiki-img/mybatis-xml-in-intellij/120470963-1e652300-c3df-11eb-908b-476df53b8b7f.png )  

<br>
사실 jar에 mapper xml파일을 포함시키기 위해서는 위와 같은 설정이 필요하다. 그리고 src/main/java만 resources에 등록을 하게 되면 기본으로 설정되는 src/main/resources가 포함되지 않기 때문에 application.properties와 같은 중요한 설정 파일이 포함되지 않는다.


<br>
- 참고
	- <https://okky.kr/article/584249>
