// .filter(selector)
// Delete all of the nodes that don't pass the selector
u.prototype.filter = function(selector){

  // The default function if it's a css selector
  var callback = function(node){
    
    // Make it compatible with some other browsers
    node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
    
    // Check if it's the same element (or any element if no selector was passed)
    return node.matches(selector || "*");
  }
  
  if (typeof selector == 'function') callback = selector;
  // here to check for u() instances

  if (selector instanceof u) {
    var callback = function (node){
      var nodes = selector.nodes;
      for (var i = nodes.length - 1; i >= 0; i--) {
        if(nodes[i] == node) {
          return true;
        }
      }
      return false;
    };
  }
  
  // Just a native filtering function for ultra-speed
  return u(this.nodes.filter(callback));
};