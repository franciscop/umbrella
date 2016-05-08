// [INTERNAL USE ONLY]
// Add text in the specified position. It is used by other functions
u.prototype.adjacent = function(html, data, callback) {

  if (typeof data === 'number') {
    if (data === 0) {
      data = [];
    } else {
      data = new Array(data).join().split(',').map(Number.call, Number);
    }
  }

  // Loop through all the nodes. It cannot reuse the eacharg() since the data
  // we want to do it once even if there's no "data" and we accept a selector
  return this.each(function(node, j) {

    var fragment = document.createDocumentFragment();

    // Allow for data to be falsy and still loop once
    u(data || {}).join(function(el, i){

      // Allow for callbacks that accept some data
      var part = (typeof html === 'function') ? html.call(this, el, i, node, j) : html;

      if (typeof part === 'string') {
        return this.generate(part);
      }

      return u(part).nodes;
    }).each(function(n){
      var cloneWithEvents = n.cloneNode(true),
          event, i;
      // Copy any existing events
      if (n._e) {
        var nodeEventsObject = n._e;
        for (event in nodeEventsObject) {
          for (i = 0; i < nodeEventsObject[event].length; ++i) {
            u(cloneWithEvents).on(event, nodeEventsObject[event][i]);
          }
        }  
      }

      fragment.appendChild(cloneWithEvents);
    });

    callback.call(this, node, fragment);
  });
};
