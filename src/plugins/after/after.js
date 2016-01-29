/**
 * .after(html)
 * 
 * Add child after all of the current nodes
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.after = function(text, data) {
  
  return this.adjacent('afterend', text, data);
};
