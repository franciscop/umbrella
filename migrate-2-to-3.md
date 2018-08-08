# Upgrade to 3.x

There are two removals:

- The top level function `ajax()`
- The method `.ajax()`, attached to forms

See detailed explanation and justification in https://github.com/franciscop/umbrella/issues/124

Besides that, some internal selectors based on Regex were removed since modern browsers implement this automatically.

## Top level function ajax()

The API was already very similar to the native `fetch()`, so migration should be trivial:

```js
// With Umbrella's ajax()
ajax(URL, OPTIONS, AFTER, BEFORE);

// With the native function
BEFORE;
fetch(URL, OPTIONS).then(AFTER)
```

Furthermore, Umbrella's `ajax()` options are a *subset* of `fetch()`'s options, so that doesn't need to change at all.

Example:

```js
ajax('/users', { method: 'GET' }, function(err, data) {
  u('.results').text(data);
});

fetch('/users', { method: 'GET' }).then(function(data) {
  u('.results').text(data);
});
```

If rewriting this is too much work, you can always define your own function `ajax()` that follows the old specification with its bugs and all:

```js
// Umbrella's old ajax() function:

// Perform ajax calls
function ajax (action, opt, done, before) {
  done = done || function () {};

  // A bunch of options and defaults
  opt = opt || {};
  opt.body = opt.body || {};
  opt.method = (opt.method || 'GET').toUpperCase();
  opt.headers = opt.headers || {};

  // Tell the back-end it's an AJAX request
  opt.headers['X-Requested-With'] = opt.headers['X-Requested-With'] || 'XMLHttpRequest';

  if (typeof window.FormData === 'undefined' || !(opt.body instanceof window.FormData)) {
    opt.headers['Content-Type'] = opt.headers['Content-Type'] || 'application/x-www-form-urlencoded';
  }

  // If it's of type JSON, encode it as such
  if (/json/.test(opt.headers['Content-Type'])) {
    opt.body = JSON.stringify(opt.body);
  }

  if ((typeof opt.body === 'object') && !(opt.body instanceof window.FormData)) {
    opt.body = u().param(opt.body);
  }

  // Create and send the actual request
  var request = new window.XMLHttpRequest();

  // An error is just an error
  // This uses a little hack of passing an array to u() so it handles it as
  // an array of nodes, hence we can use 'on'. However a single element wouldn't
  // work since it a) doesn't have nodeName and b) it will be sliced, failing
  u(request).on('error timeout abort', function () {
    done(new Error(), null, request);
  }).on('load', function () {
    // Also an error if it doesn't start by 2 or 3...
    // This is valid as there's no code 2x nor 2, nor 3x nor 3, only 2xx and 3xx
    // We don't want to return yet though as there might be some content
    var err = /^(4|5)/.test(request.status) ? new Error(request.status) : null;

    // Attempt to parse the body into JSON
    var body = parseJson(request.response) || request.response;

    return done(err, body, request);
  });

  // Create a request of the specified type to the URL and ASYNC
  request.open(opt.method, action);

  request.withCredentials = true;

  // Set the corresponding headers
  for (var name in opt.headers) {
    request.setRequestHeader(name, opt.headers[name]);
  }

  // Load the before callback before sending the data
  if (before) before(request);

  request.send(opt.body);

  return request;
}
```

If you didn't use `before` or the third parameter `request` you can just match it to the newer `fetch()`:

```js
function ajax(url, options, after) {
  return fetch(url, options).then(function(data){
    after(null, data);
  }).catch(after);
};
```


## Method .ajax()

This method was a handler for submitting forms automatically with AJAX.
