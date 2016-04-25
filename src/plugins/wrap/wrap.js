u.prototype.wrap = function(selector) {
  selector = /^\s*</.test(selector) ? selector : '<' + selector + '>';
  var newNodesList = [];

  this.nodes.forEach(function(node) {
    var newNode =
      u(selector)
      .append(node.cloneNode(true));

    node
      .parentNode
      .replaceChild(newNode.nodes[0], node);

    newNodesList
      .push(newNode.nodes[0]);

    this.nodes = newNodesList;
  }, this);

  return this;
};
