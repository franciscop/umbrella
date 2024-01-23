// Find the size of the first matched element
u.prototype.size = function () {
  var first = this.first();

  return first ? first.getBoundingClientRect() : null;
};
