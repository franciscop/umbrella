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

  it("should wrap multiple elements using a chained umbrella.js function", function() {
    base.append('<button class="example">Link1</button>');

    u('.example').wrap('<a>').addClass('example-wrapper');
    size('.example-wrapper .example', 2);
  });

  it("when wrapping  multiple elements it should return a copy of the original node", function() {
    base.append('<button class="example">Link2</button>');

    var wrappedNodes = u('.example').wrap('<a>').addClass('example-wrapper');
    expect(wrappedNodes.nodes[0].innerText).to.equal('Link1')
    expect(wrappedNodes.nodes[1].innerText).to.equal('Link2')
  });

  it("should add all specified attributes to the wrapper element using a chained umbrella js function", function() {
    u('.example').wrap('<a>').attr({ href: 'http://google.com/', class: 'example-wrapper' });
    expect(u('.example-wrapper').attr('href')).to.equal('http://google.com/');
  });

  it("should add all specified attributes to the wrapper element using a formatted selector", function() {
    u('.example').wrap('<a href="http://google.com/" class="example-wrapper">');
    expect(u('.example-wrapper').attr('href')).to.equal('http://google.com/');
  });

  it("should support nested selector arguments", function() {
    u('.example').wrap('<div id="one"><div id="two"></div></div>');
    size('#one #two .example', 1);
  });

  it("should support nested selector arguments with more than one nested child", function() {
    u('.example').wrap('<div id="a1"><div id="b1"><div id="c1"></div></div><div id="b2"><div id="c2"><div id="d1"></div></div></div></div>');
    size('#a1 #b1 #c1 .example', 1);
  });

  it("should only append to the last child of the nested selector argument's first child", function() {
    u('.example').wrap('<div id="a1"><div id="b1"><div id="c1"></div></div><div id="b2"><div id="c2"><div id="d1"></div></div></div></div>');
    size('#a2 #b2 #c2 #d1 .example', 0);
  });
});
