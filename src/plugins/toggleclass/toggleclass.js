/**
 * .toggleClass('name1, name2, nameN' ...[, addOrRemove])
 *
 * Toggles classes on the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.toggleClass = function(classes, addOrRemove){

  /*jshint -W018 */
  //check if addOrRemove was passed as a boolean
  if (!!addOrRemove === addOrRemove) {

    // return the corresponding Umbrella method
    return this[addOrRemove ? 'addClass' : 'removeClass'](classes);
  }
  /*jshint +W018 */

  // Loop through all the nodes and classes combinations
  return this.eacharg(classes, function(el, name){
    el.classList.toggle(name);
  });
};
