/**
 * Deep clone a DOM node and its descendants.
 * @return {[Object]}         Returns an Umbrella.js instance.
 */
u.prototype.clone = function () {
  return this.map(function (node, i) {
    var clone = node.cloneNode(true);
    var dest = this.getAll(clone);

    this.getAll(node).each(function (src, i) {
      for (var key in this.mirror) {
        if (this.mirror[key]) {
          this.mirror[key](src, dest.nodes[i]);
        }
      }
    });

    return clone;
  });
};

/**
 * Return an array of DOM nodes of a source node and its children.
 * @param  {[Object]} context DOM node.
 * @param  {[String]} tag     DOM node tagName.
 * @return {[Array]}          Array containing queried DOM nodes.
 */
u.prototype.getAll = function getAll (context) {
  return u([context].concat(u('*', context).nodes));
};

// Store all of the operations to perform when cloning elements
u.prototype.mirror = {};

/**
 * Copy all JavaScript events of source node to destination node.
 * @param  {[Object]} source      DOM node
 * @param  {[Object]} destination DOM node
 * @return {[undefined]]}
 */
u.prototype.mirror.events = function (src, dest) {
  if (!src._e) return;

  for (var type in src._e) {
    src._e[type].forEach(function (event) {
      u(dest).on(type, event);
    });
  }
};

/**
 * Copy select input value to its clone.
 * @param  {[Object]} src  DOM node
 * @param  {[Object]} dest DOM node
 * @return {[undefined]}
 */
u.prototype.mirror.select = function (src, dest) {
  if (u(src).is('select')) {
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
  if (u(src).is('textarea')) {
    dest.value = src.value;
  }
};
