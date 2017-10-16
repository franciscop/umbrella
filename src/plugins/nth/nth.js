// Get the first of the nodes
u.prototype.nth = function (index) {
  index = index || 1;
  return this.nodes[--index] || false;
};
