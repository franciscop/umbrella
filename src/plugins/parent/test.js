describe('.parent()', function() {

  it('should be defined', function() {
    expect(typeof base.parent).to.equal('function');
  });

  it('can loop the li', function() {
    expect(u('li').parent().is('ol, ul')).to.equal(true);
  });

  it('can retrieve the direct parent with a filter', function() {
    expect(base.parent('#demo').is('div')).to.equal(true);
  });

  it('will filter out if none is matched', function() {
    expect(base.parent('#fake').is('div')).to.equal(false);
  });
});
