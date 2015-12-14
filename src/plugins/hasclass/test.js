// Testing the main file
describe(".hasClass(name)", function() {
  
  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });
  
  it("can check a single class", function() {
    expect(base.find('#world').hasClass('hello')).to.equal(true);
  });
  
  it("works as AND", function() {
    expect(base.find('#world').hasClass('hello nonexisting')).to.equal(false);
  });
  
  it("can check multiple classes with space", function() {
    expect(base.find('#world').hasClass('hello world')).to.equal(true);
  });
  
  it("can check multiple classes with comma", function() {
    expect(base.find('#world').hasClass('hello,world')).to.equal(true);
  });
  
  it("can check multiple classes as arguments", function() {
    expect(base.find('#world').hasClass('hello', 'world')).to.equal(true);
  });
});