## .wrap()

Wraps the matched element(s) with the passed argument. The argument gets processed with the constructor u() and it accepts an html tag like ```.wrap('<div>')```

```js
.wrap(selector);
```


### Parameters

`selector`: a formatted string of the desired selector. For example ```.wrap('<div>')```. Nested selectors are supported in a similar way to [jQuery wrap](http://api.jquery.com/wrap/). For example ```.wrap('<div class="a1"><div class="b1"><div class="c1"></div></div></div>')```. Matched element(s) will be wrapped with innermost node of the first child of a nested argument. See examples below.



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

Nested selector arguments:

```html
<button class="example">Link1</button>
```

```js
u(".example").wrap('<div class="a1"><div class="b1"><div class="c1"></div></div></div>');
```

Result:
```html
<div class="a1">
	<div class="b1">
		<div class="c1">
			<a href="http://google.com" class="wrapper">
			  <button class="example">Link1</button>
			</a>
		</div>
	</div>
</div>
```

Nested selector arguments with multiple child nodes:

```html
<button class="example">Link1</button>
```

```js
u(".example").wrap('<div class="a1"><div class="b1"><div class="c1"></div></div><div class="b2"><div class="c2"><div class="d1"></div></div></div></div>');
```

Result:
```html
<div class="a1">
	<div class="b1">
		<div class="c1">
			<a href="http://google.com" class="wrapper">
			  <button class="example">Link1</button>
			</a>
		</div>
	</div>
	<div class="b2">
		<div class="c2">
			<div class="d1"></div>
		</div>
	</div>
</div>
```