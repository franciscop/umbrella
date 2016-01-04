/**
 * .parent()
 * 
 * Travel the matched elements one node up
 * @return this Umbrella object
 */
u.prototype.parent = function(selector) {
  
  return this.join(function(node){
    return node.parentNode;
  }).filter(selector);
};
