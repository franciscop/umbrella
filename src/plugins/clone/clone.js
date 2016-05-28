u.prototype.clone = function clone () {
  return this.map(function (node, i) {
    var cloneWithEvents = node.cloneNode(true);
    var l;
    var srcElements = getAll(node);
    var destElements = getAll(cloneWithEvents);

    for (i = 0, l = srcElements.length; i < l; i++) {
      cloneCopyEvent(srcElements[ i ], destElements[ i ]);
    }

    return cloneWithEvents;
  });

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
