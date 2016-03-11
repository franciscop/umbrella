// Add some html as a child at the end of each of the matched elements.
u.prototype.append = function(html, data) {
  return this.adjacent('beforeend', html, data);
};
