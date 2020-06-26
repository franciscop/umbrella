// Attach a callback to the specified events
u.prototype.on = function (events, cb, cb2) {
  var sel = null;
  var orig_callback = cb;
  if (typeof cb === 'string') {
    sel = cb;
    orig_callback = cb2;
    cb = function (e) {
      var args = arguments;
      var targetFound = false;
      u(e.currentTarget)
        .find(sel)
        .each(function (target) {
          if (target === e.target || target.contains(e.target)) {
            targetFound = true;
            try {
              Object.defineProperty(e, 'currentTarget', {
                get: function () {
                  return target;
                }
              });
            } catch (err) { }
            cb2.apply(target, args);
          }
        });
      // due to e.currentEvent reassigning a second (or subsequent) handler may
      // not be fired for a single event, so chekc and apply if needed.
      if (!targetFound && e.currentTarget === e.target) {
        cb2.apply(e.target, args);
      }
    };
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
    node._e[event].push({
      callback: callback,
      orig_callback: orig_callback,
      selector: sel
    });
  });
};
