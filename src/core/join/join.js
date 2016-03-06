// [INTERNAL USE ONLY]
// Merge all of the nodes that the callback returns
u.prototype.join = function(callback) {
  //return u(this.array(callback)).unique();

  var self = this;
  return u(this.nodes.reduce(function(newNodes, node, i){
    return newNodes.concat(callback.call(self, node, i));
  }, [])).unique();
};
