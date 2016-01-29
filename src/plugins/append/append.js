/**
 * .append(html)
 * 
 * Add child the last thing inside each node
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.append = function(html, data) {
  
  return this.adjacent('beforeend', html, data);
};
