/**
 * .each()
 * Loops through every node from the current call
 * it accepts a callback that will be executed on each node
 * The callback has two parameters, the node and the index
 */
u.prototype.each = function(callback) {
  
  // By doing callback.call we allow "this" to be the context for
  // the callback (see http://stackoverflow.com/q/4065353 precisely)
  this.nodes.forEach(callback.bind(this));
  
  return this;
};
