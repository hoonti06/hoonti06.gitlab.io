(function() {
  bodyHtml = document.body.innerHTML;
  document.body.innerHTML = bodyHtml.replace(/\u2013|\u2014/g, "--");
})();
