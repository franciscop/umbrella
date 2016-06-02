// Removes a class from all of the matched nodes
u.prototype.removeClass = function () {
  // Loop the combination of each node with each argument
  return this.eacharg(arguments, function (el, name) {
    // Remove the class using the native method
    el.classList.remove(name);
  });
};
