## .css()

Get the value of a computed style property for the first node of matched elements or set one or more CSS properties for every matched nodes:


```js
// GET
.css(propertyName);

// SET
.css(propertyName, value);
.css(properties);
```


### Parameters

*GET*
`propertyName`: CSS property of computed style to retrieve from the first matched element. Possible formats: camelCase ("backgroundColor") or kebab-case ("background-color").

*SET*
`value`: the new value of computed style that you want to set for all of the matched elements. Value without unit is interpreted as pixels. To remove it, pass an empty string: `""`
`properties`: a plain object of property-value pairs to set.


### Return

*GET*
`string`: the computed style of the first matched element

*SET*
`u`: returns the same instance of Umbrella JS



### Examples

Set main title styles

```js
u('h1').css('color', 'red').css('font-size', 50);
```

Multiple properties passed as a plain object

```js
u('h1').css({
    color: 'red',
    fontSize: 50
});
```

Get main title style

```js
u('h1').css('font-size');
// 50px
```


### Related

[.html()](#html) Retrieve or set the HTML of matched elements
