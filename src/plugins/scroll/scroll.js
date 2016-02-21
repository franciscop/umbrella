/**
 * .scroll()
 *
 * Scroll to the first matched element
 * @return matched element
 */
u.prototype.scroll = function() {

  this.first().scrollIntoView({
    behavior: 'smooth'
  });

  return this.first();
};
