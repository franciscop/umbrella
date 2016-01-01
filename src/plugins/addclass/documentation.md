## .addClass()

**Add html class(es) to each of the matched elements.**

```js
.addClass('name');
.addClass('name another');
.addClass('name,another');
.addClass('name', 'another');
.addClass(['name', 'another']);
```

### Parameters

`name`, `another`: the class name (or variable containing it) to be added to all of the matched elements. It accepts many different types of parameters (see above).



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add the class `main` to all the `<h2>` from the page:

```js
u("h2").addClass("main");
```

Add the class `toValidate` and `ajaxify` to all the `<form>` present in the page:

```js
u("form").addClass("toValidate ajaxify");
// or
u("form").addClass("toValidate", "ajaxify");
```



### Related

[.removeClass(name)](#removeclass) deletes class(es) from the matched elements.

[.hasClass(name)](#hasclass) finds if the matched elements contain the class(es)
