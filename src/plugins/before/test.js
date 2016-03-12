// Testing the main file
describe(".before(html)", function() {

  // Default callback for the tests
  function callback(cl){
    return '<a class="bla ' + cl + '">Link</a>';
  }

  beforeEach(function(){
    expect(u('.bla').length).to.equal(0);
  });

  afterEach(function(){
    u('.bla').remove();
  });

  it("should be a function", function() {
    expect(typeof base.after).to.equal('function');
  });

  it("can add content in the right place", function() {
    base.before('<a class="bla">Link</a>');
    expect(u('.bla').length).to.equal(1);
    expect(base.parent().find('.base, .bla').length).to.equal(2);
    expect(base.parent().find('.bla ~ .base').length).to.equal(1);
  });

  it("second parameter defaults to ''", function(){
    if (work) base.before(callback);

    expect(base.html().match('function')).to.equal(null);
    size('.bla', 1)('.bla + .base', 1);
  });

  it("can add a single one", function(){
    if (work) base.before(callback, ['a']);

    expect(base.html().match('function')).to.equal(null);
    size('.bla', 1)('.bla.a', 1)('.bla.a + .base', 1);
  });

  it("can add as many as the array", function(){
    if (work) base.before(callback, ['a', 'b']);

    expect(base.html().match('function')).to.equal(null);
    size('.bla', 2)('.bla.a', 1)('.bla.b', 1)('.bla.a + .bla.b + .base', 1);
  });
});
