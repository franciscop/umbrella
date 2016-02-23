# Contributing

> Please use the branch "2" for changes/new features until this notice is removed

Thanks for contributing! Developing Umbrella is quite easy:

1. Clone the repository `git clone git+https://github.com/umbrellajs/umbrella.git && cd ./umbrellajs`
1. Install the dependencies `npm install`
1. Install grunt if you didn't have it
1. Run `grunt watch`
1. Modify any file within `/src` (code, tests or documentation)

After these steps, the library, tests and documentation will be automatically joined. To see the tests open `/test/index.html` in your browser. Please try not to make a PR with broken tests.

## New plugins

Recommended to copy one of the existing ones and modify the files, specially `addclass` (folder `/src/plugins/addclass`).


## Testing

Each test should make sure that the smallest possible part of a feature works. While this seems simple, some times it's not so much. For example, let's study the 'addClass' for a single class, one of the simplest examples. You might think this is enough:

```js
it("can add a single class", function(){
  base.addClass('bla');
  expect(base.hasClass('bla')).to.equal(true);
});
```

You can use these methods to ease your testing:

```js
// Expect something to be a function:
isFn(function(){}); // good
isFn("a"); // throw

// Expect the selector to have the size:
size('body', 1); // good
size('body', 2); // bad

// Expect the selector, or the `base` if there's none, to have the class
hasClass('bla') // good
hasClass('bla', '.bla') // good
hasClass('non-exist') // bad

// You can also chain all of them:
isFn(function(){})(function(){})(function(){})
size('body', 1)('html', 1)
hasClass('bla')('blu')
```

While a priori it might seem right, there are two potential and serious problems: the class might be there already and we might affect other tests. These can be corrected if we follow few simple principles:

1. Make sure that the data at the begin of the test does *not* pass the test
1. Add the code that we want to test
1. Make sure we leave the DOM as it was before

So that's it, for our example of addClass we could now do:

```js
it("can add a single class", function(){

  // 1. Check that the class is not there previously
  expect(base.hasClass('bla')).to.equal(false);

  // 2. The code to test and its test
  base.addClass('bla');
  expect(base.hasClass('bla')).to.equal(true);

  // 3. Make sure we clean up
  base.removeClass('bla');
});
```

Furthermore, as it can be seen in the tests for addClass, when all the tests can reuse methods, it's better to do so:

```js
beforeEach(function(){
  expect(base.hasClass('bla')).to.equal(false);
  expect(base.hasClass('blu')).to.equal(false);
});

afterEach(function(){
  base.removeClass('bla blu');
});
```

When the variable `work` is set to false `var work = false;` in each function test, all of the inner tests should fail. This is so only the smallest part is correctly tested.
