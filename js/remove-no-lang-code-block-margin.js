// 'sourceCode'라는 class name을 가지고 있지 않은 'code' tag를 오직 하나 가지고 있는 'pre' tag에 대해 margin 제거
function removeNoLangCodeBlockMargin() {
  let preList = document.getElementsByTagName('pre');
  if (!preList)
    return;

  for (let i = 0; i < preList.length; i++) {
    let pre = preList[i];

    let codeInPre = getCodeTagIfOnlyOneCodeTagExistsIn(pre);
    if (!codeInPre)
      continue;

    if (!codeInPre.classList.contains("sourceCode")) {
      pre.style.marginTop = 0;
      pre.style.marginBottom = 0;
    }
  }
}

function getCodeTagIfOnlyOneCodeTagExistsIn(pre) {
  let codeListInPre = pre.getElementsByTagName('code');
  if (codeListInPre && codeListInPre.length == 1)
    return codeListInPre[0];
  else
    return null;
}

removeNoLangCodeBlockMargin();
