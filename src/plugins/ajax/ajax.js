/**
 * .ajax(success, error, before)
 * 
 * Create a POST request for whenever the matched form submits
 * @param function success called function when the post is okay
 * @param function error called function when the post was NOT okay
 * @param function before called function before sending the request
 */
u.prototype.ajax = function(success, error, before) {
  
  // Loop through all the nodes
  this.on("submit", function(e) {
    
    // Stop the browser from sending the request
    e.preventDefault();
    
    // Post the actual data
    ajax(
      u(this).attr("action"),
      u(this).serialize(),
      success,
      error,
      before);
    });
  
  return this;
  };

