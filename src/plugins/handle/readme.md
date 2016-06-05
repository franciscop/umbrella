## .handle()

This function is the same as [`on()`](#on), but it executes the `e.preventDefault()` so you don't need to do it. So these two are exactly the same:

```js
u('form.login').on('submit', function(e){
  e.preventDefault();
  // logic
});
```

```js
u('form.login').handle('submit', function(e){
  // logic
});
```

### Related

[.on()](#on) Calls a function when an event is triggered

[.trigger()](#trigger) calls an event on all of the matched nodes

[.off()](#off) Removes an event from  matched nodes
