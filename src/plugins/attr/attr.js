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
  
  if (value !== undefined){
    var nm = name;
    name = {};
    name[nm] = value;
  }
  
  if (typeof name === 'object') {
    return this.each(function(node){
      for(var key in name) {
        if (name[key] !== null){
          node.setAttribute(key, name[key]);
        } else {
          node.removeAttribute(key);
        }
      }
    });
  }
  
  return this.length ? this.first().getAttribute(name) : "";
};
