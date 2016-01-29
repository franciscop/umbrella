/**
 * .prepend(html)
 * 
 * Add child the first thing inside each node
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.prepend = function(html, data) {
  
  return this.adjacent('afterbegin', html, data);
};
