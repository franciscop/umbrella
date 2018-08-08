## .is()

Check whether any of the nodes matches the selector

```js
.is('a')
.is(u('a'))
.is(function(){ return Math.random() > 0.5 })
```



### Parameters

`filter`: it can be two things:
  - css selector to check
  - instance of umbrella with the elements to check
  - function that returns a boolean to check for each of the nodes. If one of them returns true, then the method `is()` returns true. It accepts two parameters, `node` and `index`, and the context of `this` is the instance of umbrella so methods like `this.slice()` are available.



### Return

*boolean*: *true* if any of the nodes matches the selector or the function returns true, false otherwise.



### Examples

Check if the current form needs to be valdated

```js
u('form.subscribe').on('submit', function(e) {

  // Same as u('form.subscribe').hasClass('validate')
  if (u(e.target).is('.validate')) {
    validate();
  }

  // ...
});
```



### Related

[.filter()](#filter) remove unwanted nodes

[.not()](#not) remove all the nodes that match the criteria
