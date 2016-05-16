// Add some html as a child at the end of each of the matched elements.
u.prototype.append = function (html, data) {
  return this.adjacent(html, data, function (node, fragment) {
    node.appendChild(fragment);
  });
};
