// Set or get value of input elements
u.prototype.val = function (value) {
  // If no value is passed just return the value of the element
  if (value === undefined) {
    return this.first().value;
  }

  return this.each(function (node) {
    // Set the value to the element
    node.value = value;
  });
};
