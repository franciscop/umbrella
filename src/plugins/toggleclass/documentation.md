## .toggleClass()

Toggles html class(es) to all of the matched elements.

```js
.toggleClass('name1');
.toggleClass('name1 name2 nameN');
.toggleClass('name1,name2,nameN');
.toggleClass('name1', true);
```

### Parameters

`name1`, `name2`, `nameN`: the class name (or variable containing it) to be toggled to all of the matched elements. It accepts many different types of parameters (see above).
`addOrRemove`: boolean telling the method whether to force an `.addClass()` or `.removeClass()`. 



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add the class `main` to all the `<h2>` from the page:

```js
u("h2").toggleClass("main");
```

Add the class `toValidate` and remove `ajaxify` from the element `<form class="ajaxify">` present in the page:

```js
u("form.ajaxify").toggleClass("toValidate", "ajaxify");
```

Force an `.addClass()` on the element `<h2>` from the page:

```js
u("h2").toggleClass("main", true);
```



### Related
[.addClass(name)](#addclass) adds class(es) from the matched elements.

[.removeClass(name)](#removeclass) deletes class(es) from the matched elements.

[.hasClass(name)](#hasclass) finds if the matched elements contain the class(es)
