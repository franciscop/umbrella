// .not(elems)
// Delete all of the nodes that equals elems
u.prototype.not = function(filter){
  return this.filter(function(node){
    return !u(node).is(filter);
  });
};