// [INTERNAL USE ONLY]

// Make the nodes unique. This is needed for some specific methods
u.prototype.unique = function(){
  
  return u(this.nodes.reduce(function(clean, node){
    return (node && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
  }, []));
};