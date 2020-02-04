// requires {getTagIfOnlyOneExistsIn} from "js/common.js"
// requires {getClassIfOnlyOneExistsIn} from "js/common.js"

function resizePandocGridTableColsEvenly() {

  let postContent = getPostContentIfOnlyOneExists();
  if (!postContent)
    return;

  var tableList = document.getElementsByTagName('table');
  Array.prototype.forEach.call(tableList, function(table) {

    var colGroup = getColGroupIfOnlyOneExistsIn(table);
    if (!colGroup)
      return;
    colGroup = colGroup.children;

    let colMaxWidthPercentageThresholds = 100 / colGroup.length;
    let colMaxWidth = 0;

    Array.prototype.forEach.call(colGroup, function(col) {
      colMaxWidth = Math.max(colMaxWidth, col.offsetWidth);
    });

    let colMaxWidthPercentage = Math.min(colMaxWidth / postContent.offsetWidth * 100, 
                                         colMaxWidthPercentageThresholds);

    table.style.width = colMaxWidthPercentage * colGroup.length + "%";

    Array.prototype.forEach.call(colGroup, function(col) {
      col.style.width = colMaxWidthPercentageThresholds + "%";
    });
    
  });
}

function getPostContentIfOnlyOneExists() {
  return getClassIfOnlyOneExistsIn(document, "post-content");
}

function getColGroupIfOnlyOneExistsIn(table) {
  return getTagIfOnlyOneExistsIn(table, 'colgroup');
}

resizePandocGridTableColsEvenly();
