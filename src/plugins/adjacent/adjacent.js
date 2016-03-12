// [INTERNAL USE ONLY]
// Add text in the specified position. It is used by other functions
u.prototype.adjacent = function(html, data, callback) {

  // Loop through all the nodes. It cannot reuse the eacharg() since the data
  // we want to do it once even if there's no "data" and we accept a selector
  return this.each(function(node, j) {

    var fragment = document.createDocumentFragment();

    // Allow for data to be falsy and still loop once
    u(data || [""]).join(function(el, i){

      // Allow for callbacks that accept some data
      var part = (typeof html === 'function') ? html.call(this, el, i, node, j) : html;

      if (typeof part === 'string') {
        return this.generate(part);
      }

      return u(part).nodes;
    }).each(function(n){
      fragment.appendChild(n);
    });

    callback.call(this, node, fragment);
  });




  // // Loop through all the nodes. It cannot reuse the eacharg() since the data
  // // we want to do it once even if there's no "data" and we accept a selector
  // return this.each(function(node) {
  //
  //   // Allow for data to be falsy and still loop once
  //   u(data || [""]).each(function(el){
  //
  //     // Allow for callbacks that accept some data
  //     var tx = (typeof text === 'function') ? text.call(this, node, el) : text;
  //
  //     // http://stackoverflow.com/a/23589438
  //     // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML
  //     node.insertAdjacentHTML(position, tx);
  //   });
  // });
};
