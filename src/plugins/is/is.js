// Check whether any of the nodes matches the selector
u.prototype.is = function (selector) {
  return this.filter(selector).length > 0;
};
