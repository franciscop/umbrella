/**
 * .hasClass(name)
 * 
 * Find out whether the matched elements have a class or not
 * @param String name the class name we want to find
 * @return boolean wether the nodes have the class or not
 */
u.prototype.hasClass = function() {
  
  // Default value
  var doesItContain = false;
  var names = Array.prototype.slice.call(arguments).toString().split(/[\s,]+/);
  
  // Loop through all of the matched elements
  this.each(function(){
    
    var elemHasClass = true;
    
    // Check for multiple classes
    names.forEach(function(value){
      
      // This check is needed to avoid setting it to false
      if (!this.classList.contains(value))
        
        // Store the value
        elemHasClass = false;
    }, this);
    
    if (elemHasClass) doesItContain = true;
  });
  
  return doesItContain;
};
