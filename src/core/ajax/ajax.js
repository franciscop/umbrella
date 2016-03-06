// Create a HTTP request for whenever the matched form submits
u.prototype.ajax = function(done, before) {
  return this.on("submit", function(e) {
    e.preventDefault();   // Stop native request
    var f = u(this);
    var opt = {
      body: f.serialize(),
      method: f.attr("method")
    };
    ajax(f.attr("action"), opt, done, before);
  });
};
