/**
 * .children()
 * 
 * Travel the matched elements one node down
 * @return this Umbrella object
 */
u.prototype.children = function(selector) {
  
  var self = this;
  
  // Get all of the nodes together
  var newNodes = this.nodes.reduce(function(newNodes, node) {
    
    // Assign the new nodes to the array
    return newNodes.concat(self.slice(node.children));
    
  // Filter out those that doesn't match the selector
  }, []).filter(function(child){
    
    // Return 1 if we don't want to filter or if the filter is correct
    return !selector || u(child).is(selector);
  });
  
  return u(newNodes);
};

