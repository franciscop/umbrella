// Testing the main file
describe(".append(html)", function() {

  // Default callback for the tests
  function callback(cl){
    return '<a class="bla ' + cl + '">Link</a>';
  }

  beforeEach(function(){
    expect(u('.bla, .blu').length).to.equal(0);
  });

  afterEach(function(){

    // Just in case it stringifies the callback
    expect(base.html().match('function')).to.equal(null);
    u('.bla, .blu').remove();
  });



  it("should be a function", function() {
    expect(typeof base.append).to.equal('function');
  });

  it("can add content in the right place", function() {
    base.append('<a class="bla">Link</a>');
    size('.base > .bla', 1);
  });

  it("can add content with a callback", function() {
    base.append(callback);
    size('.base > .bla', 1)('.base > .bla:last-child', 1);
  });

  it("is called as many times as data in the second param", function() {
    base.append('<a class="bla">Link</a>', ["a", "b"]);
    size('.base > .bla', 2)('.base > .bla:last-child', 1);
  });

  it("can add content with a callback and data", function() {
    base.append(callback, ["a", "b"]);
    size('.base > .bla', 2)('.base > .bla.a', 1)('.base > .bla.b', 1);
    size('.bla.a + .bla.b', 1)('.bla.b + .bla.a', 0)('.base > .bla.b:last-child', 1);
  });

  it("can append an html node", function() {
    base.append(u('<div>').addClass('bla').first());
    size('.bla', 1);
  });

  it("can generate some text", function(){
    var list = u("<div>");
    if (work) list.append(function(n){ return n + "\n" }, ['a', 'b']);

    expect(list.children().length).to.equal(0);
    expect(list.html()).to.equal('a\nb\n');
  });
});
