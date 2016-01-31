/**
 * Merge all of the nodes that the callback returns
 */
u.prototype.join = function(callback) {
  
  var self = this;
  
  return u(this.nodes.reduce(function(newNodes, node, i){
    
    return newNodes.concat(callback.call(self, node, i));
  }, [])).unique();
};
