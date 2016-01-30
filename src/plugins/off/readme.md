## .off()

Remove event handler from matched nodes

```js
u('.off-multiple-test').off('click', listener);
u('.off-multiple-test').off('click mouseover', listener);
u('.off-multiple-test').off('event1 event2 eventN', listener);

```


### Parameters

`event`:
  Any number of events (such as click, mouseover)    
`listener`:
  Function reference to remove from the events

```js
.not(function(node){
  // your code
});
```



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

- [.on(event, callback)](#on) Attaches an event to matched nodes
- [.trigger(event)](#trigger) Triggers an event on all of the matched nodes
