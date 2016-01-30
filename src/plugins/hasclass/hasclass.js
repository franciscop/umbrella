/**
 * .hasClass(name)
 * 
 * Find out whether the matched elements have a class or not
 * @param String name the class name we want to find
 * @return boolean wether the nodes have the class or not
 */
u.prototype.hasClass = function(names) {
  
  // Check if any of them has all of the classes
  return this.is('.' + this.args(arguments).join('.'));
};
