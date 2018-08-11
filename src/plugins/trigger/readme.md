## .trigger()

Calls an event on all of the matched nodes

```js
.trigger('event1', data)
.trigger('event1 event2 eventN', data1, data2, dataN)
.trigger('event1,event2,eventN', data1, data2, dataN)
.trigger(['event1', 'event2', 'eventN'], data1, data2, dataN)
```



### Parameters

`event1`, `event2`, `eventN`: the name(s) of the events to listen for actions, such as `click`, `submit`, `change`, etc.

`data1`, `data2`, `dataN` (optional): the data that will be passed to the event listener in the `e.details` variable and as arguments.


### Return

Umbrella instance



### Examples

An auto-save feature that submits the form through ajax every 10 seconds

```js
// Submit it every 10s
setInterval(function(){
  u('button.save').trigger('click');
}, 10000);
```


### Related

[.on()](#on) add an event listener to the matched nodes

[.handle()](#off) Same as `.on()`, but it prevents the default action

[.off()](#off) Removes an event from matched nodes
