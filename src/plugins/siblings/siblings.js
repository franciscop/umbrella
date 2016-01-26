/**
 * .siblings()
 * 
 * Travel the matched elements at the same level
 * @return this Umbrella object
 */
u.prototype.siblings = function(selector) {
  return this.parent().children(selector).not(this);
};