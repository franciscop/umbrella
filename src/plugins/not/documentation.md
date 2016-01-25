## .not()

Remove known nodes from nodes

```js
.not(elems)
```


### Parameters

`not`: it can be two things:
  - css selector that each of the nodes must not match to stay
  - object of nodes to remove
  
```js
.not(u('.to-remove'));

.not('.to-remove');
```


### Examples

```html
<ul class="menu">
    <li><a class="active">Menu item 1</a></li>
    <li><a>Menu item 2</a></li>
    <li><a>Menu item 3</a></li>
</ul>
```

Get only the non-active links on paragraphs

```js
var nonactive_links = u('.menu a').not('.active');
```

Get all of the active:

```js
active_links = u('.menu a').not(nonactive_links);
```


### Related

- [.is(filter)](#is) check whether one or more of the nodes is of one type

- [.filter(filter)](#filter) Remove unwanted nodes
