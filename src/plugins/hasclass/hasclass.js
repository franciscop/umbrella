/**
 * .hasClass(name)
 * 
 * Find out whether the matched elements have a class or not
 * @param String name the class name we want to find
 * @return boolean wether the nodes have the class or not
 */
u.prototype.hasClass = function(name) {
  
  // Default value
  var doesItContain = false;
  
  // Loop through all of the matched elements
  this.each(function(){
    
    // Check for multiple classes
    name.split(" ").forEach(function(value){
      
      // This check is needed to avoid setting it to false
      if (this.classList.contains(value))
        
        // Store the value
        doesItContain = true;
      }, this);
    });
  
  return doesItContain;
  };
