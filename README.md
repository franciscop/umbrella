# Umbrella JS [![Circle CI](https://circleci.com/gh/umbrellajs/umbrella/tree/master.svg?style=shield)](https://circleci.com/gh/umbrellajs/umbrella/tree/master)

> [**Library Documentation**](http://umbrellajs.com/documentation)

Covers your javascript needs for those rainy days. A <2kb performant jquery-like library born from the question: [You might not need jquery](http://youmightnotneedjquery.com/), then what do you need?

You probably need awesome CSS (like [Picnic CSS](http://picnicss.com/)) and a lightweight, modern and performant javascript library. This does:

- DOM tranversal (selector, filter, find, each, etc)
- DOM editing (classes & attributes, html, before, etc)
- Event handling
- Ajax

A simple example:

```html
<a class="example button">Click me</a>

<script>
  u('form.example').ajax(function(err, data){
    if (err) u(".error").html("There was an error");
    u('button.send').html("Send again, " + data.name);
  }, function(){
    u('button.send').html("Sending...");
  });
</script>
```


## Getting started

There are few ways to use Umbrella JS:


### Play with it

Instead of installing it, you can just play with it in JSFiddle:

[**Try on JSFiddle**](https://jsfiddle.net/franciscop/mwpcqddj/)


### Use a CDN

JSDelivr is an awesome service that hosts many open source projects so you don't need to even download the code:

[**JSDelivr CDN**](http://www.jsdelivr.com/projects/umbrella)


### Use bower

Bower is a front-end package manager that makes it super-easy to add a new package:

```
bower install umbrella
```


### Download it

If you like it or prefer to try it locally, just download `umbrella.min.js`:

[**Download Umbrella JS**](https://raw.githubusercontent.com/umbrellajs/umbrella/master/umbrella.min.js)

Add it to your project:

```html
<script src="umbrella.min.js"></script>
```


## Up for grabs

For beginners in Javascript or contributing to an Open Source project, there are few issues that are made on purpose so you can help out. Check them out:

> [**Up For Grabs issues**](https://github.com/umbrellajs/umbrella/labels/up-for-grabs)



## Support: IE11+

Current usage for IE 10- is under 1% for each version (8, 9, 10) so it's not Umbrella's mission to support this. However, those extra seconds gained from loading faster on mobile might be even bigger than that percentage. You should probably test it.

Known, wontfix IE9- bugs:

- [Invalid target element for this operation](http://caniuse.com/#feat=insertadjacenthtml) when trying to use insertAdjacentHTML on table, tbody, thead or tr. Affects in that situation to:
  - `.before()`
  - `.after()`
  - `.append()`
  - `.prepend`
- [unable to get property ____ of undefined or null reference](http://caniuse.com/#search=classList) since classList is not supported by IE9-. Affects:
  - `.addClass()`
  - `.removeClass()`
  - `.hasClass()`
  - `.toggleClass()`



## Alternatives

- [jQuery](https://jquery.com/)

- [Zepto](http://zeptojs.com/) 

- [Micro Framework (many)](http://microjs.com/)


## Author and License

Created and maintained by [Francisco Presencia](https://github.com/franciscop) under the MIT license.