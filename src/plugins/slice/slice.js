// [INTERNAL USE ONLY]

// Force it to be an array AND also it clones them
// http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
u.prototype.slice = function(pseudo) {

  // Accept also a u() object (that has .nodes)
  return pseudo ? [].slice.call(pseudo.nodes || pseudo) : [];
};
