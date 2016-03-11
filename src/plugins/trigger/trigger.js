// Call an event manually on all the nodes
u.prototype.trigger = function(events, data) {
  
  this.eacharg(events, function(node, event){
    
    // Allow the event to bubble up and to be cancelable (default)
    var ev, opts = { bubbles: true, cancelable: true, detail: data };
    
    try {
      // Accept different types of event names or an event itself
      ev = new CustomEvent(event, opts);
    } catch(e) {
      ev = document.createEvent('CustomEvent');
      ev.initCustomEvent(event, true, true, data);
    }
    
    node.dispatchEvent(ev);
  });
};
