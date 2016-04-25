// Testing the main file
describe(".wrap()", function() {
  beforeEach(function(){
    base.append('<button class="example">Link1</button>');
    size('.base > .example', 1);
  });

  afterEach(function(){
    u('.example, .example-wrapper').remove();
  });

  it("should be a function", function() {
    expect(typeof base.wrap).to.equal('function');
  });

  it("should correctly wrap a single element using a chained umbrella.js function", function() {
    u('.example').wrap('<a>').attr({ href: 'http://google.com/', class: 'example-wrapper' });
    size('.example-wrapper > .example', 1);
  });

  it("should correctly wrap a single formatted selector", function() {
    u('.example').wrap('<a href="http://google.com/" class="example-wrapper">');
    size('.example-wrapper > .example', 1);
  });

  it("should correctly wrap a single unformatted selector", function() {
    u('.example').wrap('a').addClass('example-wrapper');
    size('.example-wrapper > .example', 1);
  });

  it("should wrap multiple matched elements", function() {
    base.append('<button class="example">Link1</button>');

    u('.example').wrap('<a class="example-wrapper">');
    size('.example-wrapper', 2);
  });

  it("should wrap multiple elements using a chained umbrella.js function", function() {
    base.append('<button class="example">Link1</button>');

    u('.example').wrap('<a>').addClass('example-wrapper');
    size('.example-wrapper', 2);
  });

  it("should add all specified attributes to the wrapper element", function() {
    u('.example').wrap('<a>').attr({ href: 'http://google.com/', class: 'example-wrapper' });
    expect(u('.example-wrapper').attr('href')).to.equal('http://google.com/');
  });
});
