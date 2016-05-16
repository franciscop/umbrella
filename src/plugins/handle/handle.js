// Change the default event for the callback. Simple decorator to preventDefault
u.prototype.handle = function (events, callback) {
  return this.on(events, function (e) {
    e.preventDefault();
    callback.apply(this, arguments);
  });
};
