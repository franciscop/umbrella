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

```html
<ul>
  <li data-id='0'>First</li>
  <li data-id='1'>Second</li>
  <li data-id='2'>Third</li>
</ul>
```

```js
u('ul li').first().data('id'); // 0
```

Set the data-id of an element:

```js
u('ul li').first().data({ id: '1' }); // <li data-id='1'>First</li>

u('ul li').first().data('id', '2'); // <li data-id='2'>First</li>
```


### Related

[.attr()](#attr) handle attributes for the matched elements
