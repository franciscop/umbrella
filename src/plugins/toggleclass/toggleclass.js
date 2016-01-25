/**
 * .toggleClass('name1, name2, nameN' ...[, addOrRemove])
 * 
 * Toggles classes on the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.toggleClass = function(classes, addOrRemove){
  
  // Normalize the arguments to a simple array
  classes = this.args(classes);

  //check if addOrRemove was passed
  if (typeof addOrRemove === 'boolean') {

    // return the corresponding Umbrella method
    return (addOrRemove) ? this.addClass(classes) : this.removeClass(classes);
  }
  
  // Loop through all the nodes and classes
  return this.eacharg(classes, function(el, name){
    el.classList.toggle(name);
  });
};
