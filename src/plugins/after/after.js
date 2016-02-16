// Add some html as a sibling after each of the matched elements.
u.prototype.after = function(text, data) {
  return this.adjacent('afterend', text, data);
};
