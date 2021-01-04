#!/usr/bin/env node

const YAML = require('yamljs');
const fs = require('fs');
const path = './_wiki'
const list = [];

getFiles('./_wiki', 'wiki', list);
getFiles('./_posts', 'blog', list);

const dataList = list.map(function collectData(file) {

    const data = fs.readFileSync(file.path, 'utf8');
    return parseInfo(file, data.split('---')[1]);

}).filter(function removeNullData(row) {

    return row != null;

}).filter(function removePrivate(row) {

    return row.public != 'false';

}).sort(function sortByFileName(a, b) {

    return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());

});

const tagMap = {};

dataList.forEach(function collectTagMap(data) {
    if (!data.tag) {
        return;
    }
    data.tag.forEach(function(tag) {
        if (!tagMap[tag]) {
            tagMap[tag] = [];
        }
        tagMap[tag].push({
            fileName: data.fileName,
            // updated: data.updated || data.date,
        });
    });
});

for (tag in tagMap) {
    tagMap[tag].sort(function sortByFileName(a, b) {
        return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());
    });
}
saveTagMap(tagMap);

const pageMap = {};
dataList.sort(function(a, b) {
    return a.url.toLowerCase().localeCompare(b.url.toLowerCase());
}).forEach(function(page) {

    pageMap[page.fileName] = {
        type: page.type,
        title: page.title,
        summary: page.summary,
        parent: page.parent,
        url: page.url,
        updated: page.updated || page.date,
        children: [],
    };

});

dataList.forEach(function(page) {
    if (page.parent && page.parent != 'index') {

        var parent = pageMap[page.parent];

        if (parent && parent.children) {
            parent.children.push(page.fileName);
        }
    }
});

savePageList(pageMap);

saveTagFiles(tagMap, pageMap);

saveTagCount(tagMap);

function saveTagMap(tagMap) {
    fs.writeFile("./_data/tagMap.yml", YAML.stringify(tagMap), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("tagMap saved.");
    });
}

/**
 * tag 하나의 정보 파일을 만든다.
 * 각 태그 하나는 하나의 json 파일을 갖게 된다.
 * 예를 들어 java 라는 태그가 있다면 ./data/tag/java.json 파일이 만들어진다.
 * json 파일의 내용은 fileName과 collection으로 구성된다.
 * 다음은 spring.json 파일의 예이다.
 *
{
  "fileName": "spring",
  "collection": {
    "spring-boot": {
      "type": "wiki",
      "title": "(강의 내용 정리) Spring boot",
      "summary": "",
      "parent": "online-lecture",
      "url": "/wiki/spring-boot",
      "updated": "2021-01-04 00:45:54 +0900",
      "children": []
    },
    "spring-framework-core": {
      "type": "wiki",
      "title": "(강의 내용 정리) 스프링 프레임워크 핵심 기술",
      "summary": "",
      "parent": "online-lecture",
      "url": "/wiki/spring-framework-core",
      "updated": "2021-01-04 00:45:48 +0900",
      "children": []
    },
    "spring-mvc": {
      "type": "wiki",
      "title": "(강의 내용 정리) 스프링 웹 MVC",
      "summary": "",
      "parent": "online-lecture",
      "url": "/wiki/spring-mvc",
      "updated": "2021-01-04 00:46:04 +0900",
      "children": []
    }
  }
}
 */
function saveTagFiles(tagMap, pageMap) {
    for (let tag in tagMap) {
        var map = {
            fileName: tag,
            collection: {}
        };
        var tagData = tagMap[tag];
        for (var i in tagData) {
            var fileName = tagData[i].fileName;
            map.collection[fileName] = pageMap[fileName]
        }

        if (!fs.existsSync("./data/tag")) {
            fs.mkdirSync("./data/tag");
        }

        fs.writeFile("./data/tag/" + tag + ".json", JSON.stringify(map), function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }
}

/**
 * 태그 하나가 갖는 자식 문서의 수를 ./_data/tagCount.yml 파일로 저장한다.
 * 만약 java 태그가 달린 문서가 4개 있고, spring 태그가 달린 문서가 5개 있다면 tagCount.yml 파일은 다음과 같은 내용을 갖게 된다.
-
    name: java
    size: 4
-
    name: spring
    size: 3
 */
function saveTagCount(tagMap) {
    var list = [];
    for (var tag in tagMap) {
        list.push({
            name: tag,
            size: tagMap[tag].length
        });
    }
    var sortedList = list.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    fs.writeFile("./_data/tagCount.yml", YAML.stringify(sortedList), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("tagCount saved.");
    });
}

function savePageList(pageMap) {
    fs.writeFile("./_data/pageMap.yml", YAML.stringify(pageMap), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("pageMap saved.");
    });
}

function parseInfo(file, info) {
    if (info == null) {
        return undefined;
    }
    const obj = {};
    obj.fileName = file.name.replace(/\.md$/, '');
    obj.type = file.type;

    const rawData = info.split('\n');

    rawData.forEach(function(str) {
        const result = /^\s*([^:]+):\s*(.+)\s*$/.exec(str);

        if (result == null) {
            return;
        }

        const key = result[1].trim();
        const val = result[2].trim().replace(/\[{2}|\]{2}/g, '');

        obj[key] = val;
    });

    if (file.type === 'blog') {
        obj.url = '/blog/' + obj.date.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$1/$2/$3/');
        obj.url += obj.fileName.replace(/^(\d{4}-\d{2}-\d{2}-)?(.*)$/, '$2');
    } else if (file.type === 'wiki') {
        obj.url = '/wiki/' + obj.fileName;
    }

    if (obj.tag) {
        obj.tag = obj.tag.split(/\s+/);
    }

    const mtime = fs.statSync(file.path).mtime;
    obj.modified = mtime;

    return obj;
}

function isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
}

function isMarkdown(fileName) {
    return /\.md$/.test(fileName);
}

function getFiles(path, type, array) {

    fs.readdirSync(path).forEach(function(fileName) {

        const subPath = path + '/' + fileName;

        if (isDirectory(subPath)) {
            return getFiles(subPath, type, array);
        }
        if (isMarkdown(fileName)) {
            const obj = {
                'path': path + '/' + fileName,
                'type': type,
                'name': fileName,
                'children': [],
            };
            return array.push(obj);
        }
    });
}
