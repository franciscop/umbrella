// Testing the main file
function addTest(node, i){
  return 'test' + i;
}
function addDemo(node, i){
  return 'demo' + i;
}

describe(".addClass(name1, name2, ...)", function() {
  
  beforeEach(function(){
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });
  
  afterEach(function(){
    base.removeClass('bla blu');
  });
  
  it("should be defined", function() {
    expect(typeof base.addClass).to.equal('function');
  });

  it("can be called empty", function() {
    base.addClass();
    base.addClass("");
    base.addClass([]);
    base.addClass("","");
    base.addClass(" ");
  });

  it("adds a class", function() {
    base.addClass('bla');
    expect(base.hasClass('bla')).to.equal(true);
  });

  it("adds several classes as arguments", function() {
    base.addClass('bla', 'blu');
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("adds several classes with an array", function() {
    base.addClass(['bla', 'blu']);
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("adds several classes separated by space", function() {
    base.addClass('bla blu');
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("adds several classes separated by comma", function() {
    base.addClass('bla,blu');
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("can be concatenated", function() {
    base.addClass('bla').addClass('blu');
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("adds several classes separated by comma", function() {
    len = base.addClass('bla,blu').length;
    expect(len).to.equal(1);
  });
  
  it("adds classes with callback", function(){
    base.addClass(addTest);
    expect(base.hasClass('test0')).to.equal(true);
    
    // Clean up
    base.removeClass('test0');
    expect(base.hasClass('test0')).to.equal(false);
  });
  
  it("adds many classes with callback", function(){
    base.find('li').addClass(addTest).each(function(node, i){
      expect(u(node).hasClass('test' + i)).to.equal(true);
      u(node).removeClass('test' + i);
    });
  });
  
  it("accepts two callbacks or more", function(){
    
    base.find('li').addClass(addTest, addDemo).each(function(node, i){
      expect(u(node).hasClass('test' + i)).to.equal(true);
      expect(u(node).hasClass('demo' + i)).to.equal(true);
      u(node).removeClass('test' + i);
      u(node).removeClass('demo' + i);
    });
  });
});