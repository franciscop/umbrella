describe(".join(function(){})", function() {

  it("should be defined", function() {
    expect(typeof base.join).to.equal('function');
  });

  it("empty gives an error", function(){
    same(u([0, 1, 2]).join(), u([0, 1, 2]));
  });

  it("can loop as each()", function() {
    u([0, 1, 2, 3]).join(function(node, i){
      expect(node).to.equal(i);
    });

    u([3, 4, 5, 6]).join(function(node, i){
      expect(node).to.equal(i + 3);
    });
  });

  it("can loop a real element", function() {
    base.join(function(node, i){
      expect(u(node).hasClass('base')).to.equal(true);
      expect(i).to.equal(0);
    });
  });

  it("can remove an element", function() {
    var final = u([1, 2, 3, 4]).join(function(node, i){
      return i === 0 ? false : node;
    });
    expect(final.length).to.equal(3);
  });

  it("can remove several elements", function() {
    var final = u([1, 2, 3, 4]).join(function(node, i){
      return i < 3 ? false : node;
    });
    expect(final.length).to.equal(1);
  });

  it("can add an element", function() {
    var final = u([1, 2, 3, 4]).join(function(node, i){
      return i === 0 ? [node, 'a'] : node;
    });
    expect(final.length).to.equal(5);
  });

  it("can add an many elements", function() {
    var final = u([1, 2, 3, 4]).join(function(node, i){
      return [node + 'a', node + 'b', node + 'c'];
    });
    expect(final.length).to.equal(12);
  });

  it("has the right this", function(){
    u(['a', 'b']).join(function(node, i){
      expect(this instanceof u).to.equal(true);
    });
  });

  it("returns an umbrella object", function(){
    var ret = u(['a', 'b']).join(function(){});
    expect(ret instanceof u).to.equal(true);
  });
});
