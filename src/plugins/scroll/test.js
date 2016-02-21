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

  it('can scroll to the element', function() {
    expect(u('#scrollTest').first().getBoundingClientRect().top > 1).to.equal(true);

    u('#scrollTest').scroll();

    expect(u('#scrollTest').first().getBoundingClientRect().top < 1).to.equal(true);

    window.scrollTo(0, 0);
    u('#scrollTest').remove();
  });
});
