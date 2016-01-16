/**
* ajax(url, data, success, error, before);
* 
* Perform a POST request to the given url
* @param String method the method to send the data, defaults to GET
* @param String url the place to send the request
* @param String data the ready to send string of data
* @param function success optional callback if everything goes right
* @param function error optional callback if anything goes south
* @param function before optional previous callback
*/
function ajax(method, url, data, done, before) {
  
  // To avoid repeating it
  done = done || Function;
  
  // Create and send the actual request
  var request = new XMLHttpRequest;
  
  // An error is just an error
  // This uses a little hack of passing an array to u() so it handles it as
  // an array of nodes, hence we can use 'on'. However a single element wouldn't
  // work since it a) doesn't have nodeName and b) it will be sliced, failing
  u([request]).on('error timeout abort', function(){
    done(new Error, null, request);
  }).on('load', function() {
    
    // Also an error if it doesn't start by 2 or 3...
    // This is valid as there's no code 2x nor 2, nor 3x nor 3, only 2xx and 3xx
    var err = !/^(2|3)/.test(request.status) ? new Error(request.status) : null;
    
    // Attempt to parse the body into JSON
    var body = parseJson(request.response) || request.response;
    
    return done(err, body, request);
  });
  
  // Create a request of type POST to the URL and ASYNC
  request.open(method || 'GET', url);
  
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  // Load the callback before sending the data
  if (before) before(request);
  
  request.send(typeof data == 'string' ? data : u().param(data));
  
  return request;
}