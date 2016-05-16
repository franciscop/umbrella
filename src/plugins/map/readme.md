## .map()

Change the content of the current instance by looping each element

```js
.map(function(){});
```


### Parameters

A single callback that returns the element(s) that are going to be kept:

```js
var links = u('.special li').map(function(node, i){
  if (parseInt(node.innerHTML) > 10) {
    return '<a>' + u(node).data('id') + '</a>';
  }
}).addClass('expensive');
```

It can return a value that evaluates to false, a single element, an string, an array or an Umbrella instance. It will remove any duplicated node from the result.

> Note: Umbrella JS is made to manipulate HTML nodes so it will consider the string "" and 0 as false and remove them. Return an HTML node or an HTML string to keep the elements.



### Return

The last html node or false if there is none.



### Examples

Retrieve the last element of a list:

```js
var next = u("ul.demo li").last();
```



### Related

[.first()](#first) retrieve the first matched element
