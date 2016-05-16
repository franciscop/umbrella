// Set or retrieve the html from the matched node(s)
u.prototype.html = function (text) {
  // Needs to check undefined as it might be ""
  if (text === undefined) {
    return this.first().innerHTML || '';
  }

  // If we're attempting to set some text
  // Loop through all the nodes
  return this.each(function (node) {
    // Set the inner html to the node
    node.innerHTML = text;
  });
};
