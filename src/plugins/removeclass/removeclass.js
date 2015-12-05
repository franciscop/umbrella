/**
 * .removeClass(name)
 *
 * Removes a class from all of the matched nodes
 * @param String name the class name we want to remove
 * @return this Umbrella object
 */
u.prototype.removeClass = function(name) {
  
  // Loop through all the nodes
  this.each(function() {
    
    // Remove the class from the node
    this.classList.remove(name.split(" "));
    });
  
  return this;
  };
