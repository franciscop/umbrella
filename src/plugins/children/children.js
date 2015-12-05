/**
 * .children()
 * 
 * Travel the matched elements one node down
 * @return this Umbrella object
 */
u.prototype.children = function(selector) {
  
  var newNodes = [];
  
  // Loop through all the nodes
  this.each(function() {
    
    // Assign the new nodes to the array
    newNodes.concat(this.children);
    });
  
  this.nodes = newNodes;
  
  return this;
  }
