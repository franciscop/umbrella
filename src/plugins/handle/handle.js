// Change the default event for the callback. Simple decorator to preventDefault
u.prototype.handle = function () {
  var args = this.slice(arguments).map(function (arg) {
    if (typeof arg === 'function') {
      return function (e) {
        e.preventDefault();
        arg.apply(this, arguments);
      };
    }
    return arg;
  }, this);

  return this.on.apply(this, args);
};
