$('div.mermaid').css("text-align", "center");

function resizeMermaid() {
  let postContent = $("article.post-content");
  if (postContent.length != 1)
    return;
  let maxWidth = $(postContent[0]).width();
  
  let mermaidSvgList = $('div.mermaid').find('svg');

  jQuery.each( $(mermaidSvgList), function(i, mermaidSvg) {

    mermaidSvgWidth = $(mermaidSvg).width();
    if (maxWidth < mermaidSvgWidth)
    {
      $(mermaidSvg).css("height", ($(mermaidSvg).height() * maxWidth / mermaidSvgWidth) + "px");
      $(mermaidSvg).css("width", maxWidth + "px");
    }
  });

}

window.addEventListener('load', resizeMermaid);
