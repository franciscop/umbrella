/**
 * Find all the nodes children of the current ones matched by a selector
 */
u.prototype.find = function(selector) {
  
  selector = selector || "*";
  
  return u(this.nodes.reduce(function(newNodes, node){
    
    return newNodes.concat(u(selector, node).nodes);
  }, []));
};
