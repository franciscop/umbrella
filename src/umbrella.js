// Umbrella JS  http://umbrellajs.com/
// -----------
// Small, lightweight jQuery alternative
// @author Francisco Presencia Fandos https://francisco.io/
// @inspiration http://youmightnotneedjquery.com/

// Initialize the library
var u = function (parameter, context) {
  // Make it an instance of u() to avoid needing 'new' as in 'new u()' and just
  // use 'u().bla();'.
  // @reference http://stackoverflow.com/q/24019863
  // @reference http://stackoverflow.com/q/8875878
  if (!(this instanceof u)) {
    return new u(parameter, context);
  }

  // No need to further processing it if it's already an instance
  if (parameter instanceof u) {
    return parameter;
  }

  // Parse it as a CSS selector if it's a string
  if (typeof parameter === 'string') {
    parameter = this.select(parameter, context);
  }

  // If we're referring a specific node as in on('click', function(){ u(this) })
  // or the select() function returned a single node such as in '#id'
  if (parameter && parameter.nodeName) {
    parameter = [parameter];
  }

  // Convert to an array, since there are many 'array-like' stuff in js-land
  this.nodes = this.slice(parameter);
};

// Map u(...).length to u(...).nodes.length
u.prototype = {
  get length () {
    return this.nodes.length;
  }
};

// This made the code faster, read "Initializing instance variables" in
// https://developers.google.com/speed/articles/optimizing-javascript
u.prototype.nodes = [];
