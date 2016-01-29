## .append()

Add some html as a child at the end of each of the matched elements.

```js
.append(html);
.append()
```


### Parameters

`html`: a string containing the html that is going to be inserted or a function that returns the 
`data`, defaults `[""]`: an array of elements which will passed to the callback. The callback is executed once per element, and all of them are appended consecutively



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add a footer to each of the articles

```js
u("article").append("<footer>Hello world</footer>");
```

Add three elements to the list. All of these methods are equivalent:

```js
// Add them all like a single string
u("ul").append("<li>One</li><li>Two</li><li>Three</li>");

// Add them in a chain
u("ul").append("<li>One</li>").append("<li>Two</li>").append("<li>Three</li>");

// Add them with a function parameter
var cb = function(txt){ return "<li>" + txt + "</li>" };
u("ul").append(cb, ["One", "Two", "Three"]);

// Same as the previous one but with ES6
u("ul").append(txt => `<li>${ txt }</li>`, ["One", "Two", "Three"]);
```


### Related

[.prepend(html)](#prepend)

[.before(html)](#before)

[.after(html)](#after)
