

// Select the adecuate part from the context
u.prototype.select = function(parameter, context) {
  
  // querySelector is the only one that accepts documentFragment
  return context ? this.select.byCss(parameter, context)
    
    // If we're matching a class
    : /^\.[\w\-]+$/.test(parameter) ? this.select.byClass(parameter.substring(1))
    
    // If we're matching a tag
    // Note: this is not tremendously acurated, since it includes _ which might
    // not be valid, but that's acceptable. If you do u('bla_bla') then it should
    // not be umbrella's responsability to clean up
    : /^\w+$/.test(parameter) ? this.select.byTag(parameter)
    
      // If we match an id
    : /^\#\w+$/.test(parameter) ? this.select.byId(parameter.substring(1))
    
    // A full css selector
    : this.select.byCss(parameter);
};


// Changing the code to specific selectors made it faster than jQuery ^_^
// Read "Defining class methods" in https://developers.google.com/speed/articles/optimizing-javascript

// The tag nodes
u.prototype.select.byTag = document.getElementsByTagName.bind(document);

// Find some html nodes using an Id
u.prototype.select.byId = document.getElementById.bind(document);

// Find some html nodes using a Class
u.prototype.select.byClass = document.getElementsByClassName.bind(document);

// Select some elements using a css Selector
u.prototype.select.byCss = function(parameter, context) {

  return (context || document).querySelectorAll(parameter);
};