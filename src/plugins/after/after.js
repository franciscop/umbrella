// Add some html as a sibling after each of the matched elements.
u.prototype.after = function (html, data) {
  return this.adjacent(html, data, function (node, fragment) {
    node.parentNode.insertBefore(fragment, node.nextSibling);
  });
};
