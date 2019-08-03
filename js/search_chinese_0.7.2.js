(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

	
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      //this.field('author');
      //this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        //'author': window.store[key].author,
        //'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();



//! function() {
//    function e(e, t) {
//        var n = document.getElementById("search-results");
//        if (e.length) {
//            for (var o = "", r = 0; r < e.length; r++) {
//                var i = t[e[r].ref];
//                o += '<li><a href="' + i.url + '"><h3>' + i.title + "</h3></a>", o += "<p>" + i.content.substring(0, 150) + "...</p></li>"
//            }
//            n.innerHTML = o
//        } else n.innerHTML = "<li>No results found</li>"
//    }
//
//    function t(e) {
//        for (var t = window.location.search.substring(1), n = t.split("&"), o = 0; o < n.length; o++) {
//            var r = n[o].split("=");
//            if (r[0] === e) return decodeURIComponent(r[1].replace(/\+/g, "%20"))
//        }
//    }
//    var n = t("query");
//    if (n) {
//        document.getElementById("search-box").setAttribute("value", n);
//        var o = new lunr.Index;
//        o.field("id"), o.field("title", {
//            boost: 10
//        }), o.field("author"), o.field("category"), o.field("content"), console.log(o);
//        for (var r in window.store) {
//            o.add({
//                id: r,
//                title: window.store[r].title,
//                author: window.store[r].author,
//                category: window.store[r].category,
//                content: window.store[r].content
//            });
//            var i = o.search(n);
//            e(i, window.store)
//        }
//    }
//}();
