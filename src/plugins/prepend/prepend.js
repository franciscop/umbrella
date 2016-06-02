// Add nodes at the beginning of each node
u.prototype.prepend = function (html, data) {
  return this.adjacent(html, data, function (node, fragment) {
    node.insertBefore(fragment, node.firstChild);
  });
};
