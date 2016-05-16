// Activate/deactivate classes in the elements
u.prototype.toggleClass = function (classes, addOrRemove) {
  /* jshint -W018 */
  // Check if addOrRemove was passed as a boolean
  if (!!addOrRemove === addOrRemove) {
    return this[addOrRemove ? 'addClass' : 'removeClass'](classes);
  }
  /* jshint +W018 */

  // Loop through all the nodes and classes combinations
  return this.eacharg(classes, function (el, name) {
    el.classList.toggle(name);
  });
};
