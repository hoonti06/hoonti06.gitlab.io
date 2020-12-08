---
layout    : wiki
title     : (강의 내용 정리) 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술
summary   : 
date      : 2020-09-19 21:07:04 +0900
updated   : 2020-09-20 19:48:09 +0900
tag       : 
public    : true
published : true
parent    : [[online-lecture]]
latex     : false
---




```java
public class MemoryMemberRepository implements MemberRepository {

	// 원래는 ConcourrentHashMap을 써야 한다.
	private static Map<Long, Member> store = new HashMap<>();
	// 원래는 atomic 타입으로 사용해야 한다.
	private static Long sequence = 0L;

	@Override
	public Member save(Member member) {
		member.setId(++sequence);
		store.put(member.getId(), member);
		return member;
	}

	@Override
	public Optional<Member> findById(Long id) {
		return Optional.ofNullable(store.get(id));
	}

	@Override
	public Optional<Member> findByName(String name) {
		return store.values().stream()
			.filter(member -> member.getName().equals(name))
			.findAny();
	}

	@Override
	public List<Member> findAll() {
		return new ArrayList<>(store.values());
	}

	public void clearStore() {
		store.clear();
	}
}
```
- 'Long' wrapper class를 쓰는 이유
  - 객체를 생성하는 시점에는 id 값이 없고, 실제 리포지토리에 저장하는 시점에 id 값이 생성된다.
  - 기본형인 long을 사용하면 객체를 생성하는 시점에 id 값에 0이라는 기본값이 들어가게 되지만, Long을 사용하면 기본값이 null이기 때문에 값이 없다는 것을 잘 표현할 수 있다.

- Test에서 Assertions는 'org.assertj.core.api.Assertions'를 많이 쓴다.
- @AfterEach 
  - 한번에 여러 테스트를 실행하면 메모리 DB에 직전 테스트의 결과가 남을 수 있다. 이렇게 되면 다음 이전 테스트 때문에 다음 테스트가 실패할 가능성이 있다. 
  - @AfterEach를 사용하면 한 클래스 내부의 각 테스트가 종료될 때 마다 이 기능을 실행한다. 여기서는 메모리 DB에 저장된 데이터를 삭제한다.
  - 테스트는 각각 독립적으로 실행되어야 한다. 텧스트 순서에 의존 관계가 있는 것은 좋은 테스트가 아니다.
  - 또한, 테스트의 순서 또한, 작성된 코드 순서인 보장이 없다.
  ```java
  @AfterEach
  public void afterEach() {
  	repository.clearStore();
  }
  ```


- 다음과 같이 코드를 수정할 수 있다.
```java
package me.hoonti06.hellospring.service;

import me.hoonti06.hellospring.domain.Member;
import me.hoonti06.hellospring.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

public class MemberService {
	private final MemberRepository memberRepository;

	// DI(Dependency Injection)
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

	/**
	 * 회원 가입
	 * @param member
	 * @return
	 */
	public Long join(Member member) {

		// before
		// 같은 이름이 있는 중복 회원 X
		Optional<Member> result = memberRepository.findByName(member.getName());
		result.ifPresent(m -> {
				throw new IllegalStateException("이미 존재하는 회원입니다.");
				});

		// after1
		// 같은 이름이 있는 중복 회원 X
		memberRepository.findByName(member.getName())
			.ifPresent(m -> {
					throw new IllegalStateException("이미 존재하는 회원입니다.");
					});

		// after2 (intellij에서 <alt> + <command> + M을 통해 method로 빼낼 수 있다)
		validateDumplcateMember(member); // 중복 회원 검증


		return memberRepository.save(member).getId();
	}

	private void validateDumplcateMember(Member member) {
		memberRepository.findByName(member.getName())
			.ifPresent(m -> {
					throw new IllegalStateException("이미 존재하는 회원입니다.");
					});
	}
	
	/**
     * 전체 회원 조회
     */
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    /**
     * 특정 회원 조회
     * @param memberId
     * @return
     */
    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
```

- service는 명명할 때, 비즈니스 관련 용어를 사용하는 것이 좋다. 반면, repository는 개발자스러운 용어를 쓰면 된다.


- 테스트의 method명은 한글도 가능하다.
- 테스트 method를 크게 given, when, then으로 크게 먼저 구분하면 좋다.
  ```java
  package me.hoonti06.hellospring.service;

  import me.hoonti06.hellospring.domain.Member;
  import me.hoonti06.hellospring.repository.MemoryMemberRepository;
  import org.junit.jupiter.api.AfterEach;
  import org.junit.jupiter.api.BeforeEach;
  import org.junit.jupiter.api.Test;

  import static org.assertj.core.api.Assertions.assertThat;
  import static org.junit.jupiter.api.Assertions.assertThrows;

  class MemberServiceTest {

	  MemberService memberService;
	  MemoryMemberRepository memberRepository;

	  @BeforeEach
		  void beforeEach() {
			  memberRepository = new MemoryMemberRepository();
			  memberService = new MemberService(memberRepository);
		  }

	  @AfterEach
		  void afterEach() {
			  memberRepository.clearStore();
		  }

	  @Test
		  void 회원가입() {
			  // given
			  Member member = new Member();
			  member.setName("hello");

			  // when
			  Long saveId = memberService.join(member);

			  // then
			  Member findMember = memberService.findOne(saveId).get();
			  assertThat(member.getName()).isEqualTo(findMember.getName());
		  }

	  @Test
		  void 중복_회원_예외() {
			  // given
			  Member member1 = new Member();
			  member1.setName("spring");

			  Member member2 = new Member();
			  member2.setName("spring");

			  // when
			  memberService.join(member1);
			  assertThrows(IllegalStateException.class, () -> memberService.join(member2));

			  IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));
			  assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");

			  /*
				 try {
				 memberService.join(member2);
				 fail(); // 여기에 들어오면 실패
				 } catch (IllegalStateException e) {
				 assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
				 }
			   */

			  // then
		  }

	  @Test
		  void findMembers() {
		  }

	  @Test
		  void findOne() {
		  }
  }
```

### 컴포넌트 스캔과 자동 의존 관계 설정
- 생성자에 @Autowired 가 있으면 스프링이 연관된 객체를 스프링 컨테이너에서 찾아서 넣어준다. 이렇게 객체 의존 관계를 외부에서 넣어주는 것을 DI (Dependency Injection), 의존성 주입이라 한다.

- 스프링 빈을 등록하는 2가지 방법
  - 컴포넌트 스캔과 자동 의존관계 설정 
  - 자바 코드로 직접 스프링 빈 등록하기
 
- 컴포넌트 스캔 원리
  - `@Component` 애노테이션이 있으면 스프링 빈으로 자동 등록된다.
  - `@Controller` 컨트롤러가 스프링 빈으로 자동 등록된 이유도 컴포넌트 스캔 때문이다.
  - `@Component` 를 포함하는 다음 애노테이션도 스프링 빈으로 자동 등록된다. 
    - `@Controller`
    - `@Service`
    - `@Repository`

- 참고)
  - 생성자에 `@Autowired` 를 사용하면 객체 생성 시점에 스프링 컨테이너에서 해당 스프링 빈을 찾아서 주입한다. 생성자가 1개만 있으면 `@Autowired` 는 생략할 수 있다.
  - 스프링은 스프링 컨테이너에 스프링 빈을 등록할 때, 기본으로 싱글톤으로 등록한다(유일하게 하나만 등록해서 공유한다).  
  따라서, 같은 스프링 빈이면 모두 같은 인스턴스다. 설정으로 싱글톤이 아니게 설정할 수 있지만, 특별한 경우를 제외하고는 싱글톤을 사용한다.
  - 컴포넌트 스캔은 SpringBootApplcation의 package 내부만을 범위로 둔다.

- 스프링 Bean을 생성할 때, 상태를 갖는 Bean을 절대 생성하지 말아야 한다.
  - 스프링 Bean이 상태를 갖게 되었을 때는 그 상태를 공유하는 모든 쓰레드들로부터 안전할 수 있게 동기화를 해줘야 하고, 동기화를 하는 순간 싱글톤으로써의 혜택이 날아간다.
  - 출처: https://jeong-pro.tistory.com/204 [기본기를 쌓는 정아마추어 코딩블로그]

```java
// me.hoonti06.hellospring.SpringConfig.java

package hello.hellospring;

import hello.hellospring.repository.MemberRepository;
import hello.hellospring.repository.MemoryMemberRepository;
import hello.hellospring.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {
	@Bean
	public MemberService memberService() {
		return new MemberService(memberRepository());
		
	}
	@Bean
	public MemberRepository memberRepository() {
		return new MemoryMemberRepository();
	}
}
```
- DI에는 필드, 주입 setter 주입, 생성자 주입 이렇게 3가지 방법이 있다. 의존 관계가 실행 중에 동적으로 변하는 경우는 거의 없으므로 **생성자 주입**을 권장한다.
- 실무에서는 주로 정형화된 컨트롤러, 서비스, 리포지토리 같은 코드는 컴포넌트 스캔을 사용한다. 그리고 정형화 되지 않거나, 상황에 따라 구현 클래스를 변경해야 하면 설정(@Configuration)을 통해 스프링 빈으로 등록한다.
  - new MemoryMemberRepository()에서 new DbMemberRepository()로 변경할 수 있다. (구현 클래스 변경)
- 참고)
  - @Autowired 를 통한 DI는 helloConroller , memberService 등과 같이 스프링이 관리하는 객체에서만 동작한다. 스프링 빈으로 등록하지 않고 내가 직접 생성한 객체에서는 동작하지 않는다.

- 개방-폐쇄 원칙(OCP, Open-Closed Principle)
  - 확장에는 열려있고, 수정, 변경에는 닫혀있다.
- 스프링의 DI (Dependencies Injection)을 사용하면 기존 코드를 전혀 손대지 않고, 설정만으로 구현 클래스를 변경할 수 있다.

- H2 사용 시 
  - docker run --name my-h2 -p 8082:8082 -p 1521:1521 -d buildo/h2database
  - 맨 처음에 http://localhost:8082/로 접속한다.
  - JDBC URL에 jdbc:h2:h2-data/test, 사용자명에 sa를 입력하고 연결하면 test db가 생성되면서 접속이 된다.
  - 그 다음에 접속할 때는 JDBC URL에 'jdbc:h2:tcp://localhost:1521/h2-data/test' 입력하면 접속할 수 있다.
  - 그리고 spring.datasource.url에 'jdbc:h2:tcp://localhost:1521/h2-data/test'를 설정하면 된다.

```java
package me.hoonti06.hellospring.service;

import me.hoonti06.hellospring.domain.Member;
import me.hoonti06.hellospring.repository.MemberRepository;
import me.hoonti06.hellospring.repository.MemoryMemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
class MemberServiceIntegrationTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    void 회원가입() {
        // given
        Member member = new Member();
        member.setName("hello");

        // when
        Long saveId = memberService.join(member);

        // then
        Member findMember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
    }

    @Test
    void 중복_회원_예외() {
        // given
        Member member1 = new Member();
        member1.setName("spring");

        Member member2 = new Member();
        member2.setName("spring");

        // when
        memberService.join(member1);
        assertThrows(IllegalStateException.class, () -> memberService.join(member2));

        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");

    }

    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}
```
- @SpringBootTest : 스프링 컨테이너와 테스트를 함께 실행한다.
- @Transactional : `테스트 케이스`에 이 애노테이션이 있으면, 테스트 시작 전에 트랜잭션을 시작하고, 테스트 완료 후에 항상 `롤백`한다. 이렇게 하면 DB에 데이터가 남지 않으므로 다음 테스트에 영향을 주지 않는다.

### JdbcTemplate
```java
// JdbcTemplateMemberRepository.java

package me.hoonti06.hellospring.repository;

import me.hoonti06.hellospring.domain.Member;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class JdbcTemplateMemberRepository implements MemberRepository {

    private final JdbcTemplate jdbcTemplate;

	@Autowired // 생성자가 하나이면 해당 애노테이션을 생략할 수 있다.
    public JdbcTemplateMemberRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Member save(Member member) {
        SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
        jdbcInsert.withTableName("member").usingGeneratedKeyColumns("id");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("name", member.getName());

        Number key = jdbcInsert.executeAndReturnKey(new MapSqlParameterSource(parameters));
        member.setId(key.longValue());
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        List<Member> result = jdbcTemplate.query("select * from member where id = ?", memberRowMapper(), id);
        return result.stream().findAny();
    }

    @Override
    public Optional<Member> findByName(String name) {
        List<Member> result = jdbcTemplate.query("select * from member where name = ?", memberRowMapper(), name);
        return result.stream().findAny();
    }

    @Override
    public List<Member> findAll() {
        return jdbcTemplate.query("select * from member", memberRowMapper());
    }

    private RowMapper<Member> memberRowMapper() {
        return (rs, rowNum) -> {
            Member member = new Member();
            member.setId(rs.getLong("id"));
            member.setName(rs.getString("name"));
            return member;
        };
    }
}
```




### JPA
- JPA는 기존의 반복 코드는 물론이고, 기본적인 SQL도 JPA가 직접 만들어서 실행해준다.
- JPA를 사용하면, SQL과 데이터 중심의 설계에서 객체 중심의 설계로 패러다임을 전환을 할 수 있다.
- JPA를 사용하면 개발 생산성을 크게 높일 수 있다.

```java
spring.datasource.url=jdbc:h2:tcp://localhost:1521/h2-data/test
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=none
```
- spring.jpa.show-sql : JPA가 만든 SQL을 볼 수 있다.
- spring.jpa.hibernate.ddl-auto : table을 자동으로 만들어준다.

```java
package me.hoonti06.hellospring.repository;

import me.hoonti06.hellospring.domain.Member;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaMemberRepository implements MemberRepository {

    private final EntityManager em;

    public JpaMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        Member member = em.find(Member.class, id);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> findByName(String name) {
        List<Member> result = em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public List<Member> findAll() {
        // JPQL : 객체를 대상으로 query 수행
        // Member : Entity
        // select m : 객체 자체를 select 한다.
        List<Member> result = em.createQuery("select m from Member m", Member.class)
                .getResultList();
        return result;
    }
}
```

### 스프링 데이터 JPA

```java
// DataSpringJpaMemberRepository.java

package me.hoonti06.hellospring.repository;

import me.hoonti06.hellospring.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataJpaMemberRepository extends JpaRepository<Member, Long>, MemberRepository {

    // method명으로 알아서 쿼리를 작성해준다.
    @Override
    Optional<Member> findByName(String name);
}

// SpringConfig.java
@Configuration
public class SpringConfig {

    private final MemberRepository memberRepository;

    public SpringConfig(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }
}
```

### AOP
스프링은 프록시 방식의 AOP 지원(runtime)
```java
// me.hoonti06.hellospring.aop.TimeTraceAop.java

package me.hoonti06.hellospring.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class TimeTraceAop {
    @Around("execution(* me.hoonti06.hellospring..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        System.out.println("START : " + joinPoint.toString());
        try {
            return joinPoint.proceed();
        } finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish - start;
            System.out.println("END : " + joinPoint.toString() + " " + timeMs + "ms");
        }
    }
}
```
