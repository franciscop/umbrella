/**
 * .html(text)
 * 
 * Set or retrieve the html from the matched node(s)
 * @param text optional some text to set as html
 * @return this|html Umbrella object
 */
u.prototype.html = function(text) {
  
  // Get the text from the first node
  if (text === undefined) return this.first().innerHTML || "";
  
  
  // If we're attempting to set some text  
  // Loop through all the nodes
  return this.each(function() {
    
    // Set the inner html to the node
    this.innerHTML = text;
  });
};
