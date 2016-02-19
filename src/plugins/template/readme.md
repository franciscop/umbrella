## .template()

> NOT YET WORKING

Use html templates seamlessly:

```js
var lessons = [
  { title: 'Relativity', content: 'Cool theory', from: 'Albert Einstein' },
  { title: 'Gravity', content: 'Another cool theory', from: 'Newton' }
];

var lessons = u('template.lesson').template(function(tpl, data){
  u('h2', tpl).html(data.title);
  u('.content', tpl).html(data.content);
  u('footer', tpl).html(data.from);
}, lessons);

u('.lessons').append(lessons);
```

```html
<div class="lessons"></div>

<template class="lesson">
  <article>
    <header><h2></h2></header>
    <section class="content"></section>
    <footer></footer>
  </article>
</template>
```

### Install

> htemplate *is* already an Umbrella JS extension; so no need for using plugins.js if you don't want
