u.prototype.wrap = function(selector) {
  // 1) Construct dom node e.g. u('<a>'),
  // 2) clone the currently matched node
  // 3) append cloned dom node to constructed node based on selector
  this.nodes = this.join(function wtf(node, i) {
    var newNode = 
      u(selector)
        .append(node.cloneNode(true))
        .each(function(newNode) {
          node.
            parentNode.
            replaceChild(newNode, node);
        });
        
    return newNode.nodes;
  });

  // Update new nodes list to be passed
  // along to any possible chained functions
  // e.g. .attr, .addClass, etc
  return this.nodes;
};