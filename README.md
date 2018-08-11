# Umbrella JS [![Circle CI](https://circleci.com/gh/franciscop/umbrella/tree/master.svg?style=shield)](https://circleci.com/gh/franciscop/umbrella/tree/master) [![stats](https://data.jsdelivr.com/v1/package/npm/umbrellajs/badge?style=rounded)](https://www.jsdelivr.com/package/npm/umbrellajs) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard) [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/franciscop/umbrella/blob/master/LICENSE)

> [**Library Documentation**](http://umbrellajs.com/documentation) | [**Migrate from 2.0 to 3.0**](https://github.com/franciscop/umbrella/blob/master/migrate-2-to-3.md) | [**Migrating from jQuery guide**](https://github.com/franciscop/umbrella/blob/master/jquery.md)

Covers your javascript needs for those rainy days. A <3kb performant jquery-like library born from the question: [You might not need jquery](http://youmightnotneedjquery.com/), then what do you need?

You probably need awesome CSS (like [Picnic CSS](http://picnicss.com/)) and a lightweight, modern and performant javascript library. This does:

- DOM traversal (selector, filter, find, each, etc.)
- DOM editing (classes & attributes, html, before, etc.)
- Event handling

A couple of simple examples:

```js
// Simple events like jquery
u("button").on('click', e => {
  alert("Hello world");
});

// Handle form submissions
u('form.login').handle('submit', async e => {
  const body = u(e.target).serialize();
  const user = await fetch('/login', { method: 'POST', body });
  window.href = '/user/' + res.id;
});
```


## Getting started

There are few ways to use Umbrella JS:


### Play with it

Instead of installing it, you can just play with it in JSFiddle:

[**Try on JSFiddle**](https://jsfiddle.net/franciscop/mwpcqddj/)


### Use a CDN

unpkg.com is an awesome service that hosts many open source projects so you don't need to even download the code:

```js
<script src="https://unpkg.com/umbrellajs"></script>
```


### Install with `npm`

Using npm is a front-end package manager that makes it super-easy to add a new package:

```
npm install umbrellajs
```


### Module support

If you use a front-end module bundler like Webpack or Browserify, `u` is exposed as CommonJS exports. You can pull them in like so:

```
var u = require('umbrellajs');
```

### ES Module support

If you use an ES Module, `u` and `ajax` are exposed as ES Module exports.
You can pull them in like so:

```
import u from 'umbrellajs/umbrella.esm.js'
```

### Download it

If you like it or prefer to try it locally, just download `umbrella.min.js`:

[**Download Umbrella JS**](https://raw.githubusercontent.com/franciscop/umbrella/master/umbrella.min.js)

Add it to your project:

```html
<script src="umbrella.min.js"></script>
```


## Up for grabs

For beginners in Javascript or contributing to an Open Source project, there are few issues that are made on purpose so you can help out. Check them out:

> [**Up For Grabs issues**](https://github.com/franciscop/umbrella/labels/up-for-grabs)



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


## References

- http://www.tutsplanet.com/umbrella-js-alternative-jquery-288/
- http://www.hongkiat.com/blog/umbrella-js/
- http://www.catswhocode.com/blog/umbrella-js-a-tiny-yet-powerful-alternative-to-jquery
- https://webmaster.kitchen/jquery-kutuphanesine-alternatif-umbrellajs-kimdir/
- https://wmaraci.com/blog/umbrellajs-jquery-alternatifiniz-olmaya-aday-533
- http://qiita.com/kt3k/items/0da4c0b36c402b96122b
