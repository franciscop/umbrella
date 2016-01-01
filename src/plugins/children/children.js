/**
 * .children()
 * 
 * Travel the matched elements one node down
 * @return this Umbrella object
 */
u.prototype.children = function(selector) {
  
  var self = this;
  
  return this.join(function(node){
    return self.slice(node.children);
  }).filter(selector);
};

