# Contributing

Thanks for contributing! Developing Umbrella is quite easy:

> If you want to modify any of the ajax() methods, please read on the ajax section below

1. Clone the repository  
`git clone git://github.com/umbrellajs/umbrella.git && cd ./umbrella`
1. Install Phantom JS 1.9.7. For Linux ([based on this](https://gist.github.com/julionc/7476620)):
`npm run installphantom`
1. Install the dependencies
`npm install`
1. [optional] Run the ajax testing server (explained below)
1. Run `grunt watch`
1. Modify any file within `/src` (code, tests or documentation)

After these steps, the library, tests and documentation will be automatically built each time a change is saved. To see the tests open `/test/index.html` in your browser. Please try not to make a PR with broken tests.

## Ajax testing

To test properly the ajax methods a small Node.js server should be running. The file is written in `test/server.js` and can be run with `node test/server.js`, which should happen in a separated terminal. If you don't run it the tests will also pass since the ajax ones will not be tested (this is for CircleCI and the website to give a correct test status on Github, since we cannot run the server there).

So before the step of *Run `grunt watch`* you should run `node test/server.js` in a different terminal. This is probably not needed if you are not modifying ajax() functions or ajax() related ones.


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
