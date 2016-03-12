## .before()

Add some html before each of the matched elements.

```js
.before(html)

.before('<div>')
.before(u('<div>'))
.before(u('<div>').first()) // Same as document.createElement('div')
.before(u('<div></div><div></div>').nodes)
.before(function(){})
.before(function(el){}, elements)
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

You can also add some events to them by creating an html node:

```js
function greeting(){ alert("Hello world"); }

u("a.main").before(function(){
  return u('<a>').addClass('hi').on('click', greeting).html("Greetings!");
});
```



### Related

[.after(html)](#after) Add some html as a sibling after each of the matched elements.

[.append(html)](#append) Add some html as a child at the end of each of the matched elements

[.prepend(html)](#prepend) Add some html as a child at the beginning of each of the matched elements.
