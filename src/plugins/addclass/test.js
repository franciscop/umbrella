// Testing the main file
describe(".addClass(name)", function() {
  it("should be defined", function() {
    expect(typeof base.addClass).to.equal('function');
  });

  it("can be called empty", function() {
    base.addClass();
  });

  it("adds a class", function() {
    expect(base.addClass('bla').hasClass('bla')).to.equal(true);
    base.removeClass('bla');
  });

  it("adds several classes as arguments", function() {
    base.addClass('bla', 'blu');
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
    base.removeClass('bla');
    base.removeClass('blu');
  });

  it("adds several classes with an array", function() {
    base.addClass(['bla', 'blu']);
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
    base.removeClass('bla');
    base.removeClass('blu');
  });

  it("adds several classes separated by space", function() {
    base.addClass('bla blu');
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
    base.removeClass('bla');
    base.removeClass('blu');
  });
});