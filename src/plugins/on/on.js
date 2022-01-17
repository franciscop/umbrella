// Attach a callback to the specified events
u.prototype.on = function (events, cb, cb2) {
  var selector = null;
  var orig_callback = cb;
  if (typeof cb === 'string') {
    selector = cb;
    orig_callback = cb2;
    cb = function (e) {
      var args = arguments;
      u(e.currentTarget)
        .find(selector)
        .each(function (target) {
          // The event is triggered either in the correct node, or a child
          // of the node that we are interested in
          // Note: .contains() will also check itself (besides children)
          if (!target.contains(e.target)) return;

          // If e.g. a child of a link was clicked, but we are listening
          // to the link, this will make the currentTarget the link itself,
          // so it's the "delegated" element instead of the root target. It
          // makes u('.render a').on('click') and u('.render').on('click', 'a')
          // to have the same currentTarget (the 'a')
          var curr = e.currentTarget;
          Object.defineProperty(e, 'currentTarget', {
            value: target,
            configurable: true
          });
          cb2.apply(target, args);
          // Need to undo it afterwards, in case this event is reused in another
          // callback since otherwise u(e.currentTarget) above would break
          Object.defineProperty(e, 'currentTarget', {
            value: curr,
            configurable: true
          });
        });
    };
  }

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
      selector: selector
    });
  });
};
