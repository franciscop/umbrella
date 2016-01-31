## .trigger()

Calls an event on all of the matched nodes

```js
.trigger('submit')
.trigger(new Event('submit', {}));
```

### Parameters

The only parameter that it accepts is either an event name such as `click`, `submit`, `change`, etc or an event itself.

### Return

Umbrella instance

### Examples

An auto-save feature that submits the form through ajax every 10 seconds

```js
// Make the form to submit through ajax
u('form.edit').ajax();

// Submit it every 10s
setInterval(function(){
  u('form.edit').trigger('submit');
}, 10000);
```


### Related

- [.on()](#on) add an event listener to the matched nodes
- [.off(event, callback)](#off) Removes an event from matched nodes
