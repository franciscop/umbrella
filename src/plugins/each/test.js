describe(".each(function(){})", function() {
    
  it("should be defined", function() {
    expect(typeof base.each).to.equal('function');
  });
  
  it("empty gives an error", function(done){
    try {
      u([0, 1, 2]).each();
    } catch (e) {
      return done();
    }
    throw "Shouldn't get here";
  });

  it("can loop", function() {
    u([0, 1, 2, 3]).each(function(node, i){
      expect(node).to.equal(i);
    });
    
    u([3, 4, 5, 6]).each(function(node, i){
      expect(node).to.equal(i + 3);
    });
  });

  it("can loop a real element", function() {
    base.each(function(node, i){
      expect(u(node).hasClass('base')).to.equal(true);
      expect(i).to.equal(0);
    });
  });
  
  it("has the right this", function(){
    u(['a', 'b']).each(function(node, i){
      expect(this instanceof u).to.equal(true);
    });
  });
  
  it("returns an umbrella object", function(){
    var ret = u(['a', 'b']).each(function(){});
    expect(ret instanceof u).to.equal(true);
  });
});