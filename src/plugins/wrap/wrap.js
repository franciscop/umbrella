u.prototype.wrap = function(selector) {
  // Properly format selector e.g if selector === 'a' then
  // it must be changed to '<a>' to be passed into umbrella.js
  // to create a new dom node instead of selecting all elements in dom
  selector = /^\s*</.test(selector) ? selector : '<' + selector + '>';
  var newNodesList = [];

  this.nodes.forEach(function(node) {
    // 1) Construct dom node e.g. u('<a>'),
    // 2) clone the currently matched node
    // 3) append cloned dom node to constructed node based on selector
    // 4) assign node to variable by selecting first index since
    //    umbrella.js returns {nodes: [<..dom node..>]} in this instance
    // Suggest adding u.prototype.getNodes() to return this instead?
    var newNode =
      u(selector)
        .append(node.cloneNode(true))
        .nodes[0];

    // Replace original node with new
    // node wrapped with chosen selector
    node
      .parentNode
      .replaceChild(newNode, node);

    // Update new nodes list to be passed
    // along to any possible chained functions
    // e.g. .attr, .addClass, etc
    newNodesList
      .push(newNode);
  }, this);

  this.nodes = newNodesList;
  return this;
};
