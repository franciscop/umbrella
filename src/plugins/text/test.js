// Testing the main file
describe(".text(content)", function() {

  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });

  it("can get the text content", function() {
    expect(base.find('#world').text()).to.equal('Hello world');
  });

  it("can set the text content", function() {
    expect(base.find('#world').text()).not.to.equal('hello!');
    base.find('#world').text('hello!');
    expect(base.find('#world').text()).to.equal('hello!');
  });
});
