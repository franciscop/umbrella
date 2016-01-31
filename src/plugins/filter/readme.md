## .filter()

Remove all the nodes that doesn't match the criteria

```js
.filter('a')
.filter(u('a'))
.filter(function(node, i){ return u(node).is('a'); })
```


### Parameters

`filter`: it can be:
  - css selector that each of the nodes must match to stay
  - instance of umbrella with the elements to keep (the intersection will be kept)
  - function that returns a boolean with true to keep the element. It accepts two parameters, `node` and `index`, and the context of `this` is the instance of umbrella so methods like `this.slice()` are available


### Returns

An instance of Umbrella with the nodes that passed the filter.


### Examples

Get only the active links

```js
var links = u('a').filter('.active');
```

Get all of the paragraphs with a link:

```js
var paragraphs = u('p').filter(function(node){
  return u(node).find('a').length > 0;
});
```

Get only the inputs with an answer above 5 and show an error:

```js
u('input').filter(function(node, i){
  if (parseInt(u(node).first().value) > 5) {
    return true;
  }
}).addClass('error');
```


### Related

[.is()](#is) check whether one or more of the nodes is of one type

[.not()](#not) remove all the nodes that match the criteria