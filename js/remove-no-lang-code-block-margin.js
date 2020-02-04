// {requires getTagIfOnlyOneExistsIn} from "js/common.js"

// 'sourceCode'라는 class name을 가지고 있지 않은 'code' tag를 오직 하나 가지고 있는 'pre' tag에 대해 margin 제거
function removeNoLangCodeBlockMargin() {
  let preList = document.getElementsByTagName('pre');
  Array.prototype.forEach.call(preList, function(pre) {

    let codeInPre = getCodeTagIfOnlyOneExistsIn(pre);
    if (!codeInPre)
      return;

    if (!codeInPre.classList.contains("sourceCode")) {
      pre.style.marginTop = 0;
      pre.style.marginBottom = 0;
    }
  });
}

function getCodeTagIfOnlyOneExistsIn(pre) {
  return getTagIfOnlyOneExistsIn(pre, 'code');
}

removeNoLangCodeBlockMargin();
