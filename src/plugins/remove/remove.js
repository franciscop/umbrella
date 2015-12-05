/**
 * .remove()
 * 
 * Delete the matched nodes from the html tree
 */
u.prototype.remove = function() {
  
  // Loop through all the nodes
  this.each(function() {
    
    // Perform the removal
    this.parentNode.removeChild(this);
    });
  };
