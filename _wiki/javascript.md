---
layout    : wiki
title     : javascript
summary   : 
date      : 2020-11-13 02:05:53 +0900
updated   : 2020-11-13 02:09:58 +0900
tag       : 
public    : true
published : true
parent    : 
latex     : false
---

## 아래 두 코드는 다르다.
```javascript
// (1)
newObj.restore = () => {
	this.left = this.prevPosition.left;
	this.top = this.prevPosition.top;
}

// (2)
newObj.restore = function() {
	this.left = this.prevPosition.left;
	this.top = this.prevPosition.top;
}

// (1) 코드는 call을 사용해도 this가 바뀌지 않는다.
// (2) 코드는 call을 사용하여 thisArgu를 넘겨주면 this가 바뀐다.
```

### private은 앞에 \'_\'(underscore)를 붙인다.

### jquery 변수는 변수명 앞에 '$'를 prefix로 넣어준다.
