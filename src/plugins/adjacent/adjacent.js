// [INTERNAL USE ONLY]

/**
 * .adjacent(position, text)
 * 
 * Add text in the specified position. It is used by other functions
 */
u.prototype.adjacent = function(position, text, data) {
  
  // Loop through all the nodes. It cannot reuse the eacharg() since the data
  // we want to do it once even if there's no "data"
  return this.each(function(node) {
    
    // Allow for data to be falsy and still loop once
    u(data || [""]).each(function(el){
      
      // Allow for callbacks that accept some data
      var tx = (typeof text === 'function') ? text.call(this, node, el) : text;
      
      // http://stackoverflow.com/a/23589438
      // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML
      node.insertAdjacentHTML(position, tx);
    });
  });
};
