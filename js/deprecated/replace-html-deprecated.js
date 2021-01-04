(function() {
  bodyHtml = document.body.innerHTML;
  document.body.innerHTML = bodyHtml.replace(/\u2013|\u2014/g, "--");
})();

$('p').each(function() {
  var text = $(this).text();
  $(this).text(text.replace(/\u2013|\u2014/g, '--'));
});

$('li').text(function() {
  return $(this).text().replace(/\u2013|\u2014/g, '--');
});
