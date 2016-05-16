## .off()

Remove event handler from matched nodes

```js
.off('event1')
.off('event1 event2 eventN')
.off('event1,event2,eventN')
.off(['event1', 'event2', 'eventN'])
```


### Parameters

`event`:
  Any number of events (such as click, mouseover)

`listener`:
  Function reference to remove from the events



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
