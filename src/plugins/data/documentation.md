## .data()

Handle data-* attributes for the matched elements

```js
// GET
.data('name');

// SET
.data('name', 'value');
.data({ name1: 'value', name2: 'value2' });
```


### Parameters

*GET*
`name`: the data-* attribute that we want to get from the first matched element

*SET*
`name`: the data-* attribute that we want to set for all of the matched elements
`value`: what we want to set the attribute to. If it's not defined, then we get the name



### Return

*GET*
`string`: the value of the data-* attribute

*SET*
`u`: data-* returns the same instance of Umbrella JS


### Examples

Get the value for data-id:

```js
u('ul li').first().data('id');
```

Set the data-id of an element:

```js
u('ul li').first().data({ id: '1' });

u('ul li').first().data('id', '2');
```


### Related

[.data(name, value)](#data)
[.html(html)](#html)
