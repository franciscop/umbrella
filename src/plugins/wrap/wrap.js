u.prototype.wrap = function(selector) {
  selector = /^\s*</.test(selector) ? selector : '<' + selector + '>';
  var newNodesList = [];

  this.nodes.forEach(function(node) {
    var newNode =
      u(selector)
        .append(node.cloneNode(true))
        .nodes[0];

    node
      .parentNode
      .replaceChild(newNode, node);

    newNodesList
      .push(newNode);
  }, this);

  this.nodes = newNodesList;
  return this;
};
