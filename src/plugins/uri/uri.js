// [INTERNAL USE ONLY]

// Encode the different strings https://gist.github.com/brettz9/7147458
u.prototype.uri = function (str) {
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};
