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
  
  console.log("Before");
  
  // Bastard IE11
  console.log("IE", window.Event);
  
  // Accept different types of event names or an event itself
  if (typeof event != 'string') {
    if (document.createEvent) {
      event = document.createEvent("Event");
      event.initEvent(event, false, true);
    } else {
      event = new Event(type);
      target.dispatchEvent(event);
    }
  }
  
  console.log("Initialized");
  
  
  console.log("After");
  
  // Loop all of the nodes
  return this.each(function(node){
    
    console.log("And here");
    console.log(node.dispatchEvent);
    
    // Actually trigger the event
    node.dispatchEvent(event);
  });
};
