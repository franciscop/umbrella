## .off()

Remove event handler from matched nodes

```js
.off('event1')
.off('event1 event2 eventN')
.off('event1,event2,eventN')
.off(['event1', 'event2', 'eventN'])
.off('event1', callback)
.off('event1', 'selector', callback)

```


### Parameters

`event1`, `event2`, `eventN`: the name(s) of the events to remove, such as `click`, `submit`, `change`, etc.

`selector` (optional): a CSS selector that matches the nodes that will trigger it. Use this only if the event was delegated, see [`.on()`](#on) for more info.

`callback` (optional): the specific function to be removed. If this is left empty, all the functions associated with the event will be removed.


### Return

Umbrella instance



### Examples

```html
<ul>
  <li class="off-single-test">1</li>
  <li class="off-multiple-test">2</li>
  <li class="off-multiple-test">3</li>
</ul>
```

```js
const listener = function() {
  alert('called');
}

//Add listener
u('.off-multiple-test').on('click', listener);
//Trigger event
u('.off-multiple-test').trigger('click'); //Alert appears
//Remove listener
u('.off-multiple-test').off('click', listener);
//Trigger event
u('.off-multiple-test').trigger('click'); //No alert
```

### Related

[.on()](#on) Attaches an event to matched nodes

[.handle()](#handle) Same as `.on()`, but it prevents the default action

[.trigger()](#trigger) Triggers an event on all of the matched nodes
