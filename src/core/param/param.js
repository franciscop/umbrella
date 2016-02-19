// [INTERNAL USE ONLY]

// Parametize an object: { a: 'b', c: 'd' } => 'a=b&c=d'
u.prototype.param = function(obj){

  // Note: while this is ~10% slower (~3us/operation) than with a simple for(in)
  // I find it more legible and more 'logical' (however right now a test fails)
  // return Object.keys(obj).map(function(key) {
  //   return this.uri(key) + '=' + this.uri(obj[key]);
  // }).join('&');


  var query = '';
  for(var key in obj) {
    query += '&' + this.uri(key) + '=' + this.uri(obj[key]);
  }
  return query.slice(1);
};
