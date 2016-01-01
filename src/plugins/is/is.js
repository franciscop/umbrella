// .is(selector)
// Check whether any of the nodes is of the type of the selector passed
u.prototype.is = function(selector){
  
  // Just an idea for the future
  return this.filter(selector).nodes.length > 0;
};