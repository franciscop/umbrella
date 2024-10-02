# Porting from jQuery

UmbrellaJS offers some advantages over jQuery:

- Speed: using native methods makes it faster.
- Size: UmbrellaJS is 3kb in total.
- Clean: making new plugins and reading the code base is easy.

But it has some tradeoffs, mainly the lack of support for IE10- and SVG on IE11.

If you like the easy and readable syntax, **but** don't like how fat and slow jQuery is, you should:

- use **zepto.js** as [drop in replacement](http://zeptojs.com/)
- port to **UmbrellaJS**

**UmbrellaJS** is small (3kb gzipped) and has a similar syntax as jQuery. it use native DOM elements instead of objects, this makes it fast. you can simply replace `$(...)` with `u(...)` in most cases.


## Before porting to UmbrellaJS

UmbrellaJS does not support jQuery extensions! If your scripts make heavy use of extensions it's probably better you stick to jQuery.

Before porting an existing script to a jQuery alternative I strongly recommend to check your jQuery code to be correct.

**Check for usage of `$('.subclass', $('.myclass'))`**

Even `$('.subclass', $('.myclass'))` and `$('.myclass').find('.subclass')` are equivalent, you should use the latter. it's more readable and easier to port.

**Check for correct `$(element)` selection**

Even if your script work, there are some pitfalls where jQuery works when you are using it in the wrong way.

**example:** you need exactly one element by class

`$('#myID')` always returns one element, more exactly the first matching element. all other selectors return ALL elements. If you want to select ONE element of `$('.myclass')` you must use `$('.myclass').first()`, `$('.myclass').last()` or `$('.myclass').eq(n)`. You must not use of `$('.myclass')[0]`

**Avoid advanced non-standard CSS selectors**

Instead of `$('.myclass:not(div, a)')` I strongly suggest to use `$('.myclass').not('div, a')` instead.  It's more readable, faster and works with all CSS standard selectors.

jQuery **extends the `:not()` selector** such that you can pass any selector to it, no matter how complex it may be. the `:not()` pseudo-class in CSS only accepts a _single simple selector_ as an argument to `:not()`.
for more Information [see explanation on Stackoverflow](https://stackoverflow.com/questions/10711730/why-is-my-jquery-not-selector-not-working-in-css#answer-10711731)

### First steps

UmbrellaJS can be used in parallel with jQuery, so you can start porting to UmbrellaJs step by step. simply include `<script src="https://unpkg.com/Umbrellajs"></script>` in your HMTL file or `// @require https://unpkg.com/Umbrellajs` in your script, if you are writing a userscript.

Then you can start changing your statements one by one from jQuery to UmbrellaJS by replacing `$(...)` with `u(...)`.


## Porting tips

While porting [my](https://github.com/gnadelwartz) [enstlyer script](https://greasyfork.org/de/scripts/24244-enstyler-develop/code) from jQuery (more precise from zepto.js) to UmbrellaJS I discoverd some pitfalls I want to share with you. Nevertheless it was easy and it's always helpfull to have the excellent [UmbrellaJS documentation](https://Umbrellajs.com/documentation) in a browser tab.


#### Why does `.replaceWith()` not exist in UmbrellaJS?

This should be very simple, use the UmbrellaJS `.replace()` method instead. It has nothing to do with the native javascript .replace() method for arrays though, so make sure not to mix them up.

If you wants to stay with `.replaceWith` like in jQuery and does not care about an extra function call, adding this to your script may help:

```
u.prototype.replaceWith = function(replace){
  return this.replace(replace);
};
```


#### Why does `.css()` not exist in UmbrellaJS?

I generaly avoid to set CSS properties with JavaScript, because it's better and faster handled by CSS rules. To do something similar as jQuery `.css()` get method with UmbrellaJS you can use this `getStyle()` function:

```js
// alternative for jQuery .css() get method
function getStyle(oElm, css3Prop){
  // FF, Chrome etc.
  if(window.getComputedStyle){
    try { return getComputedStyle(oElm).getPropertyValue(css3Prop); }
    catch (e) {}
  } else {
    // IE
    if (oElm.currentStyle){
      try { return oElm.currentStyle[css3Prop]; }
      catch (e) {}
    }
  }
  return "";
}
```

```js
// usage examples
// Umbrella: use one node
getStyle(u('.myClass').nodes[n], "border-radius");

// use one native DOM node
getStyle(getElementsByClassName('myClass')[n], "border-radius");
getStyle(getElementById('myID'), "border-radius");
```

see: https://www.htmlgoodies.com/html5/css/referencing-css3-properties-using-javascript.html#fbid=b2-TgWC-yGY



#### `$(this)`should be replaced by `u(el)`

UmbrellaJS follows the native Javascript callback structure for iterative methods. Your jQuery `.each()` loops might look like this now:

```js
$('.myclass').each(function () {
    ...
    $(this).dosomething();
    ...
});
```

You should change them to look like this:

```js
u('.myclass').each(function (el) {
    ...
    u(el).dosomething();
    ...
});
```

**Note:** Search for occurences of `u(this)` while/after porting, in almost all cases it's not correct!

UmbrellaJS provides the actually processed node as first argument to the called function, [see the documentation for .each()](https://Umbrellajs.com/documentation#each).

As a bonus you get the node index as second argument, so you don't have count it yourself in case you need it:

```js
u('.myclass').each(function (el, i) {
    ...
    alert('This is iteration # ' + i + ' of myclass');
    ...
});
```

This resembles closely the native array `forEach`:

```js
['a', 'b', 'c'].forEach(function (el, i) {
  alert(el);
});
```

Which is also really useful for using Arrow Functions:

```js
u('.myClass').each(el => alert(el.innerHTML));
['a', 'b', 'c'].forEach(el => alert(el));
```


#### Using UmbrellaJS `.first()/.last()/.eq()` returns native DOM elements

In jQuery `.first()/.last()/.eq()` returns a jQuery object, but UmbrellaJS returns a native DOM element. this has pro and con:

- pro: you can use native javascript DOM manipulation
- con: you can't chain an other UmbrellaJS method like in jQuery
- con: be careful to select the correct DOM property/method!

**Wait,** there is no `.eq()` in UmbrellaJS, but you can use `.nodes[n]` as a functional replacment.

**power tip from UmbrellaJS creator:** You can wrap the whole thing into another `u(...)` and use UmbrellaJS functions conveniently.

**example:** how to get inner html of first element:

```js
// jQuery:
$('.myclass').first().html();

// Umbrella: direct access to DOM property innerHTML
u('.myclass').first().innerHTML;

// Umbrella: wrapping it in u(...) again
u( u('.myclass').first() ).html();
```

**example:** how to add html before last element:

```js
// jQuery:
$('.myclass').last().before('<div>this is inserted before</div>');

// Umbrella: direct use of .insertAdjacentHTML() method
u('.myclass').last().insertAdjacentHTML('beforebegin', '<div>this is inserted before</div>');

// Umbrella wrapping it in u(...) again
u( u('.myclass').last() ).before('<div>this is inserted before</div>');

// wrong: do not mix it up with DOM method .before()!
// insert TEXT => "&lt;div&gt,this is inserted before&lt;/div&gt,"
$('.myclass').last().before('<div>this is inserted before</div>');
```

See also documentation of  [.insertAdjacentHTML() ](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentHTML)

**example:** add a DOM node after n'th element:

```js
// create a native DOM node
var myBbutton = document.createElement('input');
myButton.type = 'button';
myButton.setAttribute(enID, 'myID');
myButton.onclick = showConfig;
myButton.value = 'Config ';

// append native DOM node befre n'th element
u('.subNavMenu').nodes[n].after(enMenuButton);
```

If you want to have an UmbrellaJS `.eq()` method and don't care about an extra function call, adding this to your script may help:

```
// get the nth of the nodes
u.prototype.eq = function (index) {
  return this.nodes[index || 0] || false;
}
```

#### How to break out of UmbrellaJS `.each()` loop?

In jQuery you can use `return false;` to stop the iteration of an `.each()` loop.
this is diffrent in UmbrellaJS, the loop always processes all given elememnts!

Depending on your use case you can mimic the jQuery logic in different ways:

**example**: stop after 5'th iterration

```js
u('article').each(function (el,i) {
  if (i>5) return;
  dosometing(el);
})
```

**example**: abort after something failed

```js
var abort=false;
u('article').each(function (el,i) {
  if(abort) return;
  if (! dosometing_ok(el)) abort=true; ;
})
```

#### You miss some jQuery features in UmbrellaJS?

A good source of inspiration is [You Might Not Need jQuery](http://youmightnotneedjquery.com/).
You can also search on [stackoverflow](https://stackoverflow.com/search?q=jquery%20pure%20javascript) for jQuery alternatives in pure JavaScript

You can apply most tips from there to single UmbrellaJS node directly:

```js
// jQuery
$('#hide').hide();
$('.myclass').hide();

// Umbrella: apply "You Might Not Need jQuery" tips to one Umbrella nodes[n]
$('#hide').nodes[0].style.display = 'none';
$('.myclass').nodes[n].style.display = 'none';
```

If you have to apply to all nodes returned from UmbrellaJS, you can use an `.each()` loop to apply to every node

```js
// jQuery
$('.myclass').empty();

// Umbrella: apply "You Might Not Need jQuery" tips to all Umbrella nodes
$('.myclass').each(function (el) {
  el.innerHTML = '';
});
```
