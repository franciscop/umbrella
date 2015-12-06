/**
 * .adjacent(position, text)
 * 
 * Add text in the specified position. It is used by other functions
 */
u.prototype.adjacent = function(position, text) {
  
  // Loop through all the nodes
  return this.each(function(node) {
    
    // http://stackoverflow.com/a/23589438
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML
    node.insertAdjacentHTML(position, text);
    });
  };
