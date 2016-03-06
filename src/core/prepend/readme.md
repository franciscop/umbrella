## .prepend()

Add some html as a child at the beginning of each of the matched elements.

```js
.prepend(html)
.prepend(function(){})
.prepend(function(el){}, elements)
```



### Parameters

`html = ""`: a string containing the html that is going to be inserted or a function that returns the html to be inserted.

`elements = [""]`: an array of elements that will be passed to the callback. The callback is executed once per element, and all of them are appended consecutively. It can also be a css selector, so the function will be executed once per matched element.



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add a header to each of the articles

```js
u("article").prepend("<header>Hello world</header>");
```

Add three elements at the beginning of the list. All of these methods are equivalent:

```js
// Add them all like a single string
u("ul").prepend("<li>One</li><li>Two</li><li>Three</li>");

// Add them in a chain
u("ul").prepend("<li>Three</li>").append("<li>Two</li>").append("<li>One</li>");

// Add them with a function parameter
var cb = function(txt){ return "<li>" + txt + "</li>" };
u("ul").prepend(cb, ["One", "Two", "Three"]);

// Same as the previous one but with ES6
u("ul").prepend(txt => `<li>${ txt }</li>`, ["One", "Two", "Three"]);
```

They all result in:

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>

  <!-- previous data -->
</ul>
```



### Related

[.append(html)](#append) Add some html as a child at the end of each of the matched elements

[.before(html)](#before) Add some html before each of the matched elements.

[.after(html)](#after) Add some html as a sibling after each of the matched elements.
