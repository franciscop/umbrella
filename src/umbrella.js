// Umbrella JS
// -----------
// Covers your basic javascript needs

// Small, lightweight jQuery alternative
// @author Francisco Presencia Fandos http://francisco.io/
// @inspiration http://youmightnotneedjquery.com/

// INIT
// It should make sure that there's at least one element in nodes
var u = function(parameter, context) {

  // Make it an instance of u() to avoid needing 'new' as in 'new u()' and just
  // use 'u().bla();'. Reference: http://stackoverflow.com/q/24019863
  if (!(this instanceof u)) {    // !() http://stackoverflow.com/q/8875878
    return new u(parameter, context);
  }


  // Check if it's a css selector
  if (typeof parameter == "string") {

    // Find and store the node(s)
    parameter = this.select(parameter, context);
  }
  
  // If we're referring a specific node as in on('click', function(){ u(this) })
  // or the select() function returned a single node such as in '#id'
  if (parameter && parameter.nodeName) {

    // Store the node as an array
    parameter = [parameter];
  }
  
  // Convert to an array, since there are many 'array-like' stuff in js-land
  if (!Array.isArray(parameter)) {
    parameter = this.slice(parameter);
  }
  
  this.nodes = parameter;

  return this;
};






// Force it to be an array AND also it clones them
// http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
u.prototype.slice = function(pseudo) {
  return pseudo ? [].slice.call(pseudo, 0) : [];
};


// Flatten an array using 
u.prototype.str = function(node, i){
  return function(arg){
    
    // Call the function with the corresponding nodes
    if (typeof arg === 'function') {
      return arg.call(this, node, i);
    }
    
    // From an array or other 'weird' things
    return arg.toString();
  }
}

// Normalize the arguments to an array of strings
// Allow for several class names like "a b, c" and several parameters
u.prototype.args = function(args, node, i){
  
  // First flatten it all to a string http://stackoverflow.com/q/22920305
  // If we try to slice a string bad things happen: ['n', 'a', 'm', 'e']
  if (typeof args !== 'string') {
    args = this.slice(args).map(this.str(node, i));
  }
    
  // Then convert that string to an array of not-null strings
  return args.toString().split(/[\s,]+/).filter(function(e){ return e.length; });
};

// Make the nodes unique. This is needed for some specific methods
u.prototype.unique = function(){
  
  return u(this.nodes.reduce(function(clean, node){
    return (node && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
  }, []));
};

// Encode the different strings https://gist.github.com/brettz9/7147458
u.prototype.uri = function(str){
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

// Parametize an object: { a: 'b', c: 'd' } => 'a=b&c=d'
u.prototype.param = function(obj){
  
  // Note: while this is ~10% slower (~3us/operation) than with a simple for(in)
  // I find it more legible and more 'logical' (however right now a test fails)
  // return Object.keys(obj).map(function(key) {
  //   return this.uri(key) + '=' + this.uri(obj[key]);
  // }).join('&');
  
  
  var query = '';
  for(var key in obj) {
    query += '&' + this.uri(key) + '=' + this.uri(obj[key]);
  }
  return query.slice(1);
}

// This made the code faster, read "Initializing instance variables" in
// https://developers.google.com/speed/articles/optimizing-javascript

// Default value
u.prototype.nodes = [];
