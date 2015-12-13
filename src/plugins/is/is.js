// .is(selector)
//
u.prototype.is = function(selector){
  return this.nodes.filter(function(node){
    if (node.matches) return node.matches(selector);
    if (node.msMatchesSelector) return node.msMatchesSelector(selector);
    if (node.webkitMatchesSelector) return node.webkitMatchesSelector(selector);
  }).length > 0;
};