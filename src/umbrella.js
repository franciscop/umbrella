// Umbrella JS
// -----------
// Covers your basic javascript needs

// Small, lightweight jQuery alternative
// @author Francisco Presencia Fandos http://francisco.io/
// @inspiration http://youmightnotneedjquery.com/

// INIT
// It should make sure that there's at least one element in nodes
var u = function(parameter, context) {

  // Make sure that we are always working with the u object
  // This is only so we can avoid selector = new u("whatever");
  // and use u("whatever").bla();
  // Reference: http://stackoverflow.com/q/24019863
  if (!(this instanceof u)) {    // !() http://stackoverflow.com/q/8875878
    return new u(parameter, context);
  }


  // Check if it's a selector or an object
  if (typeof parameter == "string") {

    // Store the nodes
    parameter = this.select(parameter, context);
  }

  // If we're referring a specific node as in click(){ u(this) }
  // or the select() returned only one node
  if (parameter && parameter.nodeName) {

    // Store the node as an array
    parameter = [parameter];
  }

  // Make anything an array
  if (!Array.isArray(parameter)) {
    parameter = this.slice(parameter);
  }
  
  this.nodes = parameter;

  return this;
};






// Force it to be an array AND also it clones them
// Store all the nodes as an array
// http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
u.prototype.slice = function(pseudo){
  return pseudo ? Array.prototype.slice.call(pseudo, 0) : [];
};

// Normalize the arguments to an array
// Allow for several class names like "a b, c" and several parameters
// toString() is to flatten the array: http://stackoverflow.com/q/22920305
u.prototype.args = function(args){
  
  return ((typeof args === 'string') ? args : this.slice(args))
    .toString().split(/[\s,]+/).filter(function(e){ return e.length; });
};

// Make the nodes unique
u.prototype.unique = function(){
  
  return u(this.nodes.reduce(function(clean, node){
    return (node && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
  }, []));
};

// Parametize an object
u.prototype.param = function(obj){
  
  // Encode the values https://gist.github.com/brettz9/7147458
  function en(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  }
  
  var query = '';
  for(var key in obj) {
    query += '&' + en(key) + '=' + en(obj[key]);
  }
  return query.slice(1);
}

// This also made the code faster
// Read "Initializing instance variables" in https://developers.google.com/speed/articles/optimizing-javascript
// Default selector

// Default value
u.prototype.nodes = [];

// Options
u.options = {};
