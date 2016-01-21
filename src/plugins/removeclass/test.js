// Testing the main file
describe(".removeClass()", function() {
  
  beforeEach(function(){
    base.addClass('bla,blu');
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
  });
  
  it("should be defined", function() {
    expect(typeof base.removeClass).to.equal('function');
  });

  it("can be called empty", function() {
    base.removeClass();
    base.removeClass("");
    base.removeClass([]);
    base.removeClass("","");
    base.removeClass(" ");
  });

  it("removes a single class", function() {
    base.removeClass('bla');
    expect(base.hasClass('bla')).to.equal(false);
  });

  it("remove several classes as arguments", function() {
    base.removeClass('bla', 'blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("removes several classes with an array", function() {
    base.removeClass(['bla', 'blu']);
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("removes several classes separated by space", function() {
    base.removeClass('bla blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("removes several classes separated by comma", function() {
    base.removeClass('bla,blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("can be concatenated", function() {
    base.removeClass('bla').removeClass('blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });
});