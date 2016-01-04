## .after()

Add some html as a sibling after each of the matched elements.

```js
.after(html);
```


### Parameters

`html`: a string containing the html that is going to be inserted.



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
