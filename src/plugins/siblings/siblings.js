// Travel the matched elements at the same level
u.prototype.siblings = function (selector) {
  return this.parent().children(selector).not(this);
};
