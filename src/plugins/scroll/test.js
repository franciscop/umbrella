function didScroll(el) {
   if (u(el).scroll().getBoundingClientRect().top === 0) {
     return true;
   } else {
     return window.innerHeight + window.scrollY >= document.body.offsetHeight;
   }
}


describe('.scroll()', function() {

  it('should be a function', function() {
    expect(typeof base.scroll).to.equal('function');
  });

  it('can scroll to the element', function() {
    expect(didScroll('li')).to.equal(true);
  });

});