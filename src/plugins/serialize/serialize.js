// Convert forms into a string able to be submitted
// Original source: http://stackoverflow.com/q/11661187
u.prototype.serialize = function () {
  var self = this;

  // Store the class in a variable for manipulation
  return this.slice(this.first().elements).reduce(function (query, el) {
    // We only want to match enabled elements with names, but not files
    if (!el.name || el.disabled || el.type === 'file') return query;

    // Ignore the checkboxes that are not checked
    if (/(checkbox|radio)/.test(el.type) && !el.checked) return query;

    // Handle multiple selects
    if (el.type === 'select-multiple') {
      u(el.options).each(function (opt) {
        if (opt.selected) {
          query += '&' + self.uri(el.name) + '=' + self.uri(opt.value);
        }
      });
      return query;
    }

    // Add the element to the object
    return query + '&' + self.uri(el.name) + '=' + self.uri(el.value);
  }, '').slice(1);
};
