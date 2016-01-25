// .not(elems)
// Delete all of the nodes that equals elems
u.prototype.not = function(elems){
  if(elems instanceof u){
    var fn = function (node){
      var nodes = elems.nodes;
      for (var i = nodes.length - 1; i >= 0; i--) {
        if(nodes[i] == node) {
          return false;
        }
      }
      return true;
    }
  } else {
    var fn = function (node){
      node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
      return (elems) ? !node.matches(elems) : node.matches('*');
    }
  }

  return this.nodes.filter(fn);
};