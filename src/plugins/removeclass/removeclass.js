/**
 * .removeClass(name)
 *
 * Removes a class from all of the matched nodes
 * @param String name the class name we want to remove
 * @return this Umbrella object
 */
u.prototype.removeClass = function() {
  
  // Loop the combination of each node with each argument
  return this.eacharg(arguments, function(el, name){
    
    // Remove the class using the native method
    el.classList.remove(name);
  });
};
