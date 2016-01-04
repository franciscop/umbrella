## .append()

Add some html as a child at the end of each of the matched elements.

```js
.append(html);
```


### Parameters

`html`: a string containing the html that is going to be inserted.



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add a footer to each of the articles

```js
u("article").after("<footer>Hello world</footer>");
```



### Related

- [.prepend(html)](#prepend)

- [.before(html)](#before)

- [.after(html)](#after)
