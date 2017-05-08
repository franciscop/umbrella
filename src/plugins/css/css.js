// Set or retrieve the computed style from the matched node(s)
u.prototype.css = function (prop, value) {
  // multiple styles wrapped in object
  if (typeof prop === 'object') {
    for (var style in prop) {
      if (prop.hasOwnProperty(style)) {
        this.css(style, prop[style]);
      }
    }
    return this;
  }

  // convert kebab-case to camelCase
  prop = prop.replace(/-([a-z])/g, function (a) {
    return a[1].toUpperCase();
  });

  if (value === undefined) {
    return this.first().style[prop];
  }

  // number without unit
  if (typeof value === 'number') {
    value += 'px';
  }

  return this.each(function (node) {
    node.style[prop] = value;
  });
};
