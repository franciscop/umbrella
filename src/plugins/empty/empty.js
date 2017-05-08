// Remove all children of the matched nodes from the DOM.
u.prototype.empty = function () {
  return this.each(function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  });
};
