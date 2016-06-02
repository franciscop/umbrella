## .append()

Add some html as a child at the end of each of the matched elements

```js
.append(html)

.append('<div>')
.append(u('<div>'))
.append(u('<div>').first()) // Same as document.createElement('div')
.append(u('<div></div><div></div>'))
.append(function(){})
.append(function(el){}, elements)
.append(function(el){}, 10)
```



### Parameters

`html = ""`:
  - Any of these elements:
    - **string** containing the html that is going to be inserted
    - **instance of Umbrella**
    - **HTML node**
    - **array** containing HTML nodes
  - A callback that returns any of the previous. It gets passed these parameters:
    - **el**: the current element from the elements parameter, {} if none is specified and i if elements is number
    - **i**: the index of the current element

`elements = [{}]` (optional): It can be any of the following:
  - An array of elements that will be passed to the callback. The callback is executed once per element, and all of them are added consecutively.
  - A css selector, so the function will be executed once per matched element.
  - A number, in which case the function will be executed that number of times



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

They all result in:

```html
<ul>
  <!-- previous data -->

  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

You can also add some events to them by creating an html node:

```js
function greet(){ alert("Hello world"); }

u("a.main").append(function(){
  return u('<a>').addClass('hi').on('click', greet).html("Hey!");
});
```



### Related

[.prepend()](#prepend) Add some html as a child at the beginning of each of the matched elements.

[.before()](#before) Add some html before each of the matched elements.

[.after()](#after) Add some html as a sibling after each of the matched elements.
