## .on()

Calls a function when an event is triggered

```js
.on('event1', callback)
.on('event1 event2 eventN', callback)
.on('event1,event2,eventN', callback)
.on(['event1', 'event2', 'eventN'], callback)
```



### Parameters

`event1`, `event2`, `eventN`: the name(s) of the events to listen for actions, such as `click`, `submit`, `change`, etc.

`callback`: function that will be called when the event is triggered. It accepts a single parameter, the event itself.



### Return

Umbrella instance



### Examples

An auto-save feature that submits the form through ajax every 10 seconds

```js
// Show 'test' when the button test is clicked
u('button.test').on('click', function(e) {
  alert("Test");
});

// This example is very similar to .ajax() implementation
u('form.test').on('submit', function(e){

  // Avoid submitting the form normally
  e.preventDefault();

  // Submit the form through ajax
  ajax(u(this).attr('action'), u(this).serialize());
});

// Better 'onchange':
u('input').on('change click blur paste', function(){
  console.log("Maybe changed");
});
```



### Related

[.trigger()](#trigger) calls an event on all of the matched nodes

[.off(event, callback)](#off) Removes an event from  matched nodes
