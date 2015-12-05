/**
 * Find all the nodes children of the current ones matched by a selector
 * @return htmlnode the first html node in the matched nodes
 */
u.prototype.find = function(selector) {
  
  selector = selector || "*";
  
  var newNodes = [];
  
  this.each(function(){
    var list = this.querySelectorAll(selector);
    newNodes = newNodes.concat(Array.prototype.slice.call(list, 0));
    });
  
  this.nodes = newNodes;
  return this;
  };
