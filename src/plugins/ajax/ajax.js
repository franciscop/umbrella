/**
 * .ajax(done, before)
 * 
 * Create a POST request for whenever the matched form submits
 * @param function done called when response is received
 * @param function before called function before sending the request
 */
u.prototype.ajax = function(done, before) {
  
  // Attach the event submit to all of the nodes
  return this.on("submit", function(e) {
    
    // Stop the browser from sending the request
    e.preventDefault();
    
    // Post the actual data
    ajax(u(this).attr("method"), u(this).attr("action"), u(this).serialize(), done, before);
  });
};
