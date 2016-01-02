/**
 * Merge all of the returned nodes
 */
u.prototype.join = function(selector) {
  
  return u(this.nodes.reduce(function(newNodes, node, i){
    
    return newNodes.concat(selector(node, i));
  }, [])).unique();
};
