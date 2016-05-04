/**
 * .replace()
 *
 * Replace the matched elements with the passed argument.
 * @return this Umbrella object
 */
u.prototype.replace = function (newValue) {
    return this.join(function (node) {
        var newNode;
        if (typeof newValue  === 'function') {
            newNode = u(newValue(node)).first();
        } else {
            newNode = u(newValue).first();
        }
        node.parentNode.replaceChild(newNode, node);
        return newNode;
    });
};