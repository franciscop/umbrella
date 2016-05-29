u.prototype.mirror = {};

u.prototype.mirror.events = function events (source, destination) {
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
};

u.prototype.getAll = function getAll (context, tag) {
  // Mostly code borrowed from jQuery: https://github.com/jquery/jquery/blob/305f193aa57014dc7d8fa0739a3fefd47166cd44/src/manipulation.js
  var rtn = u(tag || '*', context);
  return rtn.length ? rtn.nodes : [context];
};

u.prototype.clone = function clone () {
  return this.map(function (node, i) {
    var clone = node.cloneNode(true);
    var l;
    var srcElements = this.getAll(node);
    var destElements = this.getAll(clone);
    var mirrorObject = this.mirror;

    for (i = 0, l = srcElements.length; i < l; i++) {
      mirrorObject.events(srcElements[ i ], destElements[ i ]);
    }

    for (var key in mirrorObject) {
      if (mirrorObject[key].name !== 'events') {
        mirrorObject[key](srcElements[ i ], destElements[ i ]);
      }
    }

    return clone;
  });
};
