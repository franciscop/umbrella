// Merge all of the nodes that the callback returns
u.prototype.map = function (callback) {
  return callback ? u(this.array(callback)).unique() : this;
};
