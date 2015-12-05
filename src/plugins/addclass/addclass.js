/**
 * .addClass(name1, name2, ...)
 * 
 * Add a class to the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.addClass = function(){
  
  // Normalize the arguments to a string of comma separated elements
  var args = Array.prototype.slice.call(arguments);
  
  // Loop through all the nodes
  return this.each(function(el){
    
    // Allow for several class names like "a b c" and several parameters
    // toString() is to flatten the array: http://stackoverflow.com/q/22920305
    // It could be easier, but we still have to support IE10+ caniuse.com/#search=classList
    args.toString().replace(/\s/, ',').split(",").forEach(function(name){
      if (name) el.classList.add(name);
    });
  });
};
