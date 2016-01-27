## .before()

Add some html before of each of the matched elements.

```js
.before(html);
```


### Parameters

`html`: a string containing the html that is going to be inserted.



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add a header to each of the articles

```js
u("article").after("<header>Hello world</header>");
```



### Related

[.after(html)](#after)

[.append(html)](#append)

[.prepend(html)](#prepend)