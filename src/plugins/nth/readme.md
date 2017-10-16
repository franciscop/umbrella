## .nth()

Retrieve the nth of the matched nodes

```js
.nth(1);
```


### Parameters

`index`: The element number in the list starting at 1 index (like css)

### Return

The nth html node or false if it doesnt exist.



### Examples

Retrieve the second element of a list:

```js
var secondElement = u("ul.demo li").nth(2);
```



### Related

[.first()](#first) retrieve the first matched element
[.last()](#last) retrieve the last matched element
