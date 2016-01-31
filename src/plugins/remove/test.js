// Testing the main file
describe(".remove()", function() {

  beforeEach(function() {
    base.append('\
      <ul class="remove-test"> \
        <li></li> \
        <li></li> \
      </ul> \
    ');

    expect(u('.remove-test').length).to.equal(1);
    expect(u('.remove-test li').length).to.equal(2);
  });

  afterEach(function() {
    u('.remove-test').remove();
  });


  it("should be defined", function() {
    expect(typeof base.remove).to.equal('function');
  });

  it("can be called even without any node", function() {
    expect(u('.remove-test div').nodes).to.be.empty;
    u('.remove-test div').remove();
  });

  it("should return an instance of umbrella with the removed nodes", function() {
    var result = u('.remove-test').remove();

    expect(result).to.be.instanceof(u);
    expect(result.nodes).to.have.length(1);
    expect(result.attr('class')).to.equal('remove-test');
    expect(result.children().nodes).to.have.length(2); // Two li children.
  });

  it("removes a single element", function() {
    u('.remove-test').remove();
    expect(u('.remove-test').nodes).to.be.empty;
  });

  it("removes several elements", function() {
    u('.remove-test li').remove();
    expect(u('.remove-test li').nodes).to.be.empty;
  });
});
