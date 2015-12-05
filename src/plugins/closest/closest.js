/**
 * .closest()
 * 
 * Find a node that matches the passed selector
 * @return this Umbrella object
 */
u.prototype.closest = function(selector) {
  
  var newNodes = [];
  
  // Loop through all the nodes
  this.each(function() {
    
    var current = this;
    
    while (current) {
      
      // Native function
      if (typeof current.matches === "function" &&
          current.matches(selector)) {
        newNodes.unshift(current);
        }
      
      else {
        if (typeof current.msMatchesSelector === "function" &&
            current.msMatchesSelector(selector)) {
          newNodes.unshift(current);
          }
          
        if (typeof current.mozMatchesSelector === "function" &&
            current.mozMatchesSelector(selector)) {
          newNodes.unshift(current);
          }
        
        if (typeof current.webkitMatchesSelector === "function" &&
            current.webkitMatchesSelector(selector)) {
          newNodes.unshift(current);
          }
        
        if (typeof current.oMatchesSelector === "function" &&
            current.oMatchesSelector(selector)) {
          newNodes.unshift(current);
          }
        }

      
      current = current.parentNode;
      }
    // Assign the new nodes to the array
    newNodes.concat(this.children);
    });
  
  this.nodes = newNodes;
  
  return this;
  }
