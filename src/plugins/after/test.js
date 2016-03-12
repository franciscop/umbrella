// Testing the main file
describe(".after(html)", function() {

  //var work = false;

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
    expect(work ? typeof base.after : false).to.equal('function');
  });

  it("can add content in the right place", function() {
    if (work) base.after('<a class="bla">Link</a>');

    size('.bla', 1)('.base + .bla', 1);
  });

  it("accepts a callback that will be called once", function(){
    if (work) base.after(callback);

    size('.bla', 1)('.base + .bla', 1);
  });

  it("accepts a single parameter", function(){
    if (work) base.after(callback, ['a']);

    size('.base + .bla.a', 1);
  });

  it("can add as many as the array", function(){
    if (work) base.after(callback, ['a', 'b']);

    expect(base.html().match('function')).to.equal(null);
    size('.base ~ .bla', 2)('.base ~ .bla.a', 1)('.base ~ .bla.b', 1);
    size('.base + .bla.a + .bla.b', 1);
  });
});
