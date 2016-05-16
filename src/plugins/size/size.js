// Find the size of the first matched element
u.prototype.size = function () {
  return this.first().getBoundingClientRect();
};
