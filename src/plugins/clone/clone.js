u.prototype.mirror = {};

/**
 * Copy all JavaScript events of source node to destination node.
 * @param  {[Object]} source      DOM node
 * @param  {[Object]} destination DOM node
 * @return {[undefined]]}
 */
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

/**
 * Return an array of DOM nodes of a source node and its children.
 * @param  {[Object]} context DOM node.
 * @param  {[String]} tag     DOM node tagName.
 * @return {[Array]}          Array containing queried DOM nodes.
 */
u.prototype.getAll = function getAll (context, tag) {
  // Mostly code borrowed from jQuery: https://github.com/jquery/jquery/blob/305f193aa57014dc7d8fa0739a3fefd47166cd44/src/manipulation.js
  return [context].concat(u(tag || '*', context).nodes);
};

/**
 * Deep clone a DOM node and its descendants. Applies extension functions, if provided.
 * @param  {[Object]} options Optional extensions object. Example use: u(...).clone({select: true});
 * @return {[Object]}         Returns an Umbrella.js instance.
 */
u.prototype.clone = function clone (options) {
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

/**
 * Copy select input value to its clone.
 * @param  {[Object]} src  DOM node
 * @param  {[Object]} dest DOM node
 * @return {[undefined]}
 */
u.prototype.mirror.select = function (src, dest) {
  if (src.nodeName === 'SELECT') {
    dest.value = src.value;
  }
};

/**
 * Copy textarea input value to its clone
 * @param  {[Object]} src  DOM node
 * @param  {[Object]} dest DOM node
 * @return {[undefined]}
 */
u.prototype.mirror.textarea = function (src, dest) {
  if (src.nodeName === 'TEXTAREA') {
    dest.value = src.value;
  }
};
