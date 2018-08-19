## .serialize()

> Note: you probably want to use the native `FormData()` instead of `.serialize()`. [See relevant issue](https://github.com/franciscop/umbrella/issues/114).

Converts a form into a string to be sent:

```js
.serialize()
```

> Note: multiple-select are not supported in Internet Explorer, [similarly to jQuery](https://github.com/jquery/jquery-mobile/issues/3947)

### Example

For this form:

```html
<form action="/contact" method="POST">
  Email:
  <input type="email" name="email" value="test@example.com" />
  Message:
  <textarea type="email" name="message">Hello world</textarea>

  <button>Send</button>
</form>
```

When the user clicks on the "Send" button, the following handler can be used to send the data through Ajax:

```js
// .handle() == .on() + preventDefault()
u('form.contact').handle('submit', async e => {
  // Body: email=test@example.com&message=Hello+world
  const body = u(e.target).serialize();
  const data = await fetch('/contact', {
    method: 'POST', body
  }).then(res => res.json());
  console.log('Response data:', data);
});
```

If you were using the native FormData:

```js
// .handle() == .on() + preventDefault()
u('form.contact').handle('submit', async e => {
  const body = new FormData(e.target);
  const data = await fetch('/contact', {
    method: 'POST', body
  }).then(res => res.json());
  console.log('Response data:', data);
});
```
