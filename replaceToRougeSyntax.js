#!/usr/bin/env node

// 참고
// ([^]*) 은 개행까지 포함한다.
// (.*)은 개행을 포함하지 못한다.


function replaceToRougeSyntax(fileContent)
{
  const regex = /\`\`\`(.*)/g;

  var str = fileContent;

  while (true)
  {
    var startMatch = regex.exec(str);
    if (!startMatch)
      break;

    var startIdx = startMatch.index;
//    console.log("\n<start>\n" + startMatch + "\nindex : " + startIdx);
    var language = startMatch[1];
//    console.log("language : " + language);

    var endMatch, endIdx;
    var isMatched = false;
    while (endMatch = regex.exec(str))
    {
      endIdx = endMatch.index;
//      console.log("<end>\n" + endMatch + "\nindex : " + endIdx);

      if (endMatch[1].length == 0)
      {
        isMatched = true;
        break;
      }
    }
    if (!isMatched)
      break;
    else if (!language)
    {
//      console.log("NOT Replace");
      continue;
    }

    var replaceStartStr = "{% highlight " + language + " linenos %}";
    var replaceEndStr = "{% endhighlight %}";

    var replaceStartGap = replaceStartStr.length - startMatch[0].length;
    var replaceEndGap = replaceEndStr.length - endMatch[0].length;

    str = replaceRange(str, startIdx, startIdx + startMatch[0].length, replaceStartStr);

    endIdx = endIdx + replaceStartGap;
    str = replaceRange(str, endIdx, endIdx + endMatch[0].length, replaceEndStr);

    regex.lastIndex += replaceStartGap + replaceEndGap;
  }

  return str;
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
