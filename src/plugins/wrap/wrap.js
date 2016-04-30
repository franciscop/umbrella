u.prototype.wrap = function(selector) {
  // 1) Construct dom node e.g. u('<a>'),
  // 2) clone the currently matched node
  // 3) append cloned dom node to constructed node based on selector
  return this.join(function(node) {
    return u(selector).each(function(n) {
      return findDeepestNode(n).append(node.cloneNode(true));
    })
    // Update new nodes list to be passed
    // along to any possible chained functions
    // e.g. .attr, .addClass, etc
    // return this.nodes;
    .each(function(newNode) {
      node.
        parentNode.
        replaceChild(newNode, node);
    }).nodes;
  });
};

function findDeepestNode(node) {
  try {
    while(node.hasChildNodes()) {
      node = node.firstElementChild;
    }
  } catch (e) {
    console.warn(e);
  }
  return u(node);
}