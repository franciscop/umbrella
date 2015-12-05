/**
 * .addClass(name)
 * 
 * Add a class to the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @param String name the class name we want to add
 * @return this Umbrella object
 */
u.prototype.addClass = function(name){
  
  // Loop through all the nodes
  this.each(function(){
    
    // Allow for several class names like "a b c"
    this.classList.add(name.split(" "));
    
    });
  
  return this;
  };
