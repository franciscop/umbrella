// Testing the main file
describe(".attr(name, value)", function() {
  it("should be a function", function() {
    expect(typeof base.attr).to.equal('function');
  });

  it("can add an attribute with two params", function() {
    base.attr('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
    base.first().removeAttribute('title');
    expect(!base.attr('title')).to.equal(true);
  });

  it("can add an attribute with an object", function() {
    base.attr({title: 'Hello'});
    expect(base.attr('title')).to.equal('Hello');
  });

  it("can read the first element attribute", function() {
    base.first().setAttribute('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
  });

  it("can be called with no nodes", function() {
    expect(u('dfsdf').attr('title')).to.equal('');
  });

  it("can nullify (remove) an attribute with two params", function() {
    base.first().setAttribute('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
    base.attr('title', null);
    expect(!base.attr('title')).to.equal(true);
  });

  it("can nullify (remove) an attribute with an object", function() {
    base.first().setAttribute('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
    base.attr({'title': null});
    expect(!base.attr('title')).to.equal(true);
  });
});
