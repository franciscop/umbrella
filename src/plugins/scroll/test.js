// insert tall element to test scroll()
var elHeight = window.innerHeight + 100;
var el = '<div style="height:' + elHeight + 'px" id="scrollTest"></div>';
u('body').append(el);


describe('.scroll()', function() {

  it('should be a function', function() {
    expect(typeof base.scroll).to.equal('function');
  });

  it('should return this Umbrella Object', function() {
    size(u('li').scroll(), u('li').length);
  });

  it('can scroll to the element', function(done) {
    expect(u('body').size().top).to.be.above(-10);
    u('#scrollTest').scroll();

    setTimeout(function(){
      expect(u('body').size().top).to.be.below(-10);
      u('#scrollTest').remove();
      u('body').scroll();
      done();
    }, 100);
  });
});
