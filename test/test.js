var expect = chai.expect;

// Testing the main file
describe("Constructor", function() {
  it("should be defined", function() {
    expect(u).to.be.not.null;
  });

  it("should be a function", function() {
    expect(typeof u).to.equal("function");
  });
  
  it("can accept no argument", function() {
    expect(typeof u()).to.equal('object');
  });
  
  it("can select by class", function() {
    expect(u('.demo').nodes.length).to.equal(1);
  });
  
  it("can select by tag", function() {
    expect(u('body').nodes.length).to.equal(1);
  });
  
  it("can select by id", function() {
    expect(u('#demo').nodes.length).to.equal(1);
  });

  it("can select with css", function() {
    expect(u('[id="demo"]').nodes.length).to.equal(1);
  });
});