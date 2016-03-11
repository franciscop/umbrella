## .parent()

Retrieve each parent of the matched nodes, optionally filtered by a selector

```js
.parent()
.parent('p')
.parent(u('p'))
.parent(function(node, i){})
```


### Parameters

`selector`: Optional filter argument for the parents



### Examples

Retrieve all of the parents of `<li>` in the page:

```js
u('li').parent();
```

Retrieve all the paragraphs that have a link as a direct child

```js
u('a').parent('p');
```


### Related

[.children()](#parent) get all of the direct children

[.find()](#find) get all of the descendants of the matched nodes

[.closest()](#closest) get the first ascendant that matches the selector