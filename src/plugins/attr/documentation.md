## .attr()

**Handle attributes for the matched elements**

```js
// GET
.attr('name');

// SET
.attr('name', 'value');
.attr({ name: 'value', name2: 'value2' });
```


### Parameters

*GET*
`name`: the attribute that we want to get from the first matched element

*SET*
`name`: the attribute that we want to set for all of the matched elements
`value`: what we want to set the attribute to. If it's not defined, then we get the name



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add a separator `<hr>` after each of the main titles h1:

```js
u("h1").after("<hr>");
```



### Related

[.before(html)](#before)

[.append(html)](#append)

[.prepend(html)](#prepend)
