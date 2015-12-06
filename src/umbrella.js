/* Umbrella JS
 * -----------
 * Covers your needs
 *
 * NOTE: this is only the "core", see "umbrella.js" at the root
 *
 * Small, lightweight jQuery alternative
 * By Francisco Presencia Fandos
 * Inspired by http://youmightnotneedjquery.com/
 * Analyze: http://www.jshint.com/
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

    // Store the selector
    this.selector = parameter;

    // Store the nodes
    this.nodes = this.findNodes(parameter, context);
  }

  // If we're referring a specific node as in click(){ u(this) }
  else if (typeof parameter == "object" && parameter.nodeName) {

    // Store the node as an array
    this.nodes = [parameter];
  }

  // If we pass an array assume we want to make it the new nodes
  else if (Array.isArray(parameter)) {
    this.nodes = parameter.slice();
  }


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
  else if (parameter.match(/^[a-zA-Z]+$/)) {

    return this.tagNodes(parameter);
  }

  // If we match an id
  else if (parameter.match(/^\#[a-zA-Z0-9_]+$/)) {

    return this.idNodes(parameter.substring(1));
  }

  // A full css selector
  return this.cssNodes(parameter);
};


// This change made the code faster than jQuery ^_^
// Read "Defining class methods" in https://developers.google.com/speed/articles/optimizing-javascript
// The tag nodes
u.prototype.tagNodes = function(tagName) {

  return Array.prototype.slice.call(
    document.getElementsByTagName(tagName), 0);
};


// The id nodes
u.prototype.idNodes = function(id) {

  return [document.getElementById(id)];
};


// The class nodes
u.prototype.classNodes = function(className) {

  return Array.prototype.slice.call(
    document.getElementsByClassName(className), 0);
};


u.prototype.cssNodes = function(parameter, context) {

  context = context || document;

  // Store all the nodes as an array
  // http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
  return Array.prototype.slice.call(
    context.querySelectorAll(parameter), 0);
};

// This also made the code faster
// Read "Initializing instance variables" in https://developers.google.com/speed/articles/optimizing-javascript
// Default selector
u.prototype.selector = "";

// Default value
u.prototype.nodes = [];

// Options
u.options = {};