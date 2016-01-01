// .filter(selector)
// Delete all of the nodes that don't pass the selector
u.prototype.filter = function(selector){
  
  // Just a native filtering function for ultra-speed
  return u(this.nodes.filter(function(node){
    
    // Accept a function to filter the nodes
    if (typeof selector === 'function') {
      return selector(node);
    }
    
    // Make it compatible with some other browsers
    node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
    
    // Check if it's the same element (or any element if no selector was passed)
    return node.matches(selector || "*");
  }));
};