## .filter()

Remove unwanted nodes

```js
.filter('a')
.filter(u('a'))
.filter(function(node, index){ u(node).is('a'); })
```


### Parameters

`filter`: it can be:
  - css selector that each of the nodes must match to stay
  - instance of umbrella with the element to keep
  - function that returns a boolean with true to keep the element. It accepts two parameters, `node` and `index`, and the context of `this` is the instance of umbrella so methods like `this.slice()` are available:
  
```js
.filter(function(node, index){
  // your code
});
```


### Examples

Get only the active links

```js
var links = u('a').filter('.active');
```

Get all of the paragraphs with a link:

```js
var paragraphs = u('p').filter(function(node){
  return u(node).find('a').nodes.length > 0;
});
```

Filter the inputs to those with an answer above 5 and show an error:

```js
u('input').filter(function(node, i){
  if (parseInt(u(node).html()) > 5) {
    return true;
  }
}).addClass('error');
```


### Related

[.is(filter)](#is) check whether one or more of the nodes is of one type
