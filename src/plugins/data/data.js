/**
 * .data(name, value)
 *
 * Retrieve or set the data-* attributes of the first matched node
 * @param String name the data-* attribute to search
 * @param String value optional atribute to set
 * @return this|String
 */
// ATTR
// Return the fist node attribute
u.prototype.data = function(name, value) {
  if (typeof name === 'object') {
    var new_name = {};
    for(var key in name) {
      new_name['data-' + key] = name[key];
    }
    return this.attr(new_name);
  }
  return this.attr('data-' + name, value);
};
