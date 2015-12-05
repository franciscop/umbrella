// Testing the main file
describe(".addClass()", function() {
  it("should be defined", function() {
    expect(typeof u('#demo').addClass).to.equal('function');
  });

  it("adds a class", function() {
    expect(u("#demo").addClass('bla').hasClass('bla')).to.equal(true);
    u("#demo").removeClass('bla');
  });
});