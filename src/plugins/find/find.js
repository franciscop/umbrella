/**
 * Find all the nodes children of the current ones matched by a selector
 */
u.prototype.find = function(selector) {
  
  selector = selector || "*";
  
  var newNodes = [];
  
  this.each(function(){
    // newNodes.push(u(selector, this).nodes);
    var list = this.querySelectorAll(selector);
    newNodes = newNodes.concat(Array.prototype.slice.call(list, 0));
  });
  
  return u(newNodes);
};
