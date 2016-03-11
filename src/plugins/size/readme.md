## .size()

Get the [bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the first matched element. This has height, width, top, left, right and bottom properties

```js
.size()
```

### Parameters

None


### Return

Returns a simple object with the following properties referring to the first matched element:

- left
- right
- top
- height
- bottom
- width




### Examples

```js
u('body').size();
// {"left":0,"right":400,"top":0,"height":300,"bottom":300,"width":400}
```
