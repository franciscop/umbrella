// [INTERNAL USE ONLY]

/**
 * .adjacent(position, text)
 * 
 * Add text in the specified position. It is used by other functions
 */
u.prototype.adjacent = function(position, text, data) {
  
  // Loop through all the nodes
  return this.each(function(node) {
    
    // Allow for data to be falsy and still loop once
    u(data || [""]).each(function(d, i){
      
      
      // Allow for callbacks that accept some data
      var tx = (typeof text === 'function') ? text(d, i) : text;
      
      // http://stackoverflow.com/a/23589438
      // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML
      node.insertAdjacentHTML(position, tx);
    });
  });
};
