/**
 * .parent()
 * 
 * Travel the matched elements one node up
 * @return this Umbrella object
 */
u.prototype.parent = function() {
  
  // Clone it
  return u(this.nodes).each(function(el) {
    
    // Select each node's parent
    return el.parentNode;
  });
};
