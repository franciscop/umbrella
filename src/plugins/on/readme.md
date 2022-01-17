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

`selector`: a CSS selector that matches the nodes that will trigger it

`callback`: same as before


### Return

Umbrella instance



### Examples

An auto-save feature that submits the form through AJAX every 10 seconds

```js
// Show 'test' when the button test is clicked
u('button.test').on('click', function(e) {
  alert("Test");
});

// Submit a form through Ajax
u('form.test').on('submit', function(e){

  // Avoid submitting the form normally
  e.preventDefault();

  // Submit the form through AJAX
  fetch(u(this).attr('action'), { body: u(this).serialize(), ... });
});

// Better 'onchange':
u('input').on('change click blur paste', function(){
  console.log("Maybe changed");
});
```

If you are modifying a bit of the DOM dynamically and want to attach events to it, a good way of doing it is with event delegation. For example, let's say we have the `.render` class for rendering a bit of markdown to html, and we want to listen to any click to any link inside and intercept them. We could do `u('.render a')` every time, or just do it once with delegation:

```js
// Without event delegation, we are forced to add the event listeners every time
// we re-render the block of code
function renderHtml(plain) {
  const content = sanitize(plainToHtml(plain));
  u('.render').html(content);
  u('.render a').on('click', function(node) {
    alert('Clicked on ' + u(node).attr('href'));
  });
}

// With event delegation, we can listen once for all clicks on links:
u('.render').on('click', 'a', function(node) {
  alert('Clicked on ' + u(node).attr('href'));
});
// The above will listen to clicks on links even if the html changes dynamically
function renderHtml(plain) {
  const content = sanitize(plainToHtml(plain));
  u('.render').html(content);
}
```



### Related

[.handle()](#handle) Same as `.on()`, but it prevents the default action

[.trigger()](#trigger) calls an event on all of the matched nodes

[.off()](#off) Removes an event from  matched nodes
