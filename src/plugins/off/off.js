// Removes the callback to the event listener for each node
u.prototype.off = function (events) {
  return this.eacharg(events, function (node, event) {
    u(node._e ? node._e[event] : []).each(function (cb) {
      node.removeEventListener(event, cb);
    });
  });
};
