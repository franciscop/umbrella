describe(".array()", function() {

  it("should be defined", function() {
    expect(typeof base.array).to.equal('function');
  });

  it("empty gives an error", function(){
    same(base.array(), [base.html()]);
  });

  it("can loop as each()", function() {
    u([0, 1, 2, 3]).array(function(node, i){
      expect(node).to.equal(i);
    });
  });

  it("can loop a real element", function() {
    base.array(function(node, i){
      expect(u(node).hasClass('base')).to.equal(true);
      expect(i).to.equal(0);
    });
  });

  it("can remove an element", function() {
    var final = u([1, 2, 3, 4]).array(function(node, i){
      if (i !== 0) return node;
    });
    expect(final.length).to.equal(3);
  });

  it("can remove several elements", function() {
    var final = u([1, 2, 3, 4]).array(function(node, i){
      if (i >= 3) return node;
    });
    expect(final.length).to.equal(1);
  });

  it("can add an element", function() {
    var final = u([1, 2, 3, 4]).array(function(node, i){
      return i === 0 ? [node, 'a'] : node;
    });
    expect(final.length).to.equal(5);
  });

  it("can add an many elements", function() {
    var final = u([1, 2, 3, 4]).array(function(node, i){
      return [node + 'a', node + 'b', node + 'c'];
    });
    expect(final.length).to.equal(12);
  });

  it("has the right this", function(){
    u(['a', 'b']).array(function(node, i){
      expect(this instanceof u).to.equal(true);
    });
  });

  it("returns a simple array", function(){
    var ret = u(['a', 'b']).array(function(){});
    expect(Array.isArray(ret)).to.equal(true);
  });
});
