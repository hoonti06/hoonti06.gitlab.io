#!/usr/bin/env node

// 참고
// ([^]*) 은 개행까지 포함한다.
// (.*)은 개행을 포함하지 못한다.


function replaceToRougeSyntax(fileContent)
{
  const regex = /\h*\`\`\`(.*)\n([^]*?)\h*\`\`\`\h*(\n|$)/g;

  var str = fileContent;
  str = str.replace(regex, function(match, group1, group2, group3, index, original) { 

    if (match)
      return "{% highlight "+ group1.trim() + " linenos %}\n" + group2 + "{% endhighlight %}" + group3;
    else
      return "";
  });

  return str;
}

function replaceRange(s, start, end, substitute) {
  return s.substring(0, start) + substitute + s.substring(end);
}

function isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
}

function isMarkdown(fileName) {
    return /\.md$/.test(fileName);
}

function getAllFilesPath(path, type, array) {

  fs.readdirSync(path).forEach(function(fileName) {

    const subPath = path + '/' + fileName;

    if (isDirectory(subPath)) {
      return getAllFilesPath(subPath, type, array);
    }
    if (isMarkdown(fileName)) {
      return array.push(path + '/' + fileName);
    }
  });
}

const fs = require('fs');
const list = [];


getAllFilesPath('./_wiki', 'wiki', list);
getAllFilesPath('./_posts', 'blog', list);

for (var i = 0; i < list.length; i++)
{
  var filePath = list[i];
//  console.log("filePath : " + filePath);
  var data = fs.readFileSync(filePath, 'utf8');
  var result = replaceToRougeSyntax(data);

  fs.writeFileSync(filePath, result, 'utf8');
}
