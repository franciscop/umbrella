// Testing the main file
describe(".prepend()", function() {

  // Default callback for the tests
  function callback(cl){
    return '<a class="bla ' + cl + '">Link</a>';
  }

  beforeEach(function(){

    // Just in case it stringifies the callback
    expect(base.html().match('function')).to.equal(null);
    expect(u('.bla, .blu').length).to.equal(0);
  });

  afterEach(function(){
    u('.bla, .blu').remove();
  });

  it("should be a function", function() {
    expect(typeof base.prepend).to.equal('function');
  });

  it("can add content in the right place", function() {
    base.prepend('<a class="bla">Link</a>');
    size('.base > .bla', 1);
  });

  it("can add content with a callback", function() {
    base.prepend(callback);
    size('.base > .bla', 1)('.base > .bla:first-child', 1);
  });

  it("is called as many times as data in the second param", function() {
    base.prepend('<a class="bla">Link</a>', ["a", "b"]);
    size('.base > .bla', 2)('.base > .bla:first-child', 1);
  });

  it("can add content inverted with a callback and data", function() {
    base.prepend(callback, ["a", "b"]);
    //throw "Error";
    size('.base > .bla', 2)('.base > .bla.a', 1)('.base > .bla.b', 1);
    size('.bla.a + .bla.b', 1)('.bla.b + .bla.a', 0)('.base > .bla.a:first-child', 1);
  });

  it("can generate some text", function(){
    var list = u("<div>");
    if (work) list.prepend  (function(n){ return n + "\n" }, ['a', 'b']);

    expect(list.children().length).to.equal(0);
    expect(list.html()).to.equal('a\nb\n');
  });
});
