// [INTERNAL USE ONLY]
// Merge all of the nodes that the callback returns
u.prototype.join = function(callback) {
  return callback ? u(this.array(callback)).unique() : this;
};
