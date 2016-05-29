## .clone()

Create a deep copy of the set of matched elements. Includes matched element node and **all of its events** as well as its children **and all of their events** by **default**.

```js
u('.elementToClone').clone()
u('.elementToClone').clone({select: true})
```



### Parameters

`options = Object {option: true|false}`:
  - The following extensions are available for use as options:
    - **select** set this option to true to copy the value of the source select input.
    - **textarea** set this option to true to copy the value of the source textarea input.


### Return

`u`: returns the same instance of Umbrella JS



### Examples

Clone a node and append to another.

```html
<div class="container">
  <div class="testClone1">Hello</div>
  <div class="cloneDestination"></div>
</div>
```

```js
var clone = u("testClone1").clone();
u(".cloneDestination").append(clone);

```
Result:
```html
<div class="container">
  <div class="testClone1"></div>
  <div class="cloneDestination">
    <div class="testClone1">Hello</div>
  </div>
</div>
```

### Related
