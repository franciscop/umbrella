## .before()

Add some html before each of the matched elements.

```js
.before(html)
.before(function(){})
.before(function(el){}, elements)
```


### Parameters

`html`: a string containing the html that is going to be inserted.



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add a header to each of the articles

```js
u("article").after("<header>Hello world</header>");
```

Add three elements before the link. All of these methods are equivalent:

```js
// Add them all like a single string
u("a.main").before("<a>One</a><a>Two</a><a>Three</a>");

// Add them in a chain
u("a.main").before("<a>One</a>").before("<a>Two</a>").before("<a>Three</a>");

// Add them with a function parameter
var cb = function(txt){ return "<a>" + txt + "</a>" };
u("a.main").before(cb, ["One", "Two", "Three"]);

// Same as the previous one but with ES6
u("a.main").before(txt => `<a>${ txt }</a>`, ["One", "Two", "Three"]);
```

They all result in:

```html
<a>One</a>
<a>Two</a>
<a>Three</a>
<a class="main"></a>
```




### Related

[.after(html)](#after) Add some html as a sibling after each of the matched elements.

[.append(html)](#append) Add some html as a child at the end of each of the matched elements

[.prepend(html)](#prepend) Add some html as a child at the beginning of each of the matched elements.
