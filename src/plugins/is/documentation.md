## .is()

Check whether any of the nodes matches the selector

```js
.is(filter)
```



### Parameters

`filter`: it can be two things:
  - css selector that each of the nodes must match to stay
  - function that returns a boolean with true to keep the element. It accepts two parameters, `node` and `index`, and the context of `this` is the instance of umbrella so methods like `this.slice()` are available:

```js
.is(function(node, index){
  // your code
});
```



### Return

*boolean*: *true* if any of the nodes matches the selector or the function returns true, false otherwise.



### Examples

Check if the current form needs to be valdated

```js
u('form.subscribe').ajax(false, function() {
  
  // Same as u(this).hasClass('validate')
  if (u('form.subscribe').is('.validate')) {
    validate();
  }
});
```



### Related

[.filter()](#filter) remove unwanted nodes