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

u.prototype.clone = function clone (options /* {select: false} */) {
  return this.map(function (node, i) {
    var clone = node.cloneNode(true);
    var l;
    var srcElements = this.getAll(node);
    var destElements = this.getAll(clone);
    var mirrorObject = this.mirror;

    for (i = 0, l = srcElements.length; i < l; i++) {
      mirrorObject.events(srcElements[ i ], destElements[ i ]);
    }

    if (options) {
      for (var key in options) {
        if (options.hasOwnProperty(key) && options[key] !== 'events') {
          this.mirror[key](node, clone);
        }
      }
    }

    return clone;
  });
};

/* Clone method extensions */

// Copy select input value to its clone
u.prototype.mirror.select = function (src, dest) {
  if (src.nodeName === 'SELECT') {
    dest.value = src.value;
  }
};

// Copy select input value to its clone
u.prototype.mirror.textarea = function (src, dest) {
  if (src.nodeName === 'TEXTAREA') {
    dest.value = src.value;
  }
};
