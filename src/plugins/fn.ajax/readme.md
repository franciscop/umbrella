## ajax() fn

Function (not method) that allows performing ajax requests. The implementation is somewhat similar to [nanoajax](https://github.com/yanatan16/nanoajax):

```js
var action = '/save';
var options = { body: 'a=b' };
var after = function(err, data){ console.log(data); };
var before = function(xhr){};

ajax(action, options, after, before);
```


### Parameters

`action`: the place where to send the ajax request

`options`: an object that sets the options to be passed. These are:

- `method = 'GET'`: the way to send the request. It can be GET or POST
- `body = ''`: a string on the `a=b&c=d` format or a simple object that will be converted
- `headers = {}`: an object with `{ key: value }` headers to be manually set

`after`: the callback to be called when the request has ben sent and parsed. The first parameter is an error that can be null, and the second one the parsed data in JSON or the unparsed data as an string.

`before`: a callback that can be called just before sending the request. It receives the XHR object as the first parameter.

### Return

Returns the already sent XHR object.


### Tips

You can modify the XHR object straight by using the *before* callback. It is called just before sending the request, after setting all its parameters:

```js
ajax('/save', {}, after, function(xhr){
  xhr.responseType = 'json';
});
```
