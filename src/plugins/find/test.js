// Testing the main file
describe(".find(selector)", function() {
  
  it("should be a function", function() {
    expect(typeof base.find).to.equal('function');
  });
  
  it("can be empty and it selects all", function() {
    expect(base.find().nodes.length).to.equal(base.find('*').nodes.length);
  });
  
  it("can select the list ul", function() {
    expect(base.find('ul').nodes.length).to.equal(1);
  });
});