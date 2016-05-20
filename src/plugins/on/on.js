// Attach a callback to the specified events
u.prototype.on = function (events, cb, cb2) {
  if (typeof cb === 'string') {
    return this.on(events, function (e) {
      var args = arguments;
      u(cb, e.currentTarget).each(function (node) {
        cb2.apply(node, args);
      });
    });
  }

  // Add the custom data as arguments to the callback
  var callback = function (e) {
    return cb.apply(this, [e].concat(e.detail || []));
  };

  return this.eacharg(events, function (node, event) {
    node.addEventListener(event, callback);

    // Store it so we can dereference it with `.off()` later on
    node._e = node._e || {};
    node._e[event] = node._e[event] || [];
    node._e[event].push(callback);
  });
};
