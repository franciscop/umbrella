// Testing the main file
describe(".closest(selector)", function() {

  afterEach(function(){
    // A previous bug that would change the inner of the original reference
    expect(base.length).to.equal(1);
  });

  it("should be a function", function() {
    expect(typeof base.closest).to.equal('function');
  });

  it("can select the children of ul", function() {
    expect(base.find('li').closest('ul').length).to.equal(1);
  });

  it("is okay with no ancestors", function() {
    expect(base.closest('.nonexist').length).to.equal(0);
  });
});
