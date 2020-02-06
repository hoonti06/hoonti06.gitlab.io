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

resizeGridTableColsEvenly();