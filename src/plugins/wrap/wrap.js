u.prototype.wrap = function(selector) {
  selector = /^\s*</.test(selector) ? selector : '<' + selector + '>';
  var that = this,
      nodesList = [];

  that.nodes.forEach(function(node) {
    var wrapperNode = u(selector);
    var ac = wrapperNode.append(node.cloneNode(true));
    node.parentNode.replaceChild(ac.nodes[0], node);
    nodesList.push(ac.nodes[0]);
    that = ac;
    that.nodes = nodesList;
  });

  return that;
};
