// Decrease toc padding-left size
$($("nav#TOC").find("ul")[0]).css("padding-left", 10);


function decreaseIndentSizeOfListInTable() {

  jQuery.each( $("td"), function(i, td) {
    if (td.classList.length != 0)
      return;

    decreaseLeftPaddingSizeofUlRecursively(td);
  });
}

function decreaseLeftPaddingSizeofUlRecursively(element) {
  $(element).find("ul").css("padding-left", 20);

  jQuery.each( $(element.children), function(i, child) {
    decreaseLeftPaddingSizeofUlRecursively(child);
  });
}

decreaseIndentSizeOfListInTable();

// Remove margin of list in table
$($("td").find("ul")).css("margin-top", 0);
$($("td").find("ul")).css("margin-bottom", 0);


function resizeGridTableColsEvenly() {

  let postContent = $("article.post-content");
  if (postContent.length != 1)
    return;

  let maxWidth = $(postContent[0]).width();

  jQuery.each( $("table"), function(i, table) {

    var colGroup = $(table).find("colGroup");
    if (colGroup.length != 1)
      return;
    colGroup = colGroup[0].children;

    let curColMaxWidth = 0;
    jQuery.each( $(colGroup), function(i, col) {
      curColWidthPercentage = parseInt(col.style.width.replace(/%/g, ''));
      curColWidth = curColWidthPercentage / 100 * maxWidth;
      curColMaxWidth = Math.max(curColMaxWidth, curColWidth);
    });

    let colMaxWidthThresholds = maxWidth / colGroup.length;
    let colWidth = Math.min(curColMaxWidth, colMaxWidthThresholds);

    $(table).css("width", (colWidth * colGroup.length) + "px");
    jQuery.each( $(colGroup), function(i, col) {
      $(col).css("width", colWidth + "px");
    });
    
  });
}

//resizeGridTableColsEvenly();


function removePreCodeInTable() {

  jQuery.each( $("table tbody tr td"), function(i, td) {

    if ($(td).css("textAlign") != "center")
      return;

    let preCode = $(td).find("pre code")[0];
    if (!preCode)
      return;

    let text = preCode.innerText;

    $(td).empty();
    $(td).text(text);

  });
}

removePreCodeInTable();

//function modifyTableStyle() {
//
//  let postContent = $("article.post-content");
//  if (postContent.length != 1)
//    return;
//
//  let maxWidth = $(postContent[0]).width();
//
//  jQuery.each( $("table"), function(i, table) {
//
//    let dicArr = setValueArrayWidth(table, maxWidth);
//
//    let trList = $(table).find("tbody tr");
//    let lastTr = trList[trList.length-1];
//    let tdList = $(lastTr).find("td");
//
//    let notStyleSettingCount = 0;
//    jQuery.each( $(tdList), function(i, td) {
//
//      let text = td.innerText;
//      if (text[0] != '$' && text[1] != '{' || text[text.length-1] != '}')
//        notStyleSettingCount += 1;
//
//      let res = text.match(/\${(.+)}/);
//      if (res) {
//
//        matchedStr = res[1];
//        dicArr[i]["widthRatio"] = setValueWidthRatio(matchedStr);
//
//        lastIndex = matchedStr.length-1;
//        dicArr[i]["verticalAlign"] = setValueVerticalAlign(matchedStr[lastIndex]);
//
//      }
//      else {
//        dicArr[i]["widthRatio"] = 0;
//        dicArr[i]["verticalAlign"] = "M";
//      }
//
//      console.log("hi");
//    });
//    if (notStyleSettingCount == tdList.length)
//      return;
//
//    for (i = 0; i < dicArr.length; i++) {
//      dic = dicArr[i];
//
//      if (dic["widthRatio"])
//      
//      
//
//    }
//
//
//    let colMaxWidthThresholds = maxWidth / colGroup.length;
//    let colWidth = Math.min(curColMaxWidth, colMaxWidthThresholds);
//
//    $(table).css("width", (colWidth * colGroup.length) + "px");
//    jQuery.each( $(colGroup), function(i, col) {
//      $(col).css("width", colWidth + "px");
//    });
//    
//  });
//}

function setValueArrayWidth(table, maxWidth)
{
  let dicArr = [];
  var colGroup = $(table).find("colGroup");
  if (colGroup.length != 1)
    return;
  colGroup = colGroup[0].children;

  let curColMaxWidth = 0;
  jQuery.each( $(colGroup), function(i, col) {
    curColWidthPercentage = parseInt(col.style.width.replace(/%/g, ''));
    curColWidth = curColWidthPercentage / 100 * maxWidth;

    dic = {};
    dic["width"] = curColWidth;
    dicArr.push(dic);
  });

  return dicArr;
}

function setValueWidthRatio(str)
{
  let widthRatio = parseInt(str);
  if (!widthRatio)
    widthRatio = 0;

  return widthRatio;
}

function setValueVerticalAlign(ch)
{
  verticalAlign = 'M';
  if (!$.isNumeric(ch))
  {
      ch = ch.toUpperCase();
      if (ch != 'T' || ch != 'B')
        ch = "M";

      verticalAlign = ch;
  }
  return verticalAlign;
}

//modifyTableStyle();
