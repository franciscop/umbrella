var expect = chai.expect;

// Testing the main file
describe("u(selector, context)", function() {
  it("should be defined", function() {
    expect(u).to.be.not.null;
  });

  it("should be a function", function() {
    expect(typeof u).to.equal("function");
  });
  
  it("can accept no argument", function() {
    expect(typeof u()).to.equal('object', typeof u());
  });
  
  it("can select by class", function() {
    expect(u('.demo').nodes.length).to.equal(1);
  });
  
  it("select by class 100.000/second", function() {
    
    var init = new Date().getTime();
    for (var i = 0; i < 10000; i++) {
      u('.demo');
    }
    var uTime = new Date().getTime() - init;
    
    expect(uTime).to.be.below(100, uTime + ' ms');
  });
  
  it("select by class is comparable to jquery (50% margin)", function() {
    
    var init = new Date().getTime();
    for (var i = 0; i < 10000; i++) {
      u('.demo');
    }
    var uTime = new Date().getTime() - init;
    init = new Date().getTime();
    for (var j = 0; j < 10000; j++) {
      $('.demo');
    }
    var $Time = new Date().getTime() - init;
    
    expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
  });
  
  it("can select by tag", function() {
    expect(u('body').nodes.length).to.equal(1);
  });
  
  it("can select by id", function() {
    expect(u('#demo').nodes.length).to.equal(1);
  });

  it("can select with css", function() {
    expect(u('[id="demo"]').nodes.length).to.equal(1);
    expect(u('.demo ul').nodes.length).to.equal(1);
  });
  
  it("can select an object", function() {
    var object = u('.demo li').nodes[0];
    expect(u(object).nodes.length).to.equal(1);
  });
  
  it("can use a context", function() {
    var context = u('.demo li').nodes[0];
    expect(u('a', context).nodes.length).to.equal(1);
  });
});