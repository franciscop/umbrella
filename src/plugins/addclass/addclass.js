/**
 * .addClass(name1, name2, ...)
 * 
 * Add a class to the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.addClass = function(){
  
  // Loop the combination of each node with each argument
  return this.eacharg(arguments, function(el, name){
    
    // Add the class using the native method
    el.classList.add(name);
  });
};
