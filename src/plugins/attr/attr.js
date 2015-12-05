/**
 * .attr(name, value)
 *
 * Retrieve or set the data for an attribute of the first matched node
 * @param String name the attribute to search
 * @param String value optional atribute to set
 * @return this|String
 */
// ATTR
// Return the fist node attribute
u.prototype.attr = function(name, value) {
  
  if (value) {
    this.first().setAttribute(name, value);
    return this;
    }
  
  return this.first().getAttribute(name) || "";
  };
