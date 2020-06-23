// Removes the callback to the event listener for each node
u.prototype.off = function (events, cb, cb2) {
  var cb_filter_off = (cb == null && cb2 == null);
  var sel = null;
  var cb_to_be_removed = cb;
  if (typeof cb === 'string') {
    sel = cb;
    cb_to_be_removed = cb2;
  }

  return this.eacharg(events, function (node, event) {
    u(node._e ? node._e[event] : []).each(function (ref) {
      if (cb_filter_off || (ref.orig_callback === cb_to_be_removed && ref.selector === sel)) {
        node.removeEventListener(event, ref.callback);
      }
    });
  });
};
