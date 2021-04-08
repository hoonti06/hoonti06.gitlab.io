let wrapper = document.getElementById("popup-wrapper"); 
let content = document.getElementById("popup-content"); 

function gatherFootnotes() {
  let footnotes = document.querySelectorAll('li[id^="fn:"]');
  return footnotes;
}

let fnList = gatherFootnotes();

function getFootnote(id) {
  for (let i = 0; i < fnList.length; i++) {
    // fnList[i].id => 'fn:id'
    if (fnList[i].id.split(':')[1] == id)
      return fnList[i].innerHTML.trim();
  }
};


function closeFootnotePopup() {
  if (wrapper.style.display !== "none") {
    wrapper.style.display = "none";
  }
}


// This will remove return links from footnote content.
function removeReturnLinks() {
  let fnReturn = document.getElementsByClassName("footnote-return");
  while (fnReturn.length > 0) {
    fnReturn[0].parentNode.removeChild(fnReturn[0]);
  };
}


function footnotePopup() {
  removeReturnLinks();

  let refList = document.querySelectorAll("sup");
  for (let i = 0; i < refList.length; i++) {
    refList[i].addEventListener("click", function(event) {
      event.preventDefault();
      // refList[i].id => 'sup:fnref:id'
      content.innerHTML = getFootnote(refList[i].id.split(':')[1]);
      wrapper.style.display = "flex";
    });
  };

  wrapper.addEventListener("click", function(event) {
    closeFootnotePopup();
  });


  window.addEventListener("scroll", function(event) {
    closeFootnotePopup();
  });
};

footnotePopup();

