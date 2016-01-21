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





describe("performance tests", function(){
  
  function performance(callback, times){
    var init = new Date().getTime();
    for (var i = 0; i < times; i++) {
      callback(i);
    }
    return new Date().getTime() - init;
  }
  
  // Generate a big and varied 100 element table
  before(function(){
    performance(function(i){
      u('.performance').append('<tr class="ro"><td id="idn' + i + '"></td><td class="tabletest"></td><td></td><td></td></tr>');
    }, 1000);
  });
  
  
  
  it("simple select by class 100.000/second", function() {
    
    uTime = performance(function(){
      u('.demo');
    }, 10000);
    
    expect(uTime).to.be.below(100, uTime + ' ms');
  });
  
  
  
  it("select by class is comparable to jquery (50% margin)", function() {
    
    var uTime = performance(function(){
      u('.demo');
    }, 10000);
    
    var $Time = performance(function(){
      $('.demo');
    }, 10000);
    
    console.log('u: ' + uTime + 'ms ', '$: ' + $Time + 'ms');
    
    expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
  });
  
  
  
  it("vs jquery: class selector", function() {
    
    var uTime = performance(function(){
      u('.tabletest');
    }, 500);
    
    var $Time = performance(function(){
      $('.tabletest');
    }, 500);
    
    console.log('u: ' + uTime + 'ms ', '$: ' + $Time + 'ms');
    
    expect(uTime).to.be.below($Time, uTime + ' ms');
  });
  
  
  
  it("vs jquery: complex selector", function() {
    
    var uTime = performance(function(){
      u('table td:first-child');
    }, 100);
    
    var $Time = performance(function(){
      $('table td:first-child');
    }, 100);
    
    console.log('u: ' + uTime + 'ms ', '$: ' + $Time + 'ms');
    
    expect(uTime).to.be.below($Time, uTime + ' ms');
  });
  
  
  
  it("vs jquery: add class", function() {
    
    var uBase = u('.tabletest');
    var $Base = $('.tabletest');
    
    var uTime = performance(function(){
      uBase.addClass('test');
    }, 100);
    
    var $Time = performance(function(){
      $Base.addClass('test');
    }, 100);
    
    console.log('u: ' + uTime + 'ms ', '$: ' + $Time + 'ms');
    
    expect(uTime).to.be.below($Time, uTime + ' ms');
  });
  
  
  
  it("vs jquery: jquery optimized vs raw umbrella", function() {
    
    var uTime = performance(function(){
      u(".ro > *");
    }, 100);
    
    var $Time = performance(function(){
      $(".ro").children();
    }, 100);
    
    console.log('u: ' + uTime + 'ms ', '$: ' + $Time + 'ms');
    
    expect(uTime).to.be.below($Time, uTime + ' ms');
  });
  
  
  it("jquery vs jquery: mistake?", function() {
    
    var aTime = performance(function(){
      $(".ro > *");
    }, 100);
      
    var bTime = performance(function(){
      $(".ro").children();
    }, 100);
    
    console.log('a: ' + aTime + 'ms ', 'b: ' + bTime + 'ms');
    
    expect(aTime).to.be.below(bTime, uTime + ' ms');
  });
  
  
});