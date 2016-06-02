/**
 * Internal use only. This function checks to see if an element is in the page's body. As contains is inclusive and determining if the body contains itself isn't the intention of isInPage this case explicitly returns false.
https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param  {[Object]}  node DOM node
 * @return {Boolean}        The Node.contains() method returns a Boolean value indicating whether a node is a descendant of a given node or not.
 */
u.prototype.isInPage = function isInPage (node) {
  return (node === document.body) ? false : document.body.contains(node);
};
