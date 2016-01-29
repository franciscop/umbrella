## .prepend()

This method is similar to `append`. However note that, unlike append, the elements are inserted in *inverse* order. So all of these methods are equivalent:

```js
// Add them all like a single string
u("ul").prepend("<li>One</li><li>Two</li><li>Three</li>");

// Add them in a chain
u("ul").prepend("<li>Three</li>").append("<li>Two</li>").append("<li>One</li>");

// Add them with a function parameter
var cb = function(txt){ return "<li>" + txt + "</li>" };
u("ul").prepend(cb, ["Three", "Two", "One"]);

// Same as the previous one but with ES6
u("ul").prepend(txt => `<li>${ txt }</li>`, ["Three", "Two", "One"]);
```

And they will yield:

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  
  <!-- previous data -->
</ul>
```

You can *fix* this in the method that accepts `data` with a simple `.reverse()`. This will yield the same html:

```js
u("ul").prepend(cb, ["One", "Two", "Three"].reverse());
```

However, as it should be obvious, it cannot be reversed in the chainable method.
