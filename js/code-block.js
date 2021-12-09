function setCodeBlockMarginTopToZero() {
  $('code[class^="language-"]').parents('pre').css("margin-top", 0);
}

setCodeBlockMarginTopToZero();


function gatherCodeBlocks() {
    let codeBlocks = document.querySelectorAll('div[class="highlight"]');
    return codeBlocks;
}

function setCodeBlocks() {
    let codeBlocks = gatherCodeBlocks();
    
    Array.prototype.forEach.call(codeBlocks, function(codeBlock) {
        let parentHeight = codeBlock.parentElement.offsetHeight;
        let parentWidth = codeBlock.parentElement.offsetWidth;
        let blockHeight = codeBlock.offsetHeight;
        let blockWidth = codeBlock.offsetWidth;
        if (parentWidth >= blockWidth) return;

        // blockWidth가 더 크면 parent의 width보다 5px만큼 오른쪽으로 더 삐져나온다.(이유는 모르겠다)
        const OFFSET = 5; 
        let style = getComputedStyle(codeBlock);
        let marginLeft = parseInt(style.marginLeft);
        let wideMarginLeft = -(blockWidth - parentWidth - OFFSET) + "px";
        
        codeBlock.addEventListener("mouseover", function(event) {
            event.preventDefault();

            codeBlock.style.position = 'absolute';
            codeBlock.parentElement.style.height = blockHeight + "px";
            codeBlock.parentElement.style.marginLeft = wideMarginLeft;
        });

        codeBlock.addEventListener("mouseout", function(event) {
            event.preventDefault();

            codeBlock.style.position = 'static';
            codeBlock.parentElement.style.height = parentHeight + "px";
            codeBlock.parentElement.style.marginLeft = marginLeft;
        });
    });
}

setCodeBlocks();
