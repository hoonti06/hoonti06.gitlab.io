---
layout    : wiki
title     : Trie
summary   : 
date      : 2021-03-22 16:46:11 +0900
updated   : 2021-06-10 22:59:02 +0900
tag       : 
public    : true
published : true
parent    : [[data-structure]]
latex     : false
---
* TOC
{:toc}

- 문자열 검색에 사용되는 자료구조(알고리즘)
- Java
	```java
	class Trie {
		TrieNode root;
		Trie() {
			root = new TrieNode();
		}
		
		void insert(String key) {
			TrieNode curNode = root;
			int length = key.length();
			for (int i = 0; i < length; i++) {
				char ch = key.chatAt(i);
				int idx = ch - 'A';
				
				if (curNode.next[idx] == null) {
					curNode.next[idx] = new TrieNode();
				}
				curNode = curNode.next[idx];
			}
			curNode.isTerminal = true;
		}
		
		Optional<TrieNode> find(String key) {
			TrieNode curNode = root;
			int length = key.length();
			for (int i = 0; i < length; i++) {
				char ch = key.chatAt(i);
				int idx = ch - 'A';
				
				if (curNode.next[idx] == null) {
					return Optional.empty();
				}
				curNode = curNode.next[idx];
			}
			if (curNode.isTerminal) 
				return Optional.of(curNode);
		}
	}

	class TrieNode {
		TrieNode[] next;
		boolean isTerminal;
		TrieNode() {
			next = new TrieNode[26]; // 대문자
			isTerminal = false;
		}
	}
	```

- cpp
	```cpp
	class Trie {
		Trie *next[26]; // 대문자
		bool isFin;
		
		Trie () {
			memset(next, 0, sizeof(next));
		}
		
		~Trie () {
			for (int i = 0; i < 26; i++) 
				if (next[i]) delete next[i];
		}
		
		Trie* find(const char* key) {
			if (*key == '\0') return this;
			int idx = *key - 'A';
			if (!next[idx]) return NULL;
			return next[idx]->find(key + 1);
		}
		
		void insert(const char* key) {
			if (*key == '\0') finish = true;
			else {
				int idx = *key - 'A';
				if (!next[idx])
					next[idx] = new Trie();
				next[idx]->insert(key + 1);
			} 
		}
	}
	```

- 관련 문제
	- <http://boj.kr/5052>
