// Attach a callback to the specified events
u.prototype.on = function(events, callback) {
  
  return this.eacharg(events, function(node, event){
    node.addEventListener(event, callback);
    
    // Store it so we can dereference it with `.off()` later on
    node._e = node._e || {};
    node._e[event] = (node._e[event] || []).concat(callback);
  });
};
