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

  it("returns false for non existing element", function() {
  	expect(u('.non-existing').last()).to.equal(false);
  });

  it("actually returns the last element", function() {
  	base.append('<a class="last-test">Node 1</a> <div class="last-test">Node 2</div>');
  	expect(u('.last-test').last().nodeName).to.equal('DIV');
  });

});
