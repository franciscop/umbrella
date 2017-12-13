// [INTERNAL USE ONLY]

// Take the arguments and a couple of callback to handle the getter/setter pairs
// such as: .css('a'), .css('a', 'b'), .css({ a: 'b' })
u.prototype.pairs = function (name, value, get, set) {
  // Convert it into a plain object if it is not
  if (typeof value !== 'undefined') {
    var nm = name;
    name = {};
    name[nm] = value;
  }

  if (typeof name === 'object') {
    // Set the value of each one, for each of the { prop: value } pairs
    return this.each(function (node) {
      for (var key in name) {
        set(node, key, name[key]);
      }
    });
  }

  // Return the style of the first one
  return this.length ? get(this.first(), name) : '';
};
