## .on()

Calls a function when an event is triggered

```js
.on('event1', callback)
.on('event1 event2 eventN', callback)
.on('event1,event2,eventN', callback)
.on(['event1', 'event2', 'eventN'], callback)
.on('event1', 'selector', callback)
```



### Parameters

`event1`, `event2`, `eventN`: the name(s) of the events to listen for actions, such as `click`, `submit`, `change`, etc.

`callback`: function that will be called when the event is triggered. The parameters it accepts are `function(e, data1, data2, ..., dataN)`:

  - `e`: the event that was triggered. It has some interesting properties:

    - `e.currentTarget`: Contains the element that triggered the event.
    - `e.preventDefault()`: Avoids the browser from performing the default action.
    - `e.details`: an array of the argument data passed to `trigger()` if it was passed with that function. See other arguments:

  - `data1`, `data2`, `dataN`: the arguments that were passed to `trigger()` if it was called with that function.

Another way is doing event delegation, for which the parameters are:

`event1`, `event2`, `eventN`: same as before

`selector`: a css selector that matches the nodes that will trigger it

`callback`: same as before


### Return

Umbrella instance



### Examples

An auto-save feature that submits the form through ajax every 10 seconds

```js
// Show 'test' when the button test is clicked
u('button.test').on('click', function(e) {
  alert("Test");
});

// Submit a form through Ajax
u('form.test').on('submit', function(e){

  // Avoid submitting the form normally
  e.preventDefault();

  // Submit the form through ajax
  fetch(u(this).attr('action'), { body: u(this).serialize(), ... });
});

// Better 'onchange':
u('input').on('change click blur paste', function(){
  console.log("Maybe changed");
});
```



### Related

[.handle()](#off) Same as `.on()`, but it prevents the default action

[.trigger()](#trigger) calls an event on all of the matched nodes

[.off()](#off) Removes an event from  matched nodes
