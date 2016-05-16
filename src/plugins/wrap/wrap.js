u.prototype.wrap = function (selector) {
  function findDeepestNode (node) {
    while (node.firstElementChild) {
      node = node.firstElementChild;
    }

    return u(node);
  }
  // 1) Construct dom node e.g. u('<a>'),
  // 2) clone the currently matched node
  // 3) append cloned dom node to constructed node based on selector
  return this.map(function (node) {
    return u(selector).each(function (n) {
      findDeepestNode(n)
        .append(node.cloneNode(true));

      node
        .parentNode
        .replaceChild(n, node);
    });
  });
};
