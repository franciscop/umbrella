// [INTERNAL USE ONLY]

// Normalize the arguments to an array of strings
// Allow for several class names like "a b, c" and several parameters
u.prototype.args = function (args, node, i) {
  if (typeof args === 'function') {
    args = args(node, i);
  }

  // First flatten it all to a string http://stackoverflow.com/q/22920305
  // If we try to slice a string bad things happen: ['n', 'a', 'm', 'e']
  if (typeof args !== 'string') {
    args = this.slice(args).map(this.str(node, i));
  }

  // Then convert that string to an array of not-null strings
  return args.toString().split(/[\s,]+/).filter(function (e) {
    return e.length;
  });
};
