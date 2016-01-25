// .not(elems)
// Delete all of the nodes that equals elems
u.prototype.not = function(elems){

  function fn(node){
  	var nodes = elems.nodes;
    for (var i = nodes.length - 1; i >= 0; i--) {
      if(nodes[i] == node) {
        return false;
      }
    }
    return true;
  }

  return (typeof elems === 'undefined') ? this.nodes : this.nodes.filter(fn);
};