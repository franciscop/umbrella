/**
 * .closest()
 * 
 * Find a node that matches the passed selector
 * @return this Umbrella object
 */
u.prototype.closest = function(selector) {
  
  // Loop through all the nodes
  return u(this.nodes.reduce(function(newNodes, node) {
    
    // Keep going up and up on the tree
    while (node) {
      
      if (u(node).is(selector)) {
        return newNodes.concat(node);
      }
      
      node = node.parentNode;
    }
    
    return newNodes;
  }, [])).unique();
};
