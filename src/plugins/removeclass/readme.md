## .removeClass()

Remove html class(es) to all of the matched elements.

```js
.removeClass('name1');
.removeClass('name1 name2 nameN');
.removeClass('name1,name2,nameN');
.removeClass('name1', 'name2', 'nameN');
.removeClass(['name1', 'name2', 'nameN']);
.removeClass(['name1', 'name2'], ['name3'], ['nameN']);
.removeClass(function(){ return 'name1'; });
.removeClass(function(){ return 'name1'; }, function(){ return 'name2'; });
```


### Parameters

`name1`, `name2`, `nameN`: the class name (or variable containing it) to be removed to all of the matched elements. It accepts many different types of parameters (see above).



### Return

`u`: returns the same instance of Umbrella JS



### Examples

Remove the class `main` to all the `<h2>` from the page:

```js
u("h2").removeClass("main");
```

Remove the class `toValidate` and `ajaxify` to all the `<form>` present in the page:

```js
u("form").removeClass("toValidate", "ajaxify");
```

### Related

[.addClass()](#addclass) adds class(es) from the matched elements.

[.hasClass()](#hasclass) finds if the matched elements contain the class(es)
