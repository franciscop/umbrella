// Testing the main file
describe(".select(selector)", function() {
  
  it("should be a function", function() {
    expect(typeof base.select).to.equal('function');
  });
  
  it("can select some things", function() {
    expect(base.find('li').closest('ul').nodes.length).to.equal(1);
  });
});

