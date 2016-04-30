## .hasClass()

Find if any of the matched elements contains the class passed:

```js
.hasClass('name1');
.hasClass('name1 name2 nameN');
.hasClass('name1,name2,nameN');
.hasClass('name1', 'name2', 'nameN');
.hasClass(['name1', 'name2', 'nameN']);
.hasClass(['name1', 'name2'], ['name3'], ['nameN']);
.hasClass(function(){ return 'name1'; });
.hasClass(function(){ return 'name1'; }, function(){ return 'name2'; });
```

If more than one class is passed, they are checked **with the AND condition** similar to:

```js
u("a").hasClass("button") && u("a").hasClass("primary");
```


### Parameters

`name1`, `name2`, `nameN`: the class name (or variable containing it) to be matched to any of the matched elements. It accepts many different types of parameters (see above).


### Return

**`boolean`**: returns true if all of the passed classes are found in any of the matched elements and false if they couldn't be found.



### Example

You can also check manually if it has several classes with the OR parameter with:

```js
u('a').is('.button, .primary');
```

And with the AND parameter:

```js
u('a').is('.button.primary');
```


Toggle the color of a button depending on the status

```html
<a class="example button">Click me</a>

<script src="//umbrellajs.com/umbrella.min.js"></script>
<script>
  u(".example").on('click', function() {
    if(u(this).hasClass("error")) {
      u(this).removeClass("error").html("Click me");
    } else {
      u(this).addClass("error").html("Confirm");
    }
  });
</script>
```


### Related

[.addClass()](#addclass) adds html class(es) to each of the matched elements.

[.removeClass()](#removeclass) deletes class(es) from the matched elements.
