// Add some html before each of the matched elements.
u.prototype.before = function(html, data) {
  return this.adjacent('beforebegin', html, data);
};
