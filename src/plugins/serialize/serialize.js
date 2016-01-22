/**
 * .serialize()
 * 
 * Convert al html form elements into an object
 * The <input> and <button> without type will be parsed as default
 * NOTE: select-multiple for <select> is disabled on purpose
 * Source: http://stackoverflow.com/q/11661187
 * @return string from the form's data
 */
u.prototype.serialize = function() {
  
  // Store the class in a variable for manipulation
  return this.param(this.slice(this.first().elements).reduce(function(obj, el) {
    
    // We only want to match elements with names, but not files
    if (el.name && el.type !== 'file'
    
    // Ignore the checkboxes that are not checked
    && (!/(checkbox|radio)/.test(el.type) || el.checked)) {
      
      // Add the element to the object
      obj[el.name] = el.value;
    }
    
    return obj;
  }, {}));
};
