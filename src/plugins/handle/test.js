// Note: node._e['submit'] and other events will appear as [null] in PhantomJS
// but they work as expected
describe(".handle(event, fn)", function() {

  beforeEach(function(){
    base.append('<div class="clickable"><a>Hi</a></div>');
  });

  afterEach(function(){
    u('.clickable').remove();
    base.off('click');
  });

  it("should be defined", function() {
    expect(typeof base.handle).to.equal('function');
  });

  it("triggers the event", function(done) {
    base.find('.clickable').handle('click', function(e){
      expect(e.target).to.equal(this);
      done();
    });
    base.find('.clickable').trigger('click');
  });

  it("triggers the event twice", function(done) {
    var i = 1;
    base.find('.clickable').handle('click submit', function(e){
      expect(e.target).to.equal(this);
      i++;
      if (i === 3) {
        done();
      }
    });
    base.find('.clickable').trigger('click');
    base.find('.clickable').trigger('submit');
  });

  it("can do event delegation", function(done) {
    base.handle('click', '.clickable', function(e){
      expect(e.target.className).to.equal('clickable');
      done();
    });
    base.find('.clickable').trigger('click');
    base.off('click');
  });

  it("event delegation not triggered by others", function() {
    base.handle('click', '.clickable', function(e){
      throw new Error("Should never get here");
    });
    base.find('ul').not('.clickable').trigger('click');
    base.off('click');
  });

  it("triggers the delegated event when child element is target", function(done) {
    base.handle('click', '.clickable', function(e) {
      expect(e.target.tagName).to.equal('A');
      expect(e.target.className).to.not.equal('clickable');
      done();
    });
    base.find('.clickable a').trigger('click');
  });

  it("triggers the event with custom data", function(done) {
    base.find('.clickable').handle('click', function(e, a){
      same(!!e, true);
      same(e.detail, ['a']);
      same(a, 'a');
      done();
    });
    base.find('.clickable').trigger('click', 'a');
  });
    it("triggers the delegated event with custom data", function(done) {
      base.handle('click', '.clickable', function(e, a){
        same(!!e, true);
        same(e.detail, ['a']);
        same(a, 'a');
        done();
      });
      base.find('.clickable').trigger('click', 'a');
    });

  it("triggers the event with custom data object", function(done) {
    base.find('.clickable').handle('click', function(e, a){
      same(!!e, true);
      same(e.detail, [{ a: 'b' }]);
      same(a, { a: 'b' });
      done();
    });
    base.find('.clickable').trigger('click', { a: 'b' });
  });

  it("triggers the event with custom data object", function(done) {
    base.handle('click', '.clickable', function(e, a){
      same(!!e, true);
      same(e.detail, [{ a: 'b' }]);
      same(a, { a: 'b' });
      done();
    });
    base.find('.clickable').trigger('click', { a: 'b' });
  });

  it("triggers the event with custom data values", function(done) {
    base.find('.clickable').handle('click', function(e, a, b){
      same(!!e, true);
      same(e.detail, ['a', 'b']);
      same(a, 'a');
      same(b, 'b');
      done();
    });
    base.find('.clickable').trigger('click', 'a', 'b');
  });

  it("triggers the event with custom data values", function(done) {
    base.handle('click', '.clickable', function(e, a, b){
      same(!!e, true);
      same(e.detail, ['a', 'b']);
      same(a, 'a');
      same(b, 'b');
      done();
    });
    base.find('.clickable').trigger('click', 'a', 'b');
  });
});
