function modifyToMermaidFormat() {
  let mermaids = document.getElementsByClassName('mermaid');
  for (let i = 0; i < mermaids.length; i++) {
    mermaidText = mermaids[i].innerHTML;

    mermaidText = mermaidText.replace(/“/g, '"');
    mermaidText = mermaidText.replace(/”/g, '"');
    mermaidText = mermaidText.replace(/‘/g, "'");
    mermaidText = mermaidText.replace(/’/g, "'");

    mermaids[i].innerHTML = mermaidText;
  }
}

modifyToMermaidFormat();
