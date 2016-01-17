# Umbrella JS

Covers your javascript needs for those rainy days. A <2kb performant jquery-like library born from the question: [You might not need jquery](http://youmightnotneedjquery.com/), then what do you need?

You probably need awesome CSS (like [Picnic CSS](http://picnicss.com/)) and a lightweight, modern and performant javascript library. This does:

- DOM tranversal (selector, filter, find, each, etc)
- DOM editing (classes & attributes, html, before, etc)
- Event handling
- Ajax


## Getting started

There are few ways to add it to your system. But you can also just play with it in jsfiddle.

### Play with it

Instead of installing it, you can just play with it in JSFiddle:

[<button class="icon-jsfiddle">Try on JSFiddle</button>](https://jsfiddle.net/franciscop/mwpcqddj/)



### Use a CDN

JSDelivr is an awesome service that hosts many open source projects so you don't need to even download the code:

[<button class="icon-link">**JSDelivr CDN**</button>](http://www.jsdelivr.com/projects/umbrella)


### Use bower

Bower is a front-end package manager that makes it super-easy to add a new package:

```
bower install umbrella
```


### Download it

If you like it or prefer to try it locally, just download `umbrella.min.js`:

[<button class="icon-download">Download Umbrella JS</button>](https://raw.githubusercontent.com/umbrellajs/umbrella/master/umbrella.min.js)

Add it to your project:

```html
<script src="umbrella.min.js"></script>
```




## [Documentation (link)](documentation.md)


## Performance

Umbrella JS selector is faster than jQuery in some situations (Firefox) and similar in others (Chrome). This is possible by leveraging native methods where possible, but if you find any way to make it faster I'll welcome it greatly.


## Compatibility

You can have a light library that works on the mobile browsers or a heavy one that works on old Internet Explorer versions, but you cannot have both. This is aimed for modern, responsive websites. The code is tested against Firefox and Chrome frequently and against IE10 ocasionally and on major releases.

This is where there might be more compatibility issues:
- http://caniuse.com/#feat=queryselector
- http://caniuse.com/#search=classList (compatible with notes 2 & 3)


## Alternatives

- [jQuery](https://jquery.com/)

- [Zepto](http://zeptojs.com/) 


## Author and License

Created and maintained by [Francisco Presencia](https://github.com/FranciscoP) under the MIT license.