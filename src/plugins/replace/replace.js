/**
 * .replace()
 *
 * Replace the matched elements with the passed argument.
 * @return this Umbrella object
 */
u.prototype.replace = function(newValue) {
    var newNode;
    var paramType = typeof newValue;
    if (paramType === 'string') {
       return this.join(function(node){
           newNode = u(newValue).first();
           node.parentNode.replaceChild(newNode, node);
           return newNode;
        });
    } else if (paramType === 'function'){
        return this.join(function(node) {
            newNode = u(newValue(node)).first();
            node.parentNode.replaceChild(newNode, node);
            return newNode;
        });
    } else {
        return this;
    }
};
