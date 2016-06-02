// Create a HTTP request for whenever the matched form submits
u.prototype.ajax = function (done, before) {
  return this.handle('submit', function (e) {
    ajax(
      u(this).attr('action'),
      { body: u(this).serialize(), method: u(this).attr('method') },
      done && done.bind(this),
      before && before.bind(this)
    );
  });
};
