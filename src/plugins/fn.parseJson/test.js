// Testing the main file
describe("parseJsom(string)", function() {
  
  it("should be defined", function() {
    expect(typeof parseJson).to.equal('function');
  });

  it("can be called empty", function() {
    expect(parseJson()).to.equal(false);
    expect(parseJson("")).to.equal(false);
    expect(parseJson([])).to.equal(false);
    expect(parseJson("","")).to.equal(false);
    expect(parseJson(" ")).to.equal(false);
  });

  it("parses correctly", function() {
    expect(parseJson('{"hello": "world"}').hello).to.equal('world');
  });
});