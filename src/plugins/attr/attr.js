// [INTERNAL USE ONLY]

// Handle attributes for the matched elements
u.prototype.attr = function (name, value, data) {
  data = data ? 'data-' : '';

  // This will handle those elements that can accept a pair with these footprints:
  // .css('a'), .css('a', 'b'), .css({ a: 'b' })
  return this.pairs(name, value, function (node, name) {
    return node.getAttribute(data + name);
  }, function (node, name, value) {
    node.setAttribute(data + name, value);
  });
};

// Handle attributes for the matched elements
u.prototype.attr2 = function (name, value, data) {
  data = data ? 'data-' : '';

  if (value !== undefined) {
    var nm = name;
    name = {};
    name[nm] = value;
  }

  if (typeof name === 'object') {
    return this.each(function (node) {
      for (var key in name) {
        node.setAttribute(data + key, name[key]);
      }
    });
  }

  return this.length ? this.first().getAttribute(data + name) : '';
};
