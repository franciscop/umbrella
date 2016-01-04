/**
 * .hasClass(name)
 * 
 * Find out whether the matched elements have a class or not
 * @param String name the class name we want to find
 * @return boolean wether the nodes have the class or not
 */
u.prototype.hasClass = function(names) {
  
  names = this.args(arguments);
  
  // Attempt to find a node that passes the conditions
  return this.nodes.some(function(node){
    
    // Check if the current node has all of the classes
    return names.every(function(name){
      
      //  Check whether
      return node.classList.contains(name)
    });
  });
};
