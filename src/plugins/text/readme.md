## .text()

Retrieve or set the text content of matched elements:


```js
// GET
.text();

// SET
.text(text);
```


### Parameters

*GET*
should pass no parameter so it retrieves the text from the first matched element.

*SET*
`html`: the new text content that you want to set for all of the matched elements. To remove it, pass an empty string: `""`



### Return

*GET*
`string`: the text content of the first matched element

*SET*
`u`: returns the same instance of Umbrella JS



### Examples

Get the main title text:

```js
var title = u('h1').text();
```

Set the main title text:

```js
u('h1').text('Hello world');
```


### Related

[.html()](#html) Retrieve or set the HTML of matched elements
