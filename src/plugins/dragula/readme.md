## .dragula()

Drag and drop so simple it hurts:

```js
u('#container').dragula(options);
```


### Install

> Remember to use `plugins.min.js` **instead** of `umbrella.js` if you want to use this plugin

This is a plugin for the [Dragula project](https://github.com/bevacqua/dragula). As all of Umbrella's external plugins, this needs first to be added to your codebase. According to [Dragula's install guide](https://github.com/bevacqua/dragula#install), you can do so using NPM:

```bash
npm install dragula --save
```

Or using a CDN:

```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/dragula/$VERSION/dragula.min.js'></script>
```


### Simplicity

The matched nodes will act as dragula's containers, so this:

```js
dragula([document.querySelector('#left'), document.querySelector('#right')]);
```

becomes just this:

```js
u('#left, #right').dragula();
```
