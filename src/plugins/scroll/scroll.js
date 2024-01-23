// Scroll to the first matched element
u.prototype.scroll = function () {
  var first = this.first();

  if (first) {
    first.scrollIntoView({ behavior: 'smooth' });
  }

  return this;
};
