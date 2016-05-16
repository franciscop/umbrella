// Add class(es) to the matched nodes
u.prototype.addClass = function () {
  return this.eacharg(arguments, function (el, name) {
    el.classList.add(name);
  });
};
