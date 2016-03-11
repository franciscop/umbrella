// Testing the main file
describe(".children(selector)", function() {
  
  afterEach(function(){
    // A previous bug that would change the inner of the original reference
    expect(base.length).to.equal(1);
  });
  
  it("should be a function", function() {
    expect(typeof base.children).to.equal('function');
  });
  
  it("can select the children of ul", function() {
    expect(base.find('ul').children().length).to.equal(3);
  });
  
  it("can filter the children", function() {
    expect(base.find('ul').children(':first-child').length).to.equal(1);
  });
  
  it("okay with no children", function() {
    expect(base.find('ul').children('.nonexist').length).to.equal(0);
  });
});