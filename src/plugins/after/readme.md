## .after()

Add some html as a sibling after each of the matched elements.

```js
.after(html)

.after('<div>')
.after(u('<div>'))
.after(u('<div>').first()) // Same as document.createElement('div')
.after(u('<div></div><div></div>').nodes)
.after(function(){})
.after(function(el){}, elements)
```



### Parameters

`html = ""`:
  - Any of these elements:
    - a string containing the html that is going to be inserted
    - an instance of Umbrella
    - an HTML node
    - an array containing HTML nodes
  - A callback that returns any of the previous. It gets passed these parameters:
    - el: the current element from the [elements] array (or "" if none)
    - i: the index of the current element

`elements = [""]`: an array of elements that will be passed to the callback. The callback is executed once per element, and all of them are appended consecutively. It can also be a css selector, so the function will be executed once per matched element.



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add a separator `<hr>` after each of the main titles h1:

```js
u("h1").after("<hr>");
```

Add three elements after the link. All of these methods are equivalent:

```js
// Add them all like a single string
u("a.main").after("<a>One</a><a>Two</a><a>Three</a>");

// Add them in a chain
u("a.main").after("<a>Three</a>").after("<a>Two</a>").after("<a>One</a>");

// Add them with a function parameter
var cb = function(txt){ return "<a>" + txt + "</a>" };
u("a.main").after(cb, ["One", "Two", "Three"]);

// Same as the previous one but with ES6
u("a.main").after(txt => `<a>${ txt }</a>`, ["One", "Two", "Three"]);
```

They all result in:

```html
<a class="main"></a>
<a>One</a>
<a>Two</a>
<a>Three</a>
```

You can also add some events to them by creating an html node:

```js
function greeting(){ alert("Hello world"); }

u("a.main").after(function(){
  return u('<a>').addClass('hi').on('click', greeting).html("Greetings!");
});
```



### Related

[.before()](#before) Add some html before each of the matched elements.

[.append()](#append) Add some html as a child at the end of each of the matched elements

[.prepend()](#prepend) Add some html as a child at the beginning of each of the matched elements.
