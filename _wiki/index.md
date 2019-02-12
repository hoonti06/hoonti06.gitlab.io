---
layout  : wikiindex
title   : wiki
date    : 2019-02-09 01:38:36 +0900
updated : 2019-02-12 21:44:46 +0900
tags    : index
toc     : true
public  : true
comment : false
---

* [[Gradle]]
* [[tools]]
    * [[useful-site]]
        * [[google-search-console-remove-outdated-content]]{구글 웹 도구 - 오래된 콘텐츠 삭제}
* [[programming-language]]{프로그래밍 언어}
    * [[Groovy]]
	* C언어
	* C++
	* Java
	* Python
* [[how-to]]
    * [[mathjax-latex]]
* [[Vim]]
    * [[vim-conceallevel]]{conceallevel (Vim)}
* [[YAML]]
* [[Network]]
	* [[DHCP]]
	* [[DNS]]
	* [[IP]]
	* [[CIDR]]
	* [[Netmask]]
* [[Algorithm]]
	* [[문제]]
		* [[BOJ]]
			* [[BOJ-3019]]{3019. 빵집}
		  
		


---

# blog
<div>
    <ul>
{% for post in site.posts %}
    {% if post.public != false %}
        <li>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
            </a>
        </li>
    {% endif %}
{% endfor %}
    </ul>
</div>

