// Testing the main file
describe(".trigger()", function() {

  afterEach(function(){
    base.off('click bla');
  });

  it("should be a function", function() {
    isFn(base.trigger);
  });

  it("can trigger a click", function() {
    base.on('click', function(e){
      expect(!!e).to.equal(true);
    });
    base.trigger('click');
  });

  it("can be concatenated", function() {
    base.on('click', function(e){
      expect(!!e).to.equal(true);
    });
    base.trigger('click').trigger('click');
  });

  it("can trigger an event in the wrong element", function() {
    base.on('click', function(e){
      expect(!!e).to.equal(true);
    });
    base.trigger('click');
  });

  it("doesn't trigger all events", function() {
    base.on('click', function(e){
      throw "Shouldn't be called";
    });
    base.trigger('submit');
  });

  it("triggers custom event", function(done) {
    base.on('bla', function(e){
      expect(!!e).to.equal(true);
      done();
    });
    base.trigger('bla');
  });

  it("passes data", function(done) {
    base.on('click', function(e, go){
      expect(!!e).to.equal(true);
      same(e.detail, ["good"]);
      same(go, "good");
      done();
    });
    base.trigger('click', 'good');
  });
});
