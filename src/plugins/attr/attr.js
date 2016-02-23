// Handle attributes for the matched elements
u.prototype.attr = function(name, value, data) {
  
  data = data ? 'data-' : '';
  
  if (value !== undefined){
    var nm = name;
    name = {};
    name[nm] = value;
  }
  
  if (typeof name === 'object') {
    return this.each(function(node){
      for(var key in name) {
        node.setAttribute(data + key, name[key]);
      } 
    });
  }
  
  return this.length ? this.first().getAttribute(data + name) : "";
};
