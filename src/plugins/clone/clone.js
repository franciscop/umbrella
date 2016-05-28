u.prototype.clone = function clone () {
  return this.map(function (node, i) {
    var clone = node.cloneNode(true);
    var l;
    var srcElements = getAll(node);
    var destElements = getAll(clone);

    for (i = 0, l = srcElements.length; i < l; i++) {
      cloneCopyEvent(srcElements[ i ], destElements[ i ]);
    }

    return clone;
  });

  // Mostly code borrowed from jQuery: https://github.com/jquery/jquery/blob/305f193aa57014dc7d8fa0739a3fefd47166cd44/src/manipulation.js
  // These should probably be moved elsewhere
  // TODO: form input support. data attr support?
  function getAll (context, tag) {
    var ret = typeof context.getElementsByTagName !== 'undefined'
      ? context.getElementsByTagName(tag || '*')
      : [];

    return ret.length ? ret : [context];
  }

  function cloneCopyEvent (source, destination) {
    var i;
    var l;
    var type;
    var events;

    if (source._e) {
      events = source._e;
      for (type in events) {
        for (i = 0, l = events[type].length; i < l; i++) {
          u(destination).on(type, events[type][i]);
        }
      }
    }
  }
};
