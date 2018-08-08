var expect = chai.expect;

// Whether or not to run the tests. When this is set to "false", then all of
// the tests for this function should fail
var work = true;

var wrap = function(cb){
  cb();
}

// Check whether or not the element has a class
// - cls: the classes that should be checked
// - negate: whether or not the class should be present
// - root: the element to check (defaults to "base")
// hasClass('bla', true, 'ul')
function hasClass(cls, negate, root) {
  root = root ? u(root) : base;
  u().args(cls).forEach(function(cl){
    expect(root.hasClass(cl)).to.equal(!negate);
  });
  return hasClass;
}

// Check that two objects are the same
// same({ a: 'hi' }, { a: 'hi' })
function same(a, b) {
  expect(a).to.deep.equal(b);
  return isFn;
}

// Chech whether or not something is a function
function isFn(fn) {
  expect(typeof fn).to.equal('function');
  return isFn;
}

// Quickly test the size of a selector and returns itself for chaining:
// size('.a', 2)('.b', 3)('.c', 1)
function size(sel, number) {
  expect(u(sel).length).to.equal(number);
  return size;
}

// Get a great list of classes for testing different configurations
function getListOfClasses(){

  return [
    // Strings
    { from: 'bla blu blo', it: 'a space-separated string' },
    { from: 'bla,blu,blo,', it: 'a comma-separated string' },
    { from: 'bla, blu, blo, ', it: 'a comma and space separated string' },
    { from: 'bla\n\tblu\n\tblo\n\t', it: 'a whitespace-separated string' },

    // Single array
    { from: ['bla', 'blu', 'blo'], it: 'an array' },
    { from: ['bla blu ', 'blo '], it: 'a space-separated array' },
    { from: ['bla,blu,', 'blo,'], it: 'a comma-separated array' },
    { from: ['bla, blu, ', 'blo, '], it: 'a comma and space separated array' },
    { from: ['bla\n\tblu\n\t', 'blo\n\t'], it: 'a whitespace-separated array' },

    // Nested
    { from: [['bla', 'blu'], 'blo'], it: 'an array' },
    { from: [['bla blu '], 'blo '], it: 'a space-separated array' },
    { from: [['bla,blu,'], 'blo,'], it: 'a comma-separated array' },
    { from: [['bla, blu, '], 'blo, '], it: 'a comma and space separated array' },
    { from: [['bla\n\tblu\n\t'], 'blo\n\t'], it: 'a whitespace-separated array' },
  ];
}









// Testing the main file
describe("u()", function() {
  it("should be defined", function() {
    expect(!!u).to.equal(true);
  });

  it("should be a function", function() {
    expect(typeof u).to.equal("function");
  });

  it("can accept no argument", function() {
    expect(typeof u()).to.equal('object', typeof u());
    expect(u().length).to.equal(0);
  });

  it("can select by class", function() {
    expect(u('.demo').length).to.equal(1);
  });

  it("can select by tag", function() {
    expect(u('body').length).to.equal(1);
  });

  it("can select by id", function() {
    expect(u('#demo').length).to.equal(1);
  });

  it("can select with css", function() {
    expect(u('[id="demo"]').length).to.equal(1);
    expect(u('.demo ul').length).to.equal(1);
  });

  it("can select a NodeList", function() {
    expect(u(document.querySelectorAll('.demo li')).length).to.equal(3);
  });

  it("can select an html element", function() {
    var object = u('.demo li').nodes[0];
    expect(u(object).length).to.equal(1);
  });

  it("won't select a function", function() {
    expect(u(function(){ return "test"; }).length).to.equal(0);
  });

  it("will select a random object", function() {
    expect(u({ a: 'b', c: 'd' }).length).to.equal(1);
  });

  it("can select an Umbrella instance", function() {
    var inst = u('.demo');
    expect(u(inst).length).to.equal(1);
    expect(u(inst)).to.equal(inst);
  });

  // it("accepts a function", function() {
  //   expect(u(function(){}).first()).to.equal(false);
  // });
  //
  // it("generates some html", function() {
  //   expect(u(function(node, i){
  //     return "<li></li>"; }, 2).first()).to.equal('<li></li>');
  // });

  it("can use a context", function() {
    var context = u('.demo li').nodes[0];
    expect(u('a', context).length).to.equal(1);
  });

  it("can read the length", function() {
    expect(u('a').nodes.length).to.equal(u('a').length);
  });

  it("can generate a <tr>", function() {
    expect(u('<tr>').nodes[0].tagName).to.equal('TR');
    expect(u('<tr >').nodes[0].tagName).to.equal('TR');
    expect(u('<tr class="hello">').nodes[0].tagName).to.equal('TR');
  });

  it("can generate a <td>", function() {
    expect(u('<td>').nodes[0].tagName).to.equal('TD');
    expect(u('<td >').nodes[0].tagName).to.equal('TD');
    expect(u('<td class="hello">').nodes[0].tagName).to.equal('TD');
  });

  it("can generate a <th>", function() {
    expect(u('<th>').nodes[0].tagName).to.equal('TH');
    expect(u('<th >').nodes[0].tagName).to.equal('TH');
    expect(u('<th class="hello">').nodes[0].tagName).to.equal('TH');
  });




  // describe("performance tests", function(){
  //
  //   function performance(callback, times){
  //     var init = new Date().getTime();
  //     for (var i = 0; i < times; i++) {
  //       callback(i);
  //     }
  //     return new Date().getTime() - init;
  //   }
  //
  //   // Generate a big and varied 100 element table
  //   before(function(){
  //     performance(function(i){
  //       u('.performance').append('<tr class="ro"><td id="idn' + i + '"></td><td class="tabletest"></td><td></td><td></td></tr>');
  //     }, 1000);
  //   });
  //
  //   after(function(){
  //     u('.performance').remove();
  //   });
  //
  //
  //
  //   it("simple select by class 10.000/second", function() {
  //
  //     uTime = performance(function(){
  //       u('.demo');
  //     }, 1000);
  //
  //     console.log('      - u: ' + uTime + 'ms');
  //     expect(uTime).to.be.below(100, uTime + ' ms');
  //   });
  //
  //
  //
  //   it("select by class is comparable to jquery (50% margin)", function() {
  //
  //     size('.demo', 1);
  //
  //     var uTime = performance(function(){
  //       u('.demo');
  //     }, 5000);
  //
  //     var $Time = performance(function(){
  //       $('.demo');
  //     }, 5000);
  //
  //     console.log('      - u: ' + uTime + 'ms $: ' + $Time + 'ms');
  //
  //     expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
  //   });
  //
  //
  //
  //   it("vs jquery: class selector (50% margin)", function() {
  //
  //     size('.tabletest', 1000);
  //
  //     var uTime = performance(function(){
  //       u('.tabletest');
  //     }, 100);
  //
  //     var $Time = performance(function(){
  //       $('.tabletest');
  //     }, 100);
  //
  //     console.log('      - u: ' + uTime + 'ms $: ' + $Time + 'ms');
  //
  //     expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
  //   });
  //
  //
  //
  //   it("vs jquery: complex selector (50% margin)", function() {
  //
  //     size('table td:first-child', 1000);
  //
  //     var uTime = performance(function(){
  //       u('table td:first-child');
  //     }, 50);
  //
  //     var $Time = performance(function(){
  //       $('table td:first-child');
  //     }, 50);
  //
  //     console.log('      - u: ' + uTime + 'ms $: ' + $Time + 'ms');
  //
  //     expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
  //   });
  //
  //
  //
  //   it("vs jquery: jquery optimized vs raw umbrella (50% margin)", function() {
  //
  //     size(".ro > *", 4000);
  //
  //     var uTime = performance(function(){
  //       u(".ro > *");
  //     }, 50);
  //
  //     var $Time = performance(function(){
  //       $(".ro > *");
  //     }, 50);
  //
  //     console.log('      - u: ' + uTime + 'ms $: ' + $Time + 'ms');
  //
  //     expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
  //   });
  // });
});
