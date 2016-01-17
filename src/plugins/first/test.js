// Testing the main file
describe(".first()", function() {
  
  it("should be a function", function() {
    expect(typeof base.first).to.equal('function');
  });
  
  it("the first element is an HTML element", function() {
    expect(base.find("li").first().nodeType).to.equal(1);
  });
  
  it("can get the first li and it's a LI", function() {
    expect(base.find("li").first().nodeName).to.equal('LI');
  });
});