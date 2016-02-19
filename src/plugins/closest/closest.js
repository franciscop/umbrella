// Find the first ancestor that matches the selector for each node
u.prototype.closest = function(selector) {
  return this.join(function(node) {

    // Keep going up and up on the tree. First element is also checked
    do {
      if (u(node).is(selector)) {
        return node;
      }
    } while ((node = node.parentNode));
  });
};
