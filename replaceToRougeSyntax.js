#!/usr/bin/env node

// 참고
// ([^]*) 은 개행까지 포함한다.
// (.*)은 개행을 포함하지 못한다.


function replaceToRougeSyntax(fileContent)
{
//  const regex = /\`\`\`(.*)/g;
  const regex = /\s*\`\`\`(.*)\n([^]*?)\s*\`\`\`\s*(\n|$)/g;

  var str = fileContent;

  str = str.replace(regex, function(match, group1, group2, group3, index, original) { 

    if (match)
      return "{% highlight "+ group1.trim() + " linenos %}\n" + group2 + "\n{% endhighlight %}\n";
    else
      return "";
  });

//  while (true)
//  {
//    var startMatch = regex.exec(str);
//    if (!startMatch)
//      break;
//
//    var startIdx = startMatch.index;
////    console.log("\n<start>\n" + startMatch + "\nindex : " + startIdx);
//    var language = startMatch[1];
////    console.log("language : " + language);
//
//    var endMatch, endIdx;
//    var isMatched = false;
//    while (endMatch = regex.exec(str))
//    {
//      endIdx = endMatch.index;
////      console.log("<end>\n" + endMatch + "\nindex : " + endIdx);
//
//      if (endMatch[1].length == 0)
//      {
//        isMatched = true;
//        break;
//      }
//    }
//    if (!isMatched)
//      break;
//    else if (!language)
//    {
//      continue;
//    }
//
//    var replaceStartStr = "{% highlight " + language + " linenos %}";
//    var replaceEndStr = "{% endhighlight %}";
//
//    var replaceStartGap = replaceStartStr.length - startMatch[0].length;
//    var replaceEndGap = replaceEndStr.length - endMatch[0].length;
//
//    str = replaceRange(str, startIdx, startIdx + startMatch[0].length, replaceStartStr);
//
//    endIdx = endIdx + replaceStartGap;
//    str = replaceRange(str, endIdx, endIdx + endMatch[0].length, replaceEndStr);
//
//    regex.lastIndex += replaceStartGap + replaceEndGap;
//  }

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

function test2(fileContent)
{
    const regex = /\s*\`\`\`(.*)\n([^]*?)\s*\`\`\`\s*(\n|$)/g;
//  const regex = /(\s*)\`\`\`(.*)\n([^]*?)(\s*)\`\`\`(\s*)(\n|$)/g;
//  const regex = /\`\`\`(.*)\n([^]*?)()\`\`\`\n/g;

  var str = "  \`\`\`  cpp  \n" 
    +"int a = 10;\n"
    +"\`\`\`cpp\n"
    +"printf(\"\");\n"
    +"  \`\`\` \n"
    +"\`\`\`java\n"
    +"Arraylist list = new Arraylist();\n"
    +"System.out.pirntln(\"\");\n"
    +" \`\`\`";


  str = str.replace(regex, function(match, group1, group2, group3, index, original) { 

    if (match)
      return "{% highlight "+ group1.trim() + " linenos %}\n" + group2 + "\n{% endhighlight %}\n";
    else
      return "";
  });

//  str = str.replace(regex, function(match, group1, group2, group3, group4, group5, group6, index, original) { 
////    console.log("\n\n\n<match>\n" + match);
////    console.log("<group1>\n" + group1);
////    console.log("<group2>\n" + group2);
////    console.log("<group2 trim>\n" + group2.trim());
////    console.log("<group3>\n" + group3);
////    console.log("<group4>\n" + group4);
////    console.log("<group5>\n" + group5);
////    console.log("<group6>\n" + group6);
////    console.log("<index>\n" + index);
////    console.log("<original>\n" + original);
//    return "{% highlight "+ group2.trim() + " linenos %}\n" + group3 + "\n{% endhighlight %}\n";
//  });


  console.log("\n\n\n<RES>\n" + str);
}

//test2("");
