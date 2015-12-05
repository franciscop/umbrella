/**
 * .each()
 * Loops through every node from the current call
 * it accepts a callback that will be executed on each node
 * The context for 'this' within the callback is the html node
 * The callback has two parameters, the node and the index
 */
u.prototype.each = function(callback) {
  
  // Loop through all the nodes
  for (var i = 0; i < this.nodes.length; i++) {
    
    // Perform the callback for this node
    // By doing callback.call we allow "this" to be the context for
    // the callback (see http://stackoverflow.com/q/4065353 precisely)
    var ret = callback.call(this.nodes[i], this.nodes[i], i);
    
    // Something is returned to change the node
    if (ret)
      
      // Assign the new node the returned value
      this.nodes[i] = ret;
  }
  
  return this;
};
