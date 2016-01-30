

// Select the adecuate part from the context
u.prototype.select = function(parameter, context) {
  
  if (context) {
    return this.select.byCss(parameter, context);
  }
  
  for (var key in this.selectors) {
    // Reusing it to save space
    context = key.split('/');
    if ((new RegExp(context[1], context[2])).test(parameter)) {
      return this.selectors[key](parameter);
    }
  }
  
  return this.select.byCss(parameter);
};

// Select some elements using a css Selector
u.prototype.select.byCss = function(parameter, context) {

  return (context || document).querySelectorAll(parameter);
};


// Allow for adding/removing regexes and parsing functions
// It stores a regex: function pair to process the parameter and context
u.prototype.selectors = {};

// Find some html nodes using an Id
u.prototype.selectors[/^\.[\w\-]+$/] = function(param) {
  return document.getElementsByClassName(param.substring(1));
};

//The tag nodes
u.prototype.selectors[/^\w+$/] = document.getElementsByTagName.bind(document);

// Find some html nodes using an Id
u.prototype.selectors[/^\#[\w\-]+$/] = function(param){
  return document.getElementById(param.substring(1));
};

// Create a new element for the DOM
u.prototype.selectors[/^\</] = function(param){
  return u(document.createElement('div')).html(param).children().nodes;
};
