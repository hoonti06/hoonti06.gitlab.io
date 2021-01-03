function resizePlantuml() {
  let plantumlList = $('object.plantuml')
  jQuery.each( $(plantumlList), function(i, plantuml) {

    let maxWidth = $(plantuml).parent().width();

    plantumlWidth = $(plantuml).width();

    if (maxWidth < plantumlWidth)
    {
      $(plantuml).css("height", ($(plantuml).height() * maxWidth / plantumlWidth) + "px");
      $(plantuml).css("width", maxWidth + "px");
    }
  });

}

window.addEventListener('load', resizePlantuml);
