describe(".slice()", function() {

  it("should be a function", function() {
    expect(typeof base.slice).to.equal('function');
  });

  it("can be called empty", function() {
    same(base.slice(), []);
    same(base.slice(''), []);
    same(base.slice(null), []);
    same(base.slice(undefined), []);
    same(base.slice(false), []);
  });

  it("can slice an array", function() {
    same(base.slice(['a', 'b']), ['a', 'b']);
  });

  it("ignores a string", function() {
    same(base.slice('Hello world'), []);
  });

  it("ignores a function", function() {
    same(base.slice(function(){}), []);
  });

  it("accepts a simple number", function() {
    same(base.slice(5), [5]);
  });

  it("converts a simple object to array", function() {
    same(base.slice({ a: 'b' }), [{ a: 'b' }]);
  });

  it("accepts an XMLRequest", function() {
    var request = new XMLHttpRequest;
    same(base.slice(request), [request]);
  });

  it("accepts the document", function() {
    same(base.slice(document), [document]);
  });

  it("accepts an argument list", function() {
    (function(){
      same(base.slice(arguments), ['a', 'b']);
    })('a', 'b');
  });
});
