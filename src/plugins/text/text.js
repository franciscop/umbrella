// Set or retrieve the text content from the matched node(s)
u.prototype.text = function (text) {
  // Needs to check undefined as it might be ""
  if (text === undefined) {
    return this.first().textContent || '';
  }

  // If we're attempting to set some text
  // Loop through all the nodes
  return this.each(function (node) {
    // Set the text content to the node
    node.textContent = text;
  });
};
