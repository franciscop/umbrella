## .scroll()

Scroll to the first matched element, smoothly if supported.

```js
.scroll()
```


### Examples

Scroll to the first `<li>` in the page:

```js
u('li').scroll();
```

On click event, scroll the first `<section>` element with the class "team":

```js
u('a.team').on('click', function(e){
  e.preventDefault();
  u('section.team').scroll();
});
```
