// Testing the main file
describe(".remove()", function() {

  beforeEach(function() {
    base.append('\
      <ul class="remove-test"> \
        <li></li> \
        <li></li> \
      </ul> \
    ');

    expect(u('.remove-test').nodes.length).to.equal(1);
    expect(u('.remove-test li').nodes.length).to.equal(2);
  });

  afterEach(function() {
    u('.remove-test').remove();
  });


  it("should be defined", function() {
    expect(typeof base.remove).to.equal('function');
  });

  it("removes a single element", function() {
    u('.remove-test').remove();
    expect(u('.remove-test').nodes.length).to.equal(0);
  });

  it("removes several elements", function() {
    u('.remove-test li').remove();
    expect(u('.remove-test li').nodes.length).to.equal(0);
  });
});
