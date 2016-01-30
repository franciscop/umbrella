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
});