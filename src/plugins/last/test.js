// Testing the main file
describe(".last()", function() {
  
  it("should be a function", function() {
    expect(typeof base.last).to.equal('function');
  });
  
  it("the last element is an HTML element", function() {
    expect(base.find("li").last().nodeType).to.equal(1);
  });
  
  it("can get the last li and it's a LI", function() {
    expect(base.find("li").last().nodeName).to.equal('LI');
  });
});