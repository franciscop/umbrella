## .ajax()

**Make a regular form to be submitted by ajax with the same method and values**

```js
.ajax(success, error, before);
```


### Parameters

`success` [optional]: A function to be called if the request was successful. The first argument is the responding body, which is parsed to JSON if it's a JSON string or just the body as a string if it's not JSON.

```js
var success = function(body){};
```

`error` [optional]: A function that is called if the request has an error. The first parameter is an error.

```js
var error = function(code){};
```

`before` [optional]: A function to be called before the request is sent. Useful to manipulate some data in real-time.

```js
var before = function(code){};
```


### Return

**Undefined**. Please don't use the returned value for anything (it might be a promise in the future).



### Examples

Submit your email through ajax

```js
u('.newsletter').ajax(function(){
  alert("Thank you for subscribing, awesome!");
}, function(err){
  alert("Ooops, there was an error: " + err);
});
```
