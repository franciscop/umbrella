// Removes the callback to the event listener for each node
u.prototype.off = function (events, to_be_removed_cb) {
  var cb_filter_off = (to_be_removed_cb == null);

  return this.eacharg(events, function (node, event) {
    u(node._e ? node._e[event] : []).each(function (ref) {
      if (cb_filter_off || ref.orig_callback === to_be_removed_cb) {
        node.removeEventListener(event, ref.callback);
      }
    });
  });
};
