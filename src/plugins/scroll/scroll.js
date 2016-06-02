// Scroll to the first matched element
u.prototype.scroll = function () {
  this.first().scrollIntoView({ behavior: 'smooth' });
  return this;
};
