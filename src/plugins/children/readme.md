## .children()

Get the direct children of all of the nodes with an optional filter

```js
.children(filter);
```


### Parameters

`filter`: a string containing a selector that nodes must pass or a function that return a boolean. See [.filter()](#filter) for a better explanation



### Return

`u`: returns an instance of Umbrella JS with the new children as nodes



### Examples

Get the first `<li>` of every `<ul>`

```js
u("ul").children('li:first-child');
```



### Related

[.parent(filter)](#parent) get all of the direct parents

[.find(filter)](#find) get all of the descendants of the matched nodes

[.closest(filter)](#closest) get the first ascendant that matches the selector