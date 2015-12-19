/**
 * .each()
 * Loops through every node from the current call
 * it accepts a callback that will be executed on each node
 * The context for 'this' within the callback is the html node
 * The callback has two parameters, the node and the index
 */
u.prototype.each = function(callback) {
  
  // Loop through all the nodes
  this.nodes.forEach(function(node, i){
    
    // Perform the callback for this node
    // By doing callback.call we allow "this" to be the context for
    // the callback (see http://stackoverflow.com/q/4065353 precisely)
    callback.call(node, node, i);
  });
  
  return this;
};
