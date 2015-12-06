// Testing the main file
describe(".append(html)", function() {
  
  beforeEach(function(){
    expect(u('.bla').nodes.length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.append).to.equal('function');
  });
  
  it("can add content in the right place", function() {
    expect(u('.base > .bla').nodes.length).to.equal(0);
    base.append('<a class="bla">Link</a>');
    expect(u('.base > .bla').nodes.length).to.equal(1);
  });
});