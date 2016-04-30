// Note: node._e['submit'] and other events will appear as [null] in PhantomJS
// but they work as expected
describe(".on(event, fn)", function() {

  beforeEach(function(){
    base.append('<div class="clickable"></div>');
  });

  afterEach(function(){
    u('.clickable').remove();
  });

  it("should be defined", function() {
    expect(typeof base.on).to.equal('function');
  });

  it("triggers the event", function(done) {
    base.find('.clickable').on('click', function(e){
      expect(e.target).to.equal(this);
      done();
    });
    base.find('.clickable').trigger('click');
  });

  it("triggers the event twice", function(done) {
    var i = 1;
    base.find('.clickable').on('click submit', function(e){
      expect(e.target).to.equal(this);
      i++;
      if (i === 3) {
        done();
      }
    });
    base.find('.clickable').trigger('click');
    base.find('.clickable').trigger('submit');
  });

  it("triggers the event with custom data", function(done) {
    base.find('.clickable').on('click', function(e, a){
      same(!!e, true);
      same(e.detail, ['a']);
      same(a, 'a');
      done();
    });
    base.find('.clickable').trigger('click', 'a');
  });

  it("triggers the event with custom data object", function(done) {
    base.find('.clickable').on('click', function(e, a){
      same(!!e, true);
      same(e.detail, [{ a: 'b' }]);
      same(a, { a: 'b' });
      done();
    });
    base.find('.clickable').trigger('click', { a: 'b' });
  });

  it("triggers the event with custom data values", function(done) {
    base.find('.clickable').on('click', function(e, a, b){
      same(!!e, true);
      same(e.detail, ['a', 'b']);
      same(a, 'a');
      same(b, 'b');
      done();
    });
    base.find('.clickable').trigger('click', 'a', 'b');
  });
});
