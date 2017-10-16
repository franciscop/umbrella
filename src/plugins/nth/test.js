// Testing the main file
describe(".nth()", function() {

  it("should be a function", function() {
    expect(typeof base.nth).to.equal('function');
  });

  it("the first element is an HTML element", function() {
    expect(base.find("li").nth(2).nodeType).to.equal(1);
  });

  it("can get the first li and it's a LI", function() {
    expect(base.find("li").nth(2).nodeName).to.equal('LI');
  });
});
