// Handle data-* attributes for the matched elements
u.prototype.data = function (name, value) {
  return this.attr(name, value, true);
};
