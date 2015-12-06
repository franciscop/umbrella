/**
* ajax(url, data, success, error, before);
* 
* Perform a POST request to the given url
* @param String url the place to send the request
* @param String data the ready to send string of data
* @param function success optional callback if everything goes right
* @param function error optional callback if anything goes south
* @param function before optional previous callback
*/
function ajax(url, data, success, error, before) {
  
  // Make them truly optional
  var nf = function(){};
  success = success || nf;
  error = error || nf;
  before = before || nf;
  
  // Load the callback before anything happens
  before();
  
  // Add the umbrella parameter
  data = data + "&umbrella=true";
  
  // Create and send the actual request
  var request = new XMLHttpRequest();
  
  // Create a request of type POST to the URL and ASYNC
  request.open('POST', url, true);
  
  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  
  request.send(data);
  
  // When the request is sent
  request.onload = function() {
    
    var status = this.status;
    
    // Error
    if (status < 200 || status >= 400) {
      error(status);
      
      return false;
    }
    
    var rawresponse = this.response;
    
    // Check if valid json
    if (!isJson(rawresponse)) {
      console.log("Response isn't json");
      success(rawresponse);
      return false;
    }
    
    // The response is right
    success(JSON.parse(rawresponse));
  };
  
  return request;
}
