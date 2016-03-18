## .find()

Get all of the descendants of the nodes with an optional filter

```js
.find(filter);
```


### Parameters

`filter`: a string containing a selector that nodes must pass or a function that return a boolean. See [.filter()](#filter) for a better explanation



### Return

An instance of Umbrella with the new children as nodes



### Examples

Get all of the links within all the paragraphs

```js
u("p").find('a');
```

Get the required fields within a submitting form:

```js
u('form').on('submit', function(e){
  var required = u(this).find('[required]');
});
```



### Related

[.closest()](#closest) get the first ascendant that matches the selector

[.parent()](#parent) get all of the direct parents

[.children()](#find) get the direct child of the matched nodes
