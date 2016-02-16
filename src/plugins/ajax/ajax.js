// Create a HTTP request for whenever the matched form submits
u.prototype.ajax = function(done, before) {
  return this.on("submit", function(e) {
    e.preventDefault();   // Stop native request
    var f = u(this);
    ajax(f.attr("method"), f.attr("action"), f.serialize(), done, before);
  });
};
