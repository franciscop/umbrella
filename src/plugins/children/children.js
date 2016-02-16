// Get the direct children of all of the nodes with an optional filter
u.prototype.children = function(selector) {
  return this.join(function(node){
    return this.slice(node.children);
  }).filter(selector);
};

