describe('.scroll()', function() {

  it('should be a function', function() {
    expect(typeof base.scroll).to.equal('function');
  });

  // I'm not sure how to combine the next two tests
  // I tried adding a custom mathcer but it threw an error:
  //
  // `TypeError: this.addMatchers is not a function`

  it('scrolled to max if the page is too short', function() {
    expect(window.innerHeight + window.scrollY >= document.body.offsetHeight).to.equal(true);
  });

  it('can scroll to the first matching element', function() {
    expect(u('li').scroll().getBoundingClientRect().top).toBeScrolledToTop();
  });

});
