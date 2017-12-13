# Porting from jQuery

Umbrella offers some advantages over jQuery:

- Speed: using native methods makes it faster.
- Size: umbrella.js is 3kb in total.
- Clean: making new plugins and reading the code base is easy.

But it has some tradeoffs, mainly the lack of support for IE10- and SVG on IE11.

If you like the easy and readable syntax, **but** don't like how fat and slow jQuery is, you should:

- use **zepto.js** as [drop in replacement](http://zeptojs.com/)
- port to **UmbrellaJS**

**UmbrellaJS** is small (3kb gzipped) and has a similar syntax as jQuery. it use native DOM elements instead of objects, this makes it fast. you can simply replace `$(...)` with `u(...)` in most cases.

## Before porting to UmbrellaJS

zepto.js, umbreallyJS does not support jQuery extensions! if your scripts make heavy use of extensions you should stop reading here.

before porting an existing script to a jQuery alternative I strongly recommend to check your jQuery code to be correct.

**Check for usage of `$('.subclass', $('.myclass'))`**

Even if `$('.subclass', $('.myclass'))` and `$('.myclass').find('.subclass')` are equivalent, you should use the latter. it's more readable and easier to port.

**Check for correct `$(element)` selection**

Even if your script work, there are some pitfalls where jQuery works when you are using it in the wrong way.

**example:** you need excatly one element by class

`$('#myID')` always returns one element, more exactly the first matching element. all other selectors return ALL elements. if you want to select the first element of `$('.myclass')` you must use `$('.myclass').first()` or `$('.myclass').eq(0)`. avoid using of `$('.myclass')[0]`

### First steps

UmbrellaJS can be used in parallel with jQuery, so you can start porting to umbrellaJs step by step. simply include `<script src="https://unpkg.com/umbrellajs"></script>` in your HMTL file or `// @require https://unpkg.com/umbrellajs` in your script, if you are writing a userscript.

Now start with changing a simple function or statement from jQuery to umbrella by replacing `$(...)` with `u(...)`, it so simple!



## Porting tips

while porting my [enstlyer script](https://greasyfork.org/de/scripts/24244-enstyler-develop/code) from jQuery (more precise from zepto.js) to UmbrellaJS I discoverd some pitfalls I want to share with you. nevertheless it was easy and its always helpfull to have the excellent [UmbrellaJS documentation](https://umbrellajs.com/documentation) in a browser tab.

**Why does `.replaceWith()` not exist in umbrella?**

This should be very simple, use the umbrella `.replace()` method instead. It has nothing to do with the native javascript .replace() method for arrays though, so make sure not to mix them up.

If someone wants to stay with` .replaceWith` like in jquery and does not care about an extra function call, adding this to your script may help:

```
u.prototype.replaceWith = function(replace){
  return this.replace(replace);
};
```


**Why does `.css()` not exist in umbrella?**

I general I avoid using `.css()` to set CSS properties because it's better and faster handled by CSS rules. To do something similar with UmbrellaJS use this `getStyle()` function:

```js
// alternative for jquery .css() get method
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
// umbrella
getStyle(u('.myClass').nodes[n], "border-radius");

// native DOM
getStyle(getElementsByClassName('myClass')[n], "border-radius");
getStyle(getElementById('myID'), "border-radius");
```

see: https://www.htmlgoodies.com/html5/css/referencing-css3-properties-using-javascript.html#fbid=b2-TgWC-yGY



**`u(this)` works different like in jquery**

Umbrella follows the native Javascript array structure, so it won't change the scope of the javascript `this` property in `each().` But its easy to fix it.

Your jquery `.each()` loops might look like this now:

```js
$('.myremove').each(function () {
    ...
    $(this).dosomething();
    ...
});
```

Then change them to something like this:

```js
u('.myclass').each(function (el) {
    ...
    u(el).dosomething();
    ...
});
```

UmbrellaJS provides the actually processed node as first argument to the called function, [see the documentation for .each()](https://umbrellajs.com/documentation#each).

As a bonus you get the node count as second argument, so you don't have count it yourself in case you need to know:

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


**umbrella `.first()` returns native DOM element**

in jquery `.first()` returns a jquery object, but umbrella it returns a native DOM object. this has pro and con:

- pro: you can use faster native javascript DOM manipulation
- con: you can't chain an other umbrella method like in jquery
- con: be careful to select the correct DOM property/method!

**example:** how to get inner html:

```js
// jquery:
$('.myclass').first().html();

// umbrella: direct access to DOM property innerHTML
u('.myclass').first().innerHTML;

// umbrella: wrapping it again
u(u('.myclass').first()).html();
```

**power tip from umbrealla creator:** For the .first() example you can just wrap the whole thing into another u() and use .before() conveniently.

**example:** how to add html before element:

```js
// jquery:
$('.myclass').first().before('<div>this is inserted before</div>');

// umbrella: use of .insertAdjacentHTML() method, DOM method  .before() requires DOM node!
u(u('.myclass').first()).before('<div>this is inserted before</div>');
u('.myclass').first().insertAdjacentHTML('beforebegin', '<div>this is inserted before</div>');

// wrong: works not as you may expect!
// insert TEXT => "&lt;div&gt,this is inserted before&lt;/div&gt,"
$('.myclass').first().before('<div>this is inserted before</div>');
```

For more information see  [.insertAdjacentHTML() ](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentHTML)

**example:** how to add DOM before element:

```js
// correct use of .first().before(): create native DOM element
var enMenuButton = document.createElement('input');
enMenuButton.type = 'button';
enMenuButton.setAttribute(enID, 'myID');
enMenuButton.onclick = showmyConfig;
enMenuButton.value = 'Config ';
// append native DOM
u('.subNavMenu').first().before(enMenuButton);
```

**`return false`; does not stop iterations in umbrella `.each()` loop**

In jquery you can `return false;` to stop the iteration of an `.each()` loop
this seems to work different in umbrella, the remaining iterations are done instead of skipped

```js
u('article').each(function (that,i) {
  dosometing(that);
  if (i==5) return false;
})
```
