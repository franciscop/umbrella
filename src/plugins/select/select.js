

// Select the adecuate part from the context
u.prototype.select = function(parameter, context) {
  
  if (context) {
    return this.select.byCss(parameter, context);
  }
  
  for (var i = 0; i < this.s.length; i++) {
    if (this.s[i].r.test(parameter)) {
      return this.s[i].f(parameter);
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
u.prototype.s = [];

// Find some html nodes using an Id
u.prototype.s.push({ r: /^\.[\w\-]+$/, f: function(param) {
    return document.getElementsByClassName(param.substring(1));
  }
});

// The tag nodes
u.prototype.s.push({ r: /^\w+$/, f: function(param) {
    return document.getElementsByTagName(param);
  }
});

// Find some html nodes using an Id
u.prototype.s.push({ r: /^\#[\w\-]+$/, f: function(param){
    return document.getElementById(param.substring(1));
  }
});
