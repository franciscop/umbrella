/**
 * .click(callback)
 * 
 * Alternative name for .on('click', callback)
 * @param function callback function called when the event triggers
 * @return this Umbrella object
 */
u.prototype.click = function(callback) {
  
  // Loop through all the nodes
  this.on('click', callback);
  
  return this;
};

