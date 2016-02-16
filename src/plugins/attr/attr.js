// Handle attributes for the matched elements
u.prototype.attr = function(name, value, data) {
  
  if (value !== undefined){
    var nm = name;
    name = {};
    name[nm] = value;
  }
  
  if (typeof name === 'object') {
    return this.each(function(node){
      for(var key in name) {
        var k = data ? 'data-' + key : key;
        if (name[key] !== null){
          node.setAttribute(k, name[key]);
        } else {
          node.removeAttribute(k);
        }
      } 
    });
  }
  
  if (data) name = 'data-' + name;
  return this.length ? this.first().getAttribute(name) : "";
};
