function modifyToMermaidFormat() {
  let mermaids = document.getElementsByClassName('mermaid');
  for (let i = 0; i < mermaids.length; i++) {
    mermaidText = mermaids[i].innerHTML;
    mermaidText = mermaidText.replace(/<p>/g, '');
    mermaidText = mermaidText.replace(/<\/p>/g, '');
    mermaidText = mermaidText.replace(/–/g, '--');

    //var ENTITIES_REGEX = /(&quot|&amp|&lt|&gt|&apos|&#039|)?;/g;
    var ENTITIES_REGEX = /(&[a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6})?;/ig;

    mermaidText = mermaidText.replace(ENTITIES_REGEX, function(fullmatch, backref1){
      return (backref1 ? fullmatch : ';\r\n');
    });


    mermaids[i].innerHTML = mermaidText;
  }
}

modifyToMermaidFormat();
