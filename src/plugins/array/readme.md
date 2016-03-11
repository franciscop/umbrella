## .array()

Extract structured data from the DOM.

```js
.array()
.array(callback)
```

### Parameters

`callback = function(node, i){ return node.innerHTML }`: a callback to be called on each node. The returned value is the one set on the final version. If an array is returned then these elements are added to the set. However, if nothing or null is returned it removes them.


### Return

A simple javascript array consisting on the elements returned by the callback



### Example

```html
<ul>
  <li>Peter</li>
  <li>Mery</li>
  <li>John</li>
</ul>
```

Javascript (by default):

```js
u('ul li').array();
// ['Peter', 'Mery', 'John']
```

Javascript (with custom callback):

```js
u('ul li').array(function(node){
  return { name: u(node).text() };
});
// [{ name: 'Peter' }, { name: 'Mery' }, { name: 'John' }]
```
