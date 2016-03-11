/**
 * .remove()
 * 
 * Delete the matched nodes from the html tree
 */
u.prototype.remove = function() {
  
  // Loop through all the nodes
  return this.each(function(node) {
    
    // Perform the removal
    node.parentNode.removeChild(node);
  });
};
