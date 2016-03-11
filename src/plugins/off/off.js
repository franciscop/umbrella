/**
 * .off(event, callback)
 *
 * Removes the callback to the event listener for each node
 * @param String event(s) the type of event ('click', 'submit', etc)
 * @return this Umbrella object
 */
u.prototype.off = function(events) {
  return this.eacharg(events, function(node, event){
    u(node._e ? node._e[event] : []).each(function(cb) {
      node.removeEventListener(event, cb);
    });
  });
};
