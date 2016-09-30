## .attr()

Handle attributes for the matched elements

```js
// GET
.attr('name');

// SET
.attr('name', 'value');
.attr({ name1: 'value', name2: 'value2' });
```


### Parameters

*GET*

`name`: the attribute that we want to get from the first matched element


*SET*

`name`: the attribute that we want to set for all of the matched elements

`value`: what we want to set the attribute to. If it's not defined, then we get the name



### Return

*GET*

`string`: the value of the attribute

*SET*

`u`: returns the same instance of Umbrella JS



### Important

You must understand that `.attr()` will only retrieve the attributes, not the properties like `checked`. To understand it better, check [jquery's attr() vs prop()](http://api.jquery.com/prop/).

Each property is different so you should consult each case. For example, if you wanted to get the property `checked` you could do:

```js
u('.terms-os-service').is(':checked');
```



### Examples

Get the alt of an image:

```js
u('img.hero').attr('alt');
```

Set the src of all of the images:

```js
u('img').attr({ src: 'demo.jpg' });
```


### Related

[.data()](#data) handle data-* attributes for the matched elements