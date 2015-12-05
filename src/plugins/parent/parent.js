/**
 * .parent()
 * 
 * Travel the matched elements one node up
 * @return this Umbrella object
 */
u.prototype.parent = function() {
  
  // Loop through all the nodes
  this.each(function(i) {
    
    // Select each node's parent
    return this.parentNode;
    });
  
  return this;
  }
