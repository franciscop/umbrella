## .wrap()

Wraps the matched element(s) with the passed argument. The argument gets processed with the constructor u() and it accepts an html tag like ```.wrap('<div>')```

```js
.wrap(selector);
```


### Parameters

`selector`: a formatted string of the desired selector. For example ```.wrap('<div>')```



### Return

`u`: returns an instance of Umbrella JS with the wrapped node(s)



### Examples

Wrap an element in an html element:

Original element:
```html
<button class="example">Link1</button>
```

```js
u(".example").wrap('<a class="wrapper">');
```

Result:
```html
<a class="wrapper">
  <button class="example">Link1</button>
</a>
```

Wrap an element in an html element and chain umbrella.js methods:

```js
u(".example").wrap('<a>').attr({class: "wrapper", href: "http://google.com"});
```

Result:
```html
<a href="http://google.com" class="wrapper">
  <button class="example">Link1</button>
</a>
```

Wrap several elements in an html element

```html
<button class="example">Link1</button>
<button class="example">Link2</button>
<button class="example">Link3</button>

```

```js
u(".example").wrap('<a>').attr({class: "wrapper", href: "http://google.com"});
```

Result:
```html
<a href="http://google.com" class="wrapper">
  <button class="example">Link1</button>
</a>
<a href="http://google.com" class="wrapper">
  <button class="example">Link2</button>
</a>
<a href="http://google.com" class="wrapper">
  <button class="example">Link3</button>
</a>
```

> Note: Unlike [jQuery wrap](http://api.jquery.com/wrap/), passing nested arguments (e.g. ```wrap('<div><div></div></div>')```) is not supported at this time.
