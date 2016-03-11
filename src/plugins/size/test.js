describe('.size()', function() {

  it('should be a function', function() {
    expect(typeof base.size).to.equal('function');
  });

  it('should return this Umbrella Object', function() {
    size(u('li').scroll(), u('li').length);
  });

  it('can get the right size', function() {
    var size = u('body').size();
    expect(size).to.deep.equal(u('body').first().getBoundingClientRect());
  });

  it('can get the height', function() {
    var size = u('body').size();
    expect(Math.round(size.height)).to.equal(u('body').first().clientHeight);
  });
});
