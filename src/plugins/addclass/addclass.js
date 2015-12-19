/**
 * .addClass(name1, name2, ...)
 * 
 * Add a class to the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.addClass = function(){
  
  // Normalize the arguments to a string of comma separated elements
  // Allow for several class names like "a b c" and several parameters
  // toString() is to flatten the array: http://stackoverflow.com/q/22920305
  var args = this.slice(arguments).toString().split(/[\s,]+/);
  
  // Loop through all the nodes
  return this.each(function(el){
    
    // Loop and add each of the classes
    args.forEach(function(name){
      if (name) el.classList.add(name);
    });
  });
};
