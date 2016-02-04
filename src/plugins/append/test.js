// Testing the main file
describe(".append(html)", function() {
  
  beforeEach(function(){
    expect(u('.bla, .blu').length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla, .blu').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.append).to.equal('function');
  });
  
  it("can add content in the right place", function() {
    base.append('<a class="bla">Link</a>');
    expect(u('.base > .bla').length).to.equal(1);
  });
  
  it("can add content with a callback", function() {
    base.append(function(){ return '<a class="bla">Link</a>'; });
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').length).to.equal(1);
  });
  
  it("is called as many times as data in the second param", function() {
    base.append('<a class="bla">Link</a>', ["a", "b"]);
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').length).to.equal(2);
  });
  
  it("can add content with a callback and data", function() {
    base.append(function(el, cl){ return '<a class="bla ' + cl + '">Link</a>' }, ["a", "b"]);
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').length).to.equal(2);
    expect(u('.base > .bla.a').length).to.equal(1);
    expect(u('.base > .bla.b').length).to.equal(1);
  });
});