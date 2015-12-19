/* Umbrella JS
 * -----------
 * Covers your needs
 *
 * Small, lightweight jQuery alternative
 * By Francisco Presencia Fandos
 * Inspired by http://youmightnotneedjquery.com/
 * Compat: http://caniuse.com/#feat=queryselector
 * Order of include is irrelevant http://stackoverflow.com/q/7609276
 *
 * Umbrella JS selector is faster than jQuery:
 * classes: http://jsperf.com/umbrella-vs-jquery-class/2
 * tags: http://jsperf.com/umbrella-vs-jquery-tag/2
 * ids: http://jsperf.com/umbrella-vs-jquery-id/2
 * complex: http://jsperf.com/umbrella-vs-jquery-complex/2
 */


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
    parameter = this.findNodes(parameter, context);
  }

  // If we're referring a specific node as in click(){ u(this) }
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


// Select the adecuate part from the context
u.prototype.findNodes = function(parameter, context) {

  // querySelector is the only one that accepts documentFragment
  if (context){
    return this.cssNodes(parameter, context);
  }

  // If we're matching a class
  if (parameter.match(/^\.[a-zA-Z0-9_]+$/)) {

    return this.classNodes(parameter.substring(1));
  }

  // If we're matching a tag
  if (parameter.match(/^[a-zA-Z]+$/)) {

    return this.tagNodes(parameter);
  }

  // If we match an id
  if (parameter.match(/^\#[a-zA-Z0-9_]+$/)) {

    return this.idNodes(parameter.substring(1));
  }

  // A full css selector
  return this.cssNodes(parameter);
};


// This change made the code faster than jQuery ^_^
// Read "Defining class methods" in https://developers.google.com/speed/articles/optimizing-javascript
// The tag nodes
u.prototype.tagNodes = function(tagName) {

  return document.getElementsByTagName(tagName);
};


// The id nodes
u.prototype.idNodes = function(id) {

  return document.getElementById(id);
};


// The class nodes
u.prototype.classNodes = function(className) {

  return document.getElementsByClassName(className);
};


u.prototype.cssNodes = function(parameter, context) {

  context = context || document;

  // Store all the nodes as an array
  // http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
  return context.querySelectorAll(parameter);
};

// Force it to be an array AND also it clones them
u.prototype.slice = function(pseudo){
  return pseudo ? Array.prototype.slice.call(pseudo, 0) : [];
};

// Make the nodes unique
u.prototype.unique = function(){
  
  return u(this.nodes.reduce(function(clean, node){
    return (node && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
  }, []));
};


// This also made the code faster
// Read "Initializing instance variables" in https://developers.google.com/speed/articles/optimizing-javascript
// Default selector

// Default value
u.prototype.nodes = [];

// Options
u.options = {};