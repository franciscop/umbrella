// Testing the main file
describe(".html(content)", function() {
  
  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });
  
  it("can get the html content", function() {
    expect(base.find('#world').html()).to.equal('Hello world');
  });
  
  it("can set the html content", function() {
    expect(base.find('#world').html()).not.to.equal('hello');
    base.find('#world').html('hello');
    expect(base.find('#world').html()).to.equal('hello');
    base.find('#world').html('Hello world');
  });
});