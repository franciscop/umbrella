/**
 * Get the last of the nodes
 * @return htmlnode the last html node in the matched nodes
 */
u.prototype.last = function() {
  
  return this.nodes[this.length-1] || false;
};
