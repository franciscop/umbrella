## .resize()

Calls a function when the window is resized

```js
.resize(callback);
```

### Parameters

`callback`: function that will be called when the event is triggered. This function doesn't take any parameters

### Return

Umbrella instance

### Examples

An auto-save feature that submits the form through ajax every 10 seconds

```js
// Show 'test' when the button test is clicked
u().resize(function () {
  console.log('window has been resized');
});
```
