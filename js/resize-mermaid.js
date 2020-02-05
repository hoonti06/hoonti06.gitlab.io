// requires {getTagIfOnlyOneExistsIn} from "js/common.js"

function resizeMermaid() {
  let mermaidDivList = $('div.mermaid');
  Array.prototype.forEach.call(mermaidDivList, function(mermaidDiv) {

    var mermaidSvg = getMermaidSvgIfOnlyOneExistsIn(mermaidDiv);
    if (!mermaidSvg)
      return;

    if (mermaidDiv.clientWidth >= mermaidSvg.clientWidth)
      return;

    mermaidSvg.style.height = (mermaidSvg.clientHeight * mermaidDiv.clientWidth / mermaidSvg.clientWidth) + "px";
    mermaidSvg.style.width = mermaidDiv.clientWidth + "px";
  });

}

function getMermaidSvgIfOnlyOneExistsIn(mermaidDiv) {
  return getTagIfOnlyOneExistsIn(mermaidDiv, 'svg');
}

window.onload = resizeMermaid;
