// 'sourceCode'라는 class name을 가지고 있지 않은 'code' tag를 오직 하나 가지고 있는 'pre' tag에 대해 margin 제거
function removeNoLangCodeBlockMargin() {

  jQuery.each( $("pre"), function(i, pre) {

    let codeInPre = $(pre).find("code");
    if (codeInPre.length != 1)
      return;

    if (!$(codeInPre[0]).hasClass("sourceCode")) {
      $(pre).css("margin-top", 0);
      $(pre).css("margin-bottom", 0);
    }
  });
}

removeNoLangCodeBlockMargin();
