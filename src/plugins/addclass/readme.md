## .addClass()

Add html class(es) to all of the matched elements.

```js
.addClass('name1')
.addClass('name1 name2 nameN')
.addClass('name1,name2,nameN')
.addClass('name1', 'name2', 'nameN')
.addClass(['name1', 'name2', 'nameN'])
.addClass(['name1', 'name2'], ['name3'], ['nameN'])
.addClass(function(){ return 'name1'; })
.addClass(function(){ return 'name1'; }, function(){ return 'name2'; })
```

### Parameters

`name1`, `name2`, `nameN`: the class name (or variable containing it) to be added to all of the matched elements. It accepts many different types of parameters (see above).



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Add the class `main` to all the `<h2>` from the page:

```js
u("h2").addClass("main");
```

Add the class `toValidate` and `ajaxify` to all the `<form>` present in the page:

```js
u("form").addClass("toValidate", "ajaxify");
```



### Related

[.hasClass()](#hasclass) finds if the matched elements contain the class(es).

[.removeClass()](#removeclass) deletes class(es) from the matched elements.

[.toggleClass()](#toggleclass) adds or removes the class
