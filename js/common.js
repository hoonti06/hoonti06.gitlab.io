function getTagIfOnlyOneExistsIn(parentElement, tagName) {
  let tags = parentElement.getElementsByTagName(tagName);
  if (tags && tags.length == 1)
    return tags[0];
  else
    return null;
}

function getClassIfOnlyOneExistsIn(parentElement, className) {
  let classes = parentElement.getElementsByClassName(className);
  if (classes && classes.length == 1)
    return classes[0];
  else
    return null;
}
