/**
 * .trigger(name)
 * ----------
 * Call an event manually on all the nodes
 * @param event: the event or event name to call
 * @return u: an instance of umbrella
 */
u.prototype.trigger = function(event) {
  
  // Allow the event to bubble up and to be cancelable (default)
  var opts = { bubbles: true, cancelable: true };
  
  try {
    // Accept different types of event names or an event itself
    event = (typeof event == 'string') ? new Event(event, opts) : event;
  } catch(e) {
    var name = event;
    event = document.createEvent('Event');
    event.initEvent(name, opts.bubbles, opts.cancelable);
  }
    
  // Loop all of the nodes
  return this.each(function(node){
    
    // Actually trigger the event
    node.dispatchEvent(event);
  });
};
