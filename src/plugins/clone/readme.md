## .clone()

Create a deep copy of the set of matched elements. Includes matched element node and **all of its events** as well as its children **and all of their events** by **default**.

```js
u('.elementToClone').clone()
```



### Extensions
  - The following extensions are enabled by default:
    - **events** clone the events of all of the nodes. To disable it globally, add `u.prototype.mirror.events = false;` to your code.
    - **select** select input node values are copied to all cloned nodes. To disable globally, add `u.prototype.mirror.select = false;` to your code.
    - **textarea** textarea input node values are copied to all cloned nodes. To disable globally, add `u.prototype.mirror.textarea = false;` to your code.


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
  <div class="testClone1">Hello</div>
  <div class="cloneDestination">
    <div class="testClone1">Hello</div>
  </div>
</div>
```

### Related
[.append()](#append) add some html as a child at the end of each of the matched elements.
