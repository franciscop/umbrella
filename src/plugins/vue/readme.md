## .vue()

[Vue.js](http://vuejs.org/): Reactive Components for Modern Web Interfaces:

```js
var options = {};
u('#app').vue(options);
```


### Install

> Remember to use `plugins.min.js` **instead of** `umbrella.js` if you want to use this plugin

This is a plugin for the [Vue.js project](http://vuejs.org/). As all of Umbrella's external plugins, this needs first to be added to your codebase. According to [Vue's install guide](http://vuejs.org/guide/installation.html), you can do so using NPM:

```bash
npm install vue --save
```

Or using a CDN:

```html
<script src='//cdn.jsdelivr.net/vue/$VERSION/vue.min.js'></script>
```


### Simplicity

The first matched node will act as Vue's element, so this:

```js
var demo = new Vue({
  el: '#demo'
});
```

becomes just this:

```js
u('#demo').vue();
```
