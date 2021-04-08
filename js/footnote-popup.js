let wrapper     = document.getElementById("popup-wrapper"); 
let content     = document.getElementById("popup-content"); 


function gatherFootnotes() {
    // Counts generated footnotes. Hugo will create ordered list at the end of each post 
    // with each footnote as item.
    let fnCount = document.getElementById("fn:1").parentNode.children.length;

    // Add every footnote into fnList ordered by their index.
    let fnList = []; 
    for (let x=1; x <= fnCount; x++) {
        let footnote = document.getElementById(`fn:${x}`);
        fnList.push(footnote);
    };

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
            // index.innerHTML = refList[x].id.substring(6,7) + ".";            
            content.innerHTML = getFootnote(refList[x].id.substring(6,7));
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

