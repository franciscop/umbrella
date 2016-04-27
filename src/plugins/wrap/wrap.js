u.prototype.wrap = function(selector) {
  // 1) Construct dom node e.g. u('<a>'),
  // 2) clone the currently matched node
  // 3) append cloned dom node to constructed node based on selector
  return this.join(function outputWrap(node, i) {
  // Update new nodes list to be passed
  // along to any possible chained functions
  // e.g. .attr, .addClass, etc
  // return this.nodes;
    return  u(selector)
              .append(node.cloneNode(true))
              .each(function(newNode) {
                node.
                  parentNode.
                  replaceChild(newNode, node);
              }).nodes;
  });
};
