// Perform ajax calls
function ajax(action, opt, done, before) {

  // To avoid repeating it
  done = done || function(){};

  opt = opt || {};
  opt.body = opt.body || "";
  opt.method = (opt.method || 'GET').toUpperCase();
  opt.headers = opt.headers || {};
  opt.headers['X-Requested-With'] = opt.headers['X-Requested-With'] || 'XMLHttpRequest';
  if (!FormData || !(opt.body instanceof FormData)) {
    opt.headers['Content-Type'] = opt.headers['Content-Type'] || 'application/x-www-form-urlencoded';
  }
  opt.body = typeof opt.body === 'object' ? u().param(opt.body) : opt.body;


  // Create and send the actual request
  var request = new XMLHttpRequest();

  // An error is just an error
  // This uses a little hack of passing an array to u() so it handles it as
  // an array of nodes, hence we can use 'on'. However a single element wouldn't
  // work since it a) doesn't have nodeName and b) it will be sliced, failing
  u([request]).on('error timeout abort', function(){
    done(new Error(), null, request);
  }).on('load', function() {

    // Also an error if it doesn't start by 2 or 3...
    // This is valid as there's no code 2x nor 2, nor 3x nor 3, only 2xx and 3xx
    var err = !/^(2|3)/.test(request.status) ? new Error(request.status) : null;

    // Attempt to parse the body into JSON
    var body = parseJson(request.response) || request.response;

    return done(err, body, request);
  });

  // Create a request of the specified type to the URL and ASYNC
  request.open(opt.method, action);

  // Set the corresponding headers
  for (var name in opt.headers) {
    request.setRequestHeader(name, opt.headers[name]);
  }

  // Load the callback before sending the data
  if (before) before(request);

  request.send(opt.body);

  return request;
}
