/**
 * .addClass(name)
 * 
 * Add a class to the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @param String name the class name we want to add
 * @return this Umbrella object
 */
u.prototype.addClass = function(){
  
  var name = Array.prototype.slice.call(arguments).join(" ");
  
  // Loop through all the nodes
  this.each(function(el){
    
    // Allow for several class names like "a b c" and several parameters
    if (name) {
      name.split(" ").forEach(function(name){
        el.classList.add(name);
      });
    }
  });
  
  return this;
};
