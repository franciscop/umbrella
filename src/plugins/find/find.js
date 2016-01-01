/**
 * Find all the nodes children of the current ones matched by a selector
 */
u.prototype.find = function(selector) {
  
  return this.join(function(node){
    return u(selector || "*", node).nodes;
  });
};
