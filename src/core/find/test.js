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
  
  it("cannot select body", function() {
    expect(base.find('body').nodes.length).to.equal(0);
  });
  
  it("doesn't select duplicates", function(){
    expect(u("*").find('.brand a').nodes.length).to.equal(1);
  });
});