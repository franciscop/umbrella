/**
 * .on(event, callback)
 * 
 * Attach the callback to the event listener for each node
 * @param String event(s) the type of event ('click', 'submit', etc)
 * @param function callback function called when the event triggers
 * @return this Umbrella object
 */
u.prototype.on = function(events, callback) {
  
  return this.eacharg(events, function(node, event){
    node.addEventListener(event, callback);
    node._e = node._e || {};
    node._e[event] = (node._e[event] || []).concat(callback);
  });
};
