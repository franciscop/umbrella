// Testing the main file
describe(".toggleClass(name1, name2, ...)", function() {
  
  beforeEach(function(){
    base.addClass('blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(true);
  });
  
  afterEach(function(){
    base.removeClass('bla');
    base.addClass('blu');
  });
  
  it("should be defined", function() {
    expect(typeof base.toggleClass).to.equal('function');
  });

  it("can be called empty", function() {
    base.toggleClass();
    base.toggleClass("");
    base.toggleClass([]);
    base.toggleClass("","");
    base.toggleClass(" ");
  });

  it("adds a class by toggling", function() {
    base.toggleClass('bla');
    expect(base.hasClass('bla')).to.equal(true);
  });

  it("removes a class by toggling", function() {
    base.toggleClass('blu');
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("can be concatenated", function() {
    base.toggleClass('bla').toggleClass('bla');
    expect(base.hasClass('bla')).to.equal(false);
  });
  
  it("can do double toggle and stays the same", function() {
    base.toggleClass('bla bla');
    expect(base.hasClass('bla')).to.equal(false);
  });
  
  it("toggles several classes separated by comma", function() {
    len = base.toggleClass('bla,blu').length;
    expect(len).to.equal(1);
  });
  
  
  // Second Parameter
  it("can be called with a second parameter to force a addClass", function() {
    base.toggleClass('blu', true);
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("can be called with a second parameter to force a removeClass", function() {
    base.toggleClass('blu', false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("ignores the second parameter if string", function() {
    base.toggleClass('blu', 'peter');
    expect(base.hasClass('blu')).to.equal(false);
    expect(base.hasClass('peter')).to.equal(false);
    
    base.toggleClass('blu', 'peter');
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("ignores the second parameter if falsy but not false", function() {
    base.toggleClass('blu', null);
    expect(base.hasClass('blu')).to.equal(false);
    
    base.toggleClass('blu', null);
    expect(base.hasClass('blu')).to.equal(true);
  
    base.toggleClass('blu', undefined);
    expect(base.hasClass('blu')).to.equal(false);
    
    base.toggleClass('blu', undefined);
    expect(base.hasClass('blu')).to.equal(true);
  
    base.toggleClass('blu', 0);
    expect(base.hasClass('blu')).to.equal(false);
    
    base.toggleClass('blu', 0);
    expect(base.hasClass('blu')).to.equal(true);
  
    base.toggleClass('blu', '');
    expect(base.hasClass('blu')).to.equal(false);
    
    base.toggleClass('blu', '');
    expect(base.hasClass('blu')).to.equal(true);
  });
});
