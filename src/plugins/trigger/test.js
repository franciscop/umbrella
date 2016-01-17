// Testing the main file
describe(".trigger()", function() {
  
  it("should be a function", function() {
    expect(typeof base.trigger).to.equal('function');
  });
  
  it("can trigger a click", function(next) {
    u(base).on('click', function(e){
      expect(!!e).to.equal(true)
      next();
    });
    base.trigger('click');
  });
  
  it("can get the first li and it's a LI", function() {
    expect(base.find("li").first().nodeName).to.equal('LI');
  });
});