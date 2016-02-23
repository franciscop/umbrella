/**
 * .scroll()
 *
 * Scroll to the first matched element
 * @return this Umbrella object
 */
u.prototype.scroll = function() {

  this.first().scrollIntoView({
    behavior: 'smooth'
  });

  return this;
};
