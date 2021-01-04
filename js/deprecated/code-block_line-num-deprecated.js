function addLineNumberInCodeBlock() {
	let pre = document.getElementsByTagName('pre');
	let pl = pre.length;
	for (let i = 0; i < pl; i++) {
    // language가 지정되지 않은 단순한 code block에는 line number를 생략한다.
    highlighter_rouge = pre[i].parentElement.parentElement;
    if (highlighter_rouge.className == "highlighter-rouge")
      continue;


		pre[i].innerHTML = '<span class="line-number" style="display: block; float: left; margin: 0 1em 0 -1em; border-right: 1px solid #ddd; text-align: right;"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
		let num = pre[i].innerHTML.split(/\n/).length;
		for (let j = 0; j < (num - 1); j++) {
			let line_num = pre[i].getElementsByTagName('span')[0];
			line_num.innerHTML += '<span style="display: block; margin: 0 .5em 0 1em;">' + (j + 1) + '</span>';
		}
	}
}

addLineNumberInCodeBlock();

