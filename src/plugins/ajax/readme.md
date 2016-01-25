## .ajax()

Make all of the matched forms to be submitted by ajax with the same action, method and values when the user submits the form.

> Note: this method does NOT submit the form, it just handles it when it's submitted (from the user or with .trigger())

> Note2: the .serialize() method used internally is slightly buggy; select can only have a single selection and few other bugs as described here: [form serialize javascript](http://stackoverflow.com/a/11661219)

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


### Why not jquery?

This was created because this pattern is quite common in jquery:

```js
$('form').on('submit', function(e){
  e.preventDefault();
  $.post($(this).attr('action'), $(this).serialize(), function(data){
    alert("Done! Thanks, " + data.name);
  }, 'json');
});
```

After repeating that many times, I found out that it's better if we just make that the default. The same code on Umbrella JS:

```js
u('form').ajax(function(err, data){
  if (!err) alert('Done! Thanks, ' + data.name);
});
```

Of course you have freedom and you can use a similar method to jquery, but I think it's a bit pointless for this specific situation:

```js
u('form').on('submit', function(e){
  e.preventDefault();
  ajax(u(this).attr('method'), u(this).attr('action'), u(this).serialize(), function(err, data){
    if (!err) alert("Done! Thanks, " + data.name);
  });
});
```

This is the footprint of the raw function:

```js
ajax(method, url, data, done, before);
```