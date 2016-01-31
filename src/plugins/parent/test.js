describe('.parent()', function() {

  it('should be defined', function() {
    expect(typeof base.parent).to.equal('function');
  });

  it('can loop the li', function() {
    expect(u('li').parent().is('ol, ul')).to.equal(true);
  });
  
  it('can retrieve all paragraphs', function() {
    expect(u('a').parent('p').is('p')).to.equal(true);
    expect(u('a').parent('p')).not.to.equal(u('a').parent());
  });
});
