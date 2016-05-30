// [INTERNAL USE ONLY]
// Add text in the specified position. It is used by other functions
u.prototype.adjacent = function (html, data, callback) {
  if (typeof data === 'number') {
    if (data === 0) {
      data = [];
    } else {
      data = new Array(data).join().split(',').map(Number.call, Number);
    }
  }

  // Loop through all the nodes. It cannot reuse the eacharg() since the data
  // we want to do it once even if there's no "data" and we accept a selector
  return this.each(function (node, j) {
    var fragment = document.createDocumentFragment();

    // Allow for data to be falsy and still loop once
    u(data || {}).map(function (el, i) {
      // Allow for callbacks that accept some data
      var part = (typeof html === 'function') ? html.call(this, el, i, node, j) : html;

      if (typeof part === 'string') {
        return this.generate(part);
      }

      return u(part);
    }).each(function (n) {
      // NOTE: if an extension func is used with clone
      // it will only apply to first clone and not subsequent
      // ones unless we enable all options here e.g. .clone({select: true, textarea: true}).
      // Is this acceptable? Solution ideas?
      this.isInPage(n) ? fragment.appendChild(u(n).clone({select: true, textarea: true}).first()) : fragment.appendChild(n);
    });

    callback.call(this, node, fragment);
  });
};
