// Merge all of the nodes that the callback return into a simple array
u.prototype.array = function(callback){
  callback = callback || function(node) { return node.innerHTML; };
  var self = this;
  return this.nodes.reduce(function(list, node, i){
    var val = callback.call(self, node, i);
    return list.concat(val !== undefined && val !== null ? val : []);
  }, []);
};
