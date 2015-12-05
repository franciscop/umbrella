/**
 * .html(text)
 * 
 * Set or retrieve the html from the matched node(s)
 * @param text optional some text to set as html
 * @return this|html Umbrella object
 */
u.prototype.html = function(text) {
  
  // If we're attempting to set some text
  if (text !== undefined) {
    
    // Loop through all the nodes
    this.each(function() {
      
      // Set the inner html to the node
      this.innerHTML = text;
      });
    return this;
    }
  
  else {
    return this.first().innerHTML;
    }
  };
