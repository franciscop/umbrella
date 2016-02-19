// Add class(es) to the matched nodes
u.prototype.addClass = function(){
  
  // Loop the combination of each node with each argument
  return this.eacharg(arguments, function(el, name){
    el.classList.add(name);
  });
};