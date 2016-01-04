/**
 * .addClass(name1, name2, ...)
 * 
 * Add a class to the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.addClass = function(args){
  
  // Normalize the arguments to a simple array
  args = this.args(arguments);
  
  // Loop through all the nodes
  return this.each(function(el){
    
    // Loop and add each of the classes
    args.forEach(function(name){
      el.classList.add(name);
    });
  });
};
