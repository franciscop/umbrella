## .each()

Loop through all of the nodes and execute a callback for each

```js
.each(function(node, i){});
```


### Parameters

`callback`: the function that will be called. It accepts two parameters, the node and the index. `this` is Umbrella's instance so other methods like `this.args()` and `this.slice()` are available.



### Return

`u`: returns an instance of Umbrella JS with the same nodes



### Examples

Loop through all of the links and add them a `target="_blank"`:

```js
u('a').each(function(node, i){
  u(node).attr({ target: '_blank' });
});
```