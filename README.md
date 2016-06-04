# Umbrella JS [![Circle CI](https://circleci.com/gh/umbrellajs/umbrella/tree/master.svg?style=shield)](https://circleci.com/gh/umbrellajs/umbrella/tree/master) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard) [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/umbrellajs/umbrella/blob/master/LICENSE)

> [**Library Documentation**](http://umbrellajs.com/documentation)

Covers your javascript needs for those rainy days. A <3kb performant jquery-like library born from the question: [You might not need jquery](http://youmightnotneedjquery.com/), then what do you need?

You probably need awesome CSS (like [Picnic CSS](http://picnicss.com/)) and a lightweight, modern and performant javascript library. This does:

- DOM tranversal (selector, filter, find, each, etc)
- DOM editing (classes & attributes, html, before, etc)
- Event handling
- Ajax

A simple example:

```js
// Simple events like jquery
u("button").on('click', function(){
  alert("Hello world");
});

// Send form through ajax when submitted
u('form.login').ajax(function(err, res){
  window.href = '/user/' + res.id;
});
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

### Module support

If you use a front-end module bundler like Webpack or Browserify, `u` and `ajax` are exposed as CommonJS exports. You can pull them in like so:

```
var u = require('path/to/umbrella').u;
// or ES-style modules
import { u } from 'path/to/umbrella';
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

Known, wontfix IE10- bugs:

- [Invalid target element for this operation](http://caniuse.com/#feat=insertadjacenthtml) when trying to use any of these methods on **table**, **tbody**, **thead** or **tr**. Check [the issue on StackOverflow](http://stackoverflow.com/q/8771498/938236). For those elements, this gives an error:
  - `.before()`
  - `.after()`
  - `.append()`
  - `.prepend()`


- [Unable to get property ____ of undefined or null reference](http://caniuse.com/#search=classList) since classList is not supported by IE9-. Just use `polyfill.js` and they will work. Affects:
  - `.addClass()`
  - `.removeClass()`
  - `.hasClass()`
  - `.toggleClass()`

- Choosing multiple options within `<select>` doesn't work with IE10- when using `.serialize()` (and thus `.ajax()`). No idea why, but it's a really corner case. Affects:
  - `.ajax()`
  - `.serialize()`



## Alternatives

- [jQuery](https://jquery.com/)

- [Zepto](http://zeptojs.com/)

- [Bliss](http://blissfuljs.com/)

- [NodeList](https://github.com/eorroe/NodeList.js)

- [Micro Framework (many)](http://microjs.com/)


## Author and License

Created and maintained by [Francisco Presencia](https://github.com/franciscop) under the MIT license.
