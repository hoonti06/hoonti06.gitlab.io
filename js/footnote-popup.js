let wrapper     = document.getElementById("popup-wrapper"); 
let content     = document.getElementById("popup-content"); 


function gatherFootnotes() {

  let fnList = []; 

  let i = 1;
  let footnote;
  while (footnote = document.getElementById(`fn${i}`))
  {
    fnList.push(footnote);
    i++;
  }

  return fnList;
}

let fnList = gatherFootnotes();


function getFootnote(index) {
  return fnList[index-1].innerHTML.trim();
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
  for (let x = 0; x < refList.length; x++) {
    refList[x].addEventListener("click", function(event) {
      event.preventDefault();    
      content.innerHTML = getFootnote(refList[x].innerText);
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

