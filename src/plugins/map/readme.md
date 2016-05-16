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

It can return a value that evaluates to false, a single element, an string, an array or an Umbrella instance. It will **remove duplicated nodes** from the result.

> Note: Umbrella JS is made to manipulate HTML nodes so it will consider the string "" and 0 as false and remove them. Return an HTML node or an HTML string to keep the elements.



### Return

An instance of Umbrella with the nodes passed



### Examples

Get the parent elements (see [.parent()](#parent)):

```js
var lists = u('li').map(function(node){ return node.parentNode });
```



### Related

[.each()](#each) loop all the elements without changing them
