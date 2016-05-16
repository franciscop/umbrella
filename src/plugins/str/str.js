// [INTERNAL USE ONLY]

// Create a string from different things
u.prototype.str = function (node, i) {
  return function (arg) {
    // Call the function with the corresponding nodes
    if (typeof arg === 'function') {
      return arg.call(this, node, i);
    }

    // From an array or other 'weird' things
    return arg.toString();
  };
};
