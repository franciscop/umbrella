// Testing the main file
describe(".serialize()", function() {

  afterEach(function() {
    u('.serialize-test').remove();
  });


  it("should be defined", function() {
    expect(typeof u('.serialize-test').serialize).to.equal('function');
  });

  it("can handle arrays", function() {
    base.append('\
      <form class="serialize-test"> \
        <input name="test[]" value="a"> \
        <input name="test[]" value="b"> \
      </form> \
    ');
    expect(u('.serialize-test').serialize()).to.equal('test%5B%5D=a&test%5B%5D=b');
  });



  it("can handle select multiple", function() {
    base.append('\
      <form class="serialize-test"> \
        <select multiple name="select"> \
          <option selected value="a"></option> \
          <option selected value="b"></option> \
          <option value="c"></option> \
        </select> \
      </form> \
    ');
    expect(u('.serialize-test').serialize()).to.equal('select=a&select=b');
  });
});
