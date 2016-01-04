/**
 * .removeClass(name)
 *
 * Removes a class from all of the matched nodes
 * @param String name the class name we want to remove
 * @return this Umbrella object
 */
u.prototype.removeClass = function(args) {
  
  // Normalize the arguments to a simple array
  args = this.args(arguments);
  
  // Loop through all the nodes
  return this.each(function(el){
    
    // Loop and add each of the classes
    args.forEach(function(name){
      el.classList.remove(name);
    });
  });
};
