/**
 * Merge all of the returned nodes
 */
u.prototype.join = function(callback) {
  
  return u(this.nodes.reduce(function(newNodes, node, i){
    
    return newNodes.concat(callback(node, i));
  }, []));
};
