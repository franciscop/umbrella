## .ajax()

Make all of the matched forms to be submitted by ajax with the same method and values when the user submits the form.

> Note: this method does NOT submit the form, it just handles it when it's submitted (from the user or with .trigger())

```js
.ajax(done, before);
```


### Parameters

`done` [optional]: A function to be called when the request ends. The first argument is the error, if any. The second is the body, which is parsed to JSON if it's a JSON string or just the body as a string if it's not JSON. The third is the request object itself.

```js
var done = function(err, body, xhr){};
```

`before` [optional]: A function to be called before the request is sent. Useful to manipulate some data in real-time.

```js
var before = function(xhr){};
```


### Return

**Undefined**. Please don't use the returned value for anything (it might be a promise in the future).



### Examples

Handle the newsletter through ajax

```js
u('.newsletter').ajax(function(err){
  if (err) return alert("Error");
  alert("Thank you for subscribing, awesome!");
});
```

Actually send a form through ajax:

```js
u('form.edit').ajax(function(){ console.log('Sent!'); });
u('form.edit').trigger('submit');
```
