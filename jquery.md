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

zepto.js and umbreallyJS does not support jQuery extensions! if your scripts make heavy use of extensions you should stop reading here.

before porting an existing script to a jQuery alternative I strongly recommend to check your jQuery code to be correct.

**Check for usage of `$('.subclass', $('.myclass'))`**

Even `$('.subclass', $('.myclass'))` and `$('.myclass').find('.subclass')` are equivalent, you should use the latter. it's more readable and easier to port.

**Check for correct `$(element)` selection**

Even if your script work, there are some pitfalls where jQuery works when you are using it in the wrong way.

**example:** you need excatly one element by class

`$('#myID')` always returns one element, more exactly the first matching element. all other selectors return ALL elements. if you want to select ONE element of `$('.myclass')` you must use `$('.myclass').first()`, `$('.myclass').last()` or `$('.myclass').eq(n)`. You must not use of `$('.myclass')[0]`

### First steps

UmbrellaJS can be used in parallel with jQuery, so you can start porting to umbrellaJs step by step. simply include `<script src="https://unpkg.com/umbrellajs"></script>` in your HMTL file or `// @require https://unpkg.com/umbrellajs` in your script, if you are writing a userscript.

Now start with changing a simple function or statement from jQuery to umbrella by replacing `$(...)` with `u(...)`, it so simple!


## Porting tips

While porting my [enstlyer script](https://greasyfork.org/de/scripts/24244-enstyler-develop/code) from jQuery (more precise from zepto.js) to UmbrellaJS I discoverd some pitfalls I want to share with you. nevertheless it was easy and its always helpfull to have the excellent [UmbrellaJS documentation](https://umbrellajs.com/documentation) in a browser tab.


#### Why does `.replaceWith()` not exist in umbrella?

This should be very simple, use the umbrella `.replace()` method instead. It has nothing to do with the native javascript .replace() method for arrays though, so make sure not to mix them up.

If you wants to stay with` .replaceWith` like in jquery and does not care about an extra function call, adding this to your script may help:

```
u.prototype.replaceWith = function(replace){
  return this.replace(replace);
};
```


#### Why does `.css()` not exist in umbrella?

I general I avoid using `.css()` to set CSS properties because it's better and faster handled by CSS rules. To do something similar as jQuery `.css()` get method with UmbrellaJS you can use this `getStyle()` function:

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
// umbrella: use use one node
getStyle(u('.myClass').nodes[n], "border-radius");

// use one native DOM node
getStyle(getElementsByClassName('myClass')[n], "border-radius");
getStyle(getElementById('myID'), "border-radius");
```

see: https://www.htmlgoodies.com/html5/css/referencing-css3-properties-using-javascript.html#fbid=b2-TgWC-yGY



#### `u(this)` works different like in jquery

Umbrella follows the native Javascript array structure, so it won't change the scope of the javascript `this` property in `each().` But its easy to fix it.

Your jquery `.each()` loops might look like this now:

```js
$('.myclass').each(function () {
    ...
    $(this).dosomething();
    ...
});
```

you should change them to look like this:

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


#### using umbrella `.first()/.last()/.eq()` give strange results or errors

in jquery `.first()/.last()/.eq()` returns a jquery object, but umbrella returns a native DOM element. this has pro and con:

- pro: you can use faster native javascript DOM manipulation
- con: you can't chain an other umbrella method like in jquery
- con: be careful to select the correct DOM property/method!

**Wait,** there is no `.eq()` in umbrellaJS, but you can use `.nodes[n]` as a functional replacment.

**power tip from umbrealla creator:** You can wrap the whole thing into another `u(...)` and use umbrella functions conveniently.

**example:** how to get inner html of frist element:

```js
// jquery:
$('.myclass').first().html();

// umbrella: direct access to DOM property innerHTML
u('.myclass').first().innerHTML;

// umbrella: wrapping it in u(...) again
u( u('.myclass').first() ).html();
```

**example:** how to add html before last element:

```js
// jquery:
$('.myclass').last().before('<div>this is inserted before</div>');

// umbrella: direct use of .insertAdjacentHTML() method
u('.myclass').last().insertAdjacentHTML('beforebegin', '<div>this is inserted before</div>');

// umbrella wrapping it in u(...) again
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

If you wants to have an umbrella `.eq()` method and don't care about an extra function call, adding this to your script may help:

```
// get the nth of the nodes
u.prototype.eq = function (index) {
  return this.nodes[index||0] || false;
}
```

#### How to break out of umbrella `.each()` loop?

In jquery you can `return false;` to stop the iteration of an `.each()` loop.
this is diffrent in umbrella, the loop always process all given elememnts!

Depending on your use case you can mimic jQuery logic in different ways.

**Exmaple**: stop after 5'th iterration

```js
u('article').each(function (el,i) {
  if (i>5) return;
  dosometing(el);
})
```

**Exmaple**: abort after something failed

```js
var abort=false;
u('article').each(function (el,i) {
  if(abort) return;
  if (! dosometing_ok(el)) abort=true; ;
})
```

#### You miss some jQuery methods in umbrellaJS?

A good source of inspiraiton is [You Might Not Need jQuery](http://youmightnotneedjquery.com/).
You cann also search on [stackoverflow](https://stackoverflow.com/search?q=jquery%20pure%20javascript) for jQuery alternatives in pure JavaScript

You can apply most tips from there to single umbrella node like this:

```js
// jQuery
$(#hide).hide();
$(.myclass).hide();

// umbrella: apply "you don't nned jQuery" tips to umbrella nodes[n]
$(#hide).nodes[0].style.display = 'none';
$(.myclass).nodes[n].style.display = 'none';
```

if you want to apply to all elements returned by umbrella you can use umbrealla `.each()` to apply to every node

```js
// jQuery
$(.myclass).empty();

// umbrella: apply "you don't nned jQuery" tips to all umbrella nodes
$(.myclass).each(el) {
    el.innerHTML = '';
}
```
