// Find all YouTube videos - RESIZE YOUTUBE VIDEOS!!!
var $allVideos = $("iframe[src^='https://www.youtube.com']");

// The element that is fluid width
$fluidEl = $("body");

// Figure out and save aspect ratio for each video
$allVideos.each(function() {

    $(this)
    .data('aspectRatio', this.height / this.width)

    // and remove the hard coded width/height
    .removeAttr('height')
    .removeAttr('width');

});

// When the window is resized
$(window).resize(function() {

    var newWidth = $fluidEl.width();

    // Resize all videos according to their own aspect ratio
    $allVideos.each(function() {

        var $el = $(this);
        $el
        .width(newWidth)
        .height(newWidth * $el.data('aspectRatio'));

    });

// Kick off one resize to fix all videos on page load
}).resize();

// END RESIZE VIDEOS






/*
let wrapper     = document.getElementById("popup-wrapper"); 
let content     = document.getElementById("popup-content"); 

function getSizeOfYoutube() {

    let fnCount = document.getElementById("fn:1").parentNode.children.length;

    // Add every footnote into fnList ordered by their index.
    let fnList = []; 
    for (let x=1; x <= fnCount; x++) {
        let footnote = document.getElementById(`fn:${x}`);
        fnList.push(footnote);
    };

    return fnList;

}

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
*/
