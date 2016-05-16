## .replace()

Replace the matched elements with the passed argument.

```js
.replace();
```

### Parameters

The parameter can be any of these types:
  - string:  html tag like `<div>`
  - function: a function which returns an html tag.


### Return

The newly created element.



### Examples

Replace elements with class 'save' by a button with class 'update':

```js
u('.save').replace('<button class="update">Update</button>');
```

Replace element button by a link with class 'button':

```js
u('button').replace(function(btn){
  return '<a class="button">' + btn.innerHTML + '</a>';
});
```
