## .val()

Retrieve or set the value of matched elements:


```js
// GET
.val();

// SET
.val(text);
```


### Parameters

*GET*
should pass no parameter so it retrieves the value from the first matched element.

*SET*
`html`: the new value that you want to set for all of the matched elements. To remove it, pass an empty string: `""`



### Return

*GET*
`string`: the value of the first matched element

*SET*
`u`: returns the same instance of Umbrella JS



### Examples

Get the value of the input:

```js
let text = u('input').val();
```

Set the value of an input:

```js
u('input').val('Hello world');
```


### Related

[.html()](#html) Retrieve or set the HTML of matched elements
[.text()](#text) Retrieve or set the text content of matched elements
