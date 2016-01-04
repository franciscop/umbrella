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
  
  if (typeof data != 'string') u().param(data);
  
  // Make them truly optional
  var nf = function(){};
  success = success || nf;
  error = error || nf;
  before = before || nf;
  
  // Load the callback before anything happens
  before();
  
  // Create and send the actual request
  var request = new XMLHttpRequest();
  
  // Create a request of type POST to the URL and ASYNC
  request.open('POST', url, true);
  
  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  
  // When the request is sent
  request.onload = function() {
    
    // Error
    if (this.status < 200 || this.status >= 400) {
      return error(this.status);
    }
    
    return success(parseJson(this.response) || this.response);
  };
  
  request.send(data);
  
  return request;
}
