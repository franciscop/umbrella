# Umbrella JS

> This is working, but there's basically no documentation. You are welcome to expand it

Covers your javascript needs for those rainy days. A <2kb performant jquery-like library born from the question: [You might not need jquery](http://youmightnotneedjquery.com/), then what do you need?

Only for those not scared of vanilla javascript but that hate to repeat things like `document.querySelector()` again and again.



## Getting started

Just download `umbrella.min.js`, include it in your html witih `<script src="umbrella.min.js"></script>` and you're good to go. After that, start using it:

```js
u(".menu a:first-child").addClass('active');
// or (more vanilla):
u(".menu a:first-child").first().classList.add('active');
```


## Browser support IE10+

You can have a light library that works on the mobile browsers or a heavy one that works on old Internet Explorer versions, but you cannot have both. This is aimed for modern, responsive websites.



## Alternatives

- [jQuery](https://jquery.com/)

- [Zepto](http://zeptojs.com/) 


## Contributing

You are encouraged to contribute to Umbrella JS. To write a new plugin, just copy one of the existing ones (specially recommend "addclass") and modify the files.


## Author and License

Created and maintained by [Francisco Presencia](https://github.com/FranciscoP) under the MIT license.