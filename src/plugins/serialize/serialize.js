/**
 * .serialize()
 * 
 * Convert al html form elements into a string
 * The <input> and <button> without type will be parsed as default
 * NOTE: select-multiple for <select> is disabled on purpose
 * Source: http://stackoverflow.com/q/11661187
 * @return String the string to be sent through a Post or Get
 */
u.prototype.serialize = function() {
  
  // Store the class in a variable for manipulation
  var form = this.first();
  
  // Variables to store the work
  var i, query = "";
  
  // Encode the values https://gist.github.com/brettz9/7147458
  function en(str) {
   return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    }
  
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    
    // Store ELEMENT
    var el = form.elements[i];
    
    // Make sure the element has name
    if (el.name === "") {
      continue;
      }
    
    
    switch (el.type) {
      // Don't add files
      case 'file':
        break;
      
      // Don't add checkbox or radio if they are not checked
      case 'checkbox':
      case 'radio':
        if (!el.checked)
          break;
      
      // All other cases
      default:
        query += "&" + en(el.name) + "=" + en(el.value);
      }
    }
  
  // Join the query and return it
  return query;
  };
