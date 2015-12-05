/**
 * .on(event, callback)
 * 
 * Attach the callback to the event listener for each node
 * @param String event(s) the type of event ('click', 'submit', etc)
 * @param function callback function called when the event triggers
 * @return this Umbrella object
 */
u.prototype.on = function(events, callback) {
  
  // Separate the events
  var evts = events.split(' ');
  
  // Loop through each event
  for (var i=0; i < evts.length; i++) {
  
    // Loop through all the nodes
    this.each(function() {
      
      // Add each event listener to each node
      this.addEventListener(evts[i], callback);
      });
    }
  
  return this;
  };
