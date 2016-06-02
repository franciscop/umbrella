// [INTERNAL USE ONLY]

// Parametize an object: { a: 'b', c: 'd' } => 'a=b&c=d'
u.prototype.param = function (obj) {
  return Object.keys(obj).map(function (key) {
    return this.uri(key) + '=' + this.uri(obj[key]);
  }.bind(this)).join('&');
};
