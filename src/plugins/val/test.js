describe(".val(content)", function() {

  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });

  it("can get the value", function() {
    expect(base.find('input[type="submit"]').val()).to.equal('Send!');
  });

  it("can set the value", function() {
    expect(base.find('input[name="name"]').val()).not.to.equal('hello!');
    base.find('input[name="name"]').val('hello!');
    expect(base.find('input[name="name"]').val()).to.equal('hello!');
  });
});
