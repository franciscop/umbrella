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
    expect(u(document.querySelectorAll('li')).length).to.equal(3);
  });
  
  it("can select an html element", function() {
    var object = u('.demo li').nodes[0];
    expect(u(object).length).to.equal(1);
  });
  
  it("won't select a function", function() {
    expect(u(function(){ return "test"; }).length).to.equal(0);
  });
  
  it("won't select a random object", function() {
    expect(u({ a: 'b', c: 'd' }).length).to.equal(0);
  });
  
  it("can select an Umbrella instance", function() {
    var inst = u('.demo');
    expect(u(inst).length).to.equal(1);
    expect(u(inst)).to.equal(inst);
  });
  
  it("can use a context", function() {
    var context = u('.demo li').nodes[0];
    expect(u('a', context).length).to.equal(1);
  });
  
  it("can read the length", function() {
    expect(u('a').nodes.length).to.equal(u('a').length);
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
    
    
    
    it("simple select by class 10.000/second", function() {
      
      uTime = performance(function(){
        u('.demo');
      }, 5000);
      
      console.log('u: ' + uTime + 'ms');
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
    
    
    
    it("vs jquery: class selector (50% margin)", function() {
      
      var uTime = performance(function(){
        u('.tabletest');
      }, 500);
      
      var $Time = performance(function(){
        $('.tabletest');
      }, 500);
      
      console.log('u: ' + uTime + 'ms ', '$: ' + $Time + 'ms');
      
      expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
    });
    
    
    
    it("vs jquery: complex selector (50% margin)", function() {
      
      var uTime = performance(function(){
        u('table td:first-child');
      }, 100);
      
      var $Time = performance(function(){
        $('table td:first-child');
      }, 100);
      
      console.log('u: ' + uTime + 'ms ', '$: ' + $Time + 'ms');
      
      expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
    });
    
    
    
    it("vs jquery: jquery optimized vs raw umbrella (50% margin)", function() {
      
      var uTime = performance(function(){
        u(".ro > *");
      }, 100);
      
      var $Time = performance(function(){
        $(".ro > *");
      }, 100);
      
      console.log('u: ' + uTime + 'ms ', '$: ' + $Time + 'ms');
      
      expect(uTime).to.be.below($Time * 1.5, uTime + ' ms');
    });
  });
});
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
// Testing the main file
describe(".after(html)", function() {
  
  beforeEach(function(){
    expect(u('.bla').length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.after).to.equal('function');
  });
  
  it("can add content in the right place", function() {
    base.after('<a class="bla">Link</a>');
    expect(u('.bla').length).to.equal(1);
    expect(base.parent().find('.base, .bla').length).to.equal(2);
    expect(base.parent().find('.base ~ .bla').length).to.equal(1);
  });
});
// Testing the main file
describe(".ajax(done, before)", function() {
  
  it("should be defined", function() {
    expect(typeof base.ajax).to.equal('function');
  });
  
  it("calls before", function(next) {
    u('form.login').ajax(function(err, body, xhr){
      expect(!!xhr).to.equal(true);
      next();
    });
    
    u('form.login').trigger('submit');
  });
});

// Testing the main file
describe(".append(html)", function() {
  
  beforeEach(function(){
    expect(u('.bla').length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.append).to.equal('function');
  });
  
  it("can add content in the right place", function() {
    expect(u('.base > .bla').length).to.equal(0);
    base.append('<a class="bla">Link</a>');
    expect(u('.base > .bla').length).to.equal(1);
  });
  
  it("can add content with a callback", function() {
    expect(u('.base > .bla').length).to.equal(0);
    base.append(function(){ return '<a class="bla">Link</a>'; });
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').length).to.equal(1);
  });
  
  it("can add content with a callback and data", function() {
    expect(u('.base > .bla').length).to.equal(0);
    base.append('<a class="bla">Link</a>', ["a", "b"]);
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').length).to.equal(2);
  });
  
  it("can add content with a callback and data", function() {
    expect(u('.base > .bla').length).to.equal(0);
    base.append(function(cl, i){ return '<a class="bla ' + cl + '">Link</a>' }, ["a", "b"]);
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').length).to.equal(2);
    expect(u('.base > .bla.a').length).to.equal(1);
    expect(u('.base > .bla.b').length).to.equal(1);
  });
});

describe(".args(arguments)", function() {
  
  it("should be defined", function() {
    expect(typeof u().args).to.equal('function');
  });
  
  it("accepts zero parameters", function(){
    expect(u().args()).to.deep.equal([]);
  });
  
  it("accepts falsy", function(){
    expect(u().args(null)).to.deep.equal([]);
    expect(u().args(false)).to.deep.equal([]);
    expect(u().args(undefined)).to.deep.equal([]);
    expect(u().args("")).to.deep.equal([]);
    expect(u().args([])).to.deep.equal([]);
  });
  
  it("doesn't accept two parameters", function(){
    expect(u().args('a', 'b')).to.deep.equal(['a']);
  });
  
  
  describe("works with a single string", function(){
    it("single string", function(){
      expect(u().args('a')).to.deep.equal(['a']);
    });
    
    it("splits a string with space", function(){
      expect(u().args('a b ')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args('a,b,')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args('a, b, ')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with enter", function(){
      expect(u().args('a\nb\t')).to.deep.equal(['a', 'b']);
    });
  });
  
  
  describe("works with different arrays", function(){
    
    it("single element", function(){
      expect(u().args(['a'])).to.deep.equal(['a']);
    });
    
    it("single element", function(){
      expect(u().args(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c']);
    });
    
    it("splits a string with space", function(){
      expect(u().args(['a b', 'c d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args(['a,b', 'c,d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args(['a, b', 'c, d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with whitespaces", function(){
      expect(u().args(['a\nb', 'c\td'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });
  
  
  describe("works with a function", function(){
    
    it("single element", function(){
      expect(u().args(['a'])).to.deep.equal(['a']);
    });
    
    it("single element", function(){
      expect(u().args(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c']);
    });
    
    it("splits a string with space", function(){
      expect(u().args(['a b', 'c d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args(['a,b', 'c,d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args(['a, b', 'c, d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with whitespaces", function(){
      expect(u().args(['a\nb', 'c\td'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });
});
// Testing the main file
describe(".attr(name, value)", function() {
  it("should be a function", function() {
    expect(typeof base.attr).to.equal('function');
  });

  it("can add an attribute with two params", function() {
    base.attr('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
    base.first().removeAttribute('title');
    expect(!base.attr('title')).to.equal(true);
  });

  it("can add an attribute with an object", function() {
    base.attr({title: 'Hello'});
    expect(base.attr('title')).to.equal('Hello');
  });

  it("can read the first element attribute", function() {
    base.first().setAttribute('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
  });

  it("can be called with no nodes", function() {
    expect(u('dfsdf').attr('title')).to.equal('');
  });

  it("can nullify (remove) an attribute with two params", function() {
    base.first().setAttribute('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
    base.attr('title', null);
    expect(!base.attr('title')).to.equal(true);
  });

  it("can nullify (remove) an attribute with an object", function() {
    base.first().setAttribute('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
    base.attr({'title': null});
    expect(!base.attr('title')).to.equal(true);
  });
});

// Testing the main file
describe(".before(html)", function() {
  
  beforeEach(function(){
    expect(u('.bla').length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.after).to.equal('function');
  });
  
  it("can add content in the right place", function() {
    base.before('<a class="bla">Link</a>');
    expect(u('.bla').length).to.equal(1);
    expect(base.parent().find('.base, .bla').length).to.equal(2);
    expect(base.parent().find('.bla ~ .base').length).to.equal(1);
  });
});
// Testing the main file
describe(".children(selector)", function() {
  
  afterEach(function(){
    // A previous bug that would change the inner of the original reference
    expect(base.length).to.equal(1);
  });
  
  it("should be a function", function() {
    expect(typeof base.children).to.equal('function');
  });
  
  it("can select the children of ul", function() {
    expect(base.find('ul').children().length).to.equal(3);
  });
  
  it("can filter the children", function() {
    expect(base.find('ul').children(':first-child').length).to.equal(1);
  });
  
  it("okay with no children", function() {
    expect(base.find('ul').children('.nonexist').length).to.equal(0);
  });
});
// Testing the main file
describe(".closest(selector)", function() {
  
  afterEach(function(){
    // A previous bug that would change the inner of the original reference
    expect(base.nodes.length).to.equal(1);
  });
  
  it("should be a function", function() {
    expect(typeof base.closest).to.equal('function');
  });
  
  it("can select the children of ul", function() {
    expect(base.find('li').closest('ul').nodes.length).to.equal(1);
  });
});
// Testing the main file
describe(".data(name, value)", function() {
  it("should be a function", function() {
    expect(typeof base.data).to.equal('function');
  });

  it("can add an attribute with two params", function() {
    base.data('title', 'Hello');
    expect(base.data('title')).to.equal('Hello');
    base.first().removeAttribute('data-title');
    expect(!base.data('title')).to.equal(true);
  });

  it("can add an attribute with an object", function() {
    base.data({title: 'Hello'});
    expect(base.data('title')).to.equal('Hello');
  });

  it("can read the first element attribute", function() {
    base.first().setAttribute('data-title', 'Hello');
    expect(base.data('title')).to.equal('Hello');
  });

  it("can be called with no nodes", function() {
    expect(u('dfsdf').data('title')).to.equal('');
  });

  it("can nullify (remove) an attribute with two params", function() {
    base.first().setAttribute('data-title', 'Hello');
    expect(base.data('title')).to.equal('Hello');
    base.data('title', null);
    expect(!base.data('title')).to.equal(true);
  });

  it("can nullify (remove) an attribute with an object", function() {
    base.first().setAttribute('data-title', 'Hello');
    expect(base.data('title')).to.equal('Hello');
    base.data({'title': null});
    expect(!base.data('title')).to.equal(true);
  });
});

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
describe(".eacharg([], function(){})", function() {
    
  it("should be defined", function() {
    expect(typeof base.each).to.equal('function');
  });
  
  it("no data, everything is is okay", function(){
    base.eacharg();
    base.eacharg("");
    base.eacharg("", function(){});
    base.eacharg(false);
    base.eacharg(false, function(){});
    base.eacharg(undefined);
    base.eacharg(undefined, function(){});
    base.eacharg(function(){ return false; });
    base.eacharg(function(){ return false; }, function(){});
  });
  
  it("only first arguments gives an error", function(){
    expect(base.eacharg.bind(base, ["a"])).to.throw();
  });
  
  it("has the right this", function(){
    u(['a', 'b']).eacharg(['a'], function(node, arg){
      expect(this instanceof u).to.equal(true);
    });
  });
  
  it("returns an umbrella object", function(){
    var ret = u(['a', 'b']).eacharg(['a'], function(){});
    expect(ret instanceof u).to.equal(true);
  });
  
  
  // STRING
  describe('loops over an string', function(){
    
    it("accepts commas as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A,B,', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
      
    it("accepts space as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A B ', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts commas and spaces as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A, B, ', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A\nB\n', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
  });
  
  
  // ARRAY
  describe("loops over an array", function(){
    
    it("accepts an array of elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A', 'B', ''], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with space-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A B '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with comma-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A,B,'], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with comma and space separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A, B, '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts an array with other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A\nB\n'], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with a combination", function() {
      var values = ['aA', 'aB', 'aC', 'bA', 'bB', 'bC'];
      u(['a', 'b']).eacharg(['A, B', 'C, '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
  });
  
  
  // FUNCTION
  describe("loops over a function return", function(){
    
    var called = false;
    beforeEach(function(){
      called = false;
    });
    
    it("accepts commas as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A,B,'; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts space as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A B '; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts commas and spaces as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A, B, '; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A\nB\n'; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts an array of elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A', 'B', '']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with space-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A B ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with comma-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A,B,']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with comma and space separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A, B, ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts an array with other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A\nB\n']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with a combination", function() {
      var values = ['aA', 'aB', 'aC', 'bA', 'bB', 'bC'];
      u(['a', 'b']).eacharg(function(){ return ['A, B', 'C, ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
  });
});
// Testing the main file
describe(".filter(selector)", function() {
  
  it("should be defined", function() {
    expect(typeof base.filter).to.equal('function');
  });

  it("can be called empty", function() {
    base.filter();
    base.filter("");
  });

  it("stays the same", function() {
    expect(base.filter('.base').length).to.equal(1);
  });

  it("gets only one", function() {
    expect(base.find('a').filter('#world').length).to.equal(1);
  });

  it("accepts a function", function() {
    expect(base.filter(function(){ return true; }).length).to.equal(1);
    expect(base.filter(function(){ return false; }).length).to.equal(0);
  });

  it("accepts an object", function() {
    expect(base.filter(base).length).to.equal(1);
    expect(base.filter(u('.bla')).length).to.equal(0);
  });
  
  it("returns the same if called empty", function() {
    expect(base.find('.not-test li').filter().length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter('').length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(null).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(undefined).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(false).length).to.equal(base.find('.not-test li').length);
  });
});
// Testing the main file
describe(".find(selector)", function() {
  
  it("should be a function", function() {
    expect(typeof base.find).to.equal('function');
  });
  
  it("can be empty and it selects all", function() {
    expect(base.find().nodes.length).to.equal(base.find('*').nodes.length);
  });
  
  it("can select the list ul", function() {
    expect(base.find('ul').nodes.length).to.equal(1);
  });
  
  it("doesn't select duplicates", function(){
    expect(u("*").find('.brand a').nodes.length).to.equal(1);
  });
});
// Testing the main file
describe(".first()", function() {
  
  it("should be a function", function() {
    expect(typeof base.first).to.equal('function');
  });
  
  it("the first element is an HTML element", function() {
    expect(base.find("li").first().nodeType).to.equal(1);
  });
  
  it("can get the first li and it's a LI", function() {
    expect(base.find("li").first().nodeName).to.equal('LI');
  });
});
// Testing the main file
describe("parseJsom(string)", function() {
  
  it("should be defined", function() {
    expect(typeof parseJson).to.equal('function');
  });

  it("can be called empty", function() {
    expect(parseJson()).to.equal(false);
    expect(parseJson("")).to.equal(false);
    expect(parseJson([])).to.equal(false);
    expect(parseJson("","")).to.equal(false);
    expect(parseJson(" ")).to.equal(false);
  });

  it("parses correctly", function() {
    expect(parseJson('{"hello": "world"}').hello).to.equal('world');
  });
});
// Testing the main file
describe(".hasClass(name)", function() {
  
  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });
  
  it("can check a single class", function() {
    expect(base.find('#world').hasClass('hello')).to.equal(true);
  });
  
  it("works as AND", function() {
    expect(base.find('#world').hasClass('hello nonexisting')).to.equal(false);
  });
  
  it("can check multiple classes with space", function() {
    expect(base.find('#world').hasClass('hello world')).to.equal(true);
  });
  
  it("can check multiple classes with comma", function() {
    expect(base.find('#world').hasClass('hello,world')).to.equal(true);
  });
  
  it("can check multiple classes as arguments", function() {
    expect(base.find('#world').hasClass('hello', 'world')).to.equal(true);
  });
});
// Testing the main file
describe(".html(content)", function() {
  
  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });
  
  it("can get the html content", function() {
    expect(base.find('#world').html()).to.equal('Hello world');
  });
  
  it("can set the html content", function() {
    expect(base.find('#world').html()).not.to.equal('hello');
    base.find('#world').html('hello');
    expect(base.find('#world').html()).to.equal('hello');
    base.find('#world').html('Hello world');
  });
});
// Testing the main file
describe(".is(selector)", function() {
  
  it("should be defined", function() {
    expect(typeof base.is).to.equal('function');
  });

  it("can be called empty", function() {
    base.is();
    base.is("");
  });

  it("accepts a selector", function() {
    expect(base.is('.base')).to.equal(true);
    expect(base.is('div')).to.equal(true);
  });

  it("accepts a function", function() {
    expect(base.is(function(){ return true; })).to.equal(true);
    expect(base.is(function(){ return false; })).to.equal(false);
    base.is(function(node){
      expect(u(node).is('.base')).to.equal(true);
    });
  });

  it("accepts an object", function() {
    expect(base.is(base)).to.equal(true);
    expect(base.is(u('.bla'))).to.equal(false);
    base.is(function(node){
      expect(u(node).is(base)).to.equal(true);
    });
  });
});
describe(".join(function(){})", function() {
    
  it("should be defined", function() {
    expect(typeof base.each).to.equal('function');
  });
  
  it("empty gives an error", function(done){
    try {
      u([0, 1, 2]).join();
    } catch (e) {
      return done();
    }
    throw "Shouldn't get here";
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
// Testing the main file
describe(".last()", function() {
  
  it("should be a function", function() {
    expect(typeof base.last).to.equal('function');
  });
  
  it("the last element is an HTML element", function() {
    expect(base.find("li").last().nodeType).to.equal(1);
  });
  
  it("can get the last li and it's a LI", function() {
    expect(base.find("li").last().nodeName).to.equal('LI');
  });

  it("returns false for non existing element", function() {
  	expect(u('.non-existing').last()).to.equal(false);
  })

  it("actually returns the last element", function() {
  	base.append('<a class="last-test">Node 1</a> <div class="last-test">Node 2</div>');
  	expect(u('.last-test').last().nodeName).to.equal('DIV');
  })

});
describe(".not(elems)", function() {

  beforeEach(function() {
    base.append('\
      <ul class="not-test"> \
        <li class="filter"></li> \
        <li class="filter"></li> \
        <li></li> \
      </ul>');

    expect(u('.not-test').nodes.length).to.equal(1);
    expect(u('.not-test li').nodes.length).to.equal(3);
  });

  afterEach(function() {
    u('.not-test').remove();
    expect(u('.not-test').nodes.length).to.equal(0);
  });
  
  it("should be a function", function() {
    expect(typeof base.not).to.equal('function');
  });

  it("can be called empty", function() {
    base.not();
    base.not('');
    base.not(null);
    base.not(undefined);
    base.not(false);
  });

  it("returns same if called empty", function() {
    expect(base.find('.not-test li').not().nodes.length).to.equal(base.find('.not-test li').nodes.length);
    expect(base.find('.not-test li').not('').nodes.length).to.equal(base.find('.not-test li').nodes.length);
    expect(base.find('.not-test li').not(null).nodes.length).to.equal(base.find('.not-test li').nodes.length);
    expect(base.find('.not-test li').not(undefined).nodes.length).to.equal(base.find('.not-test li').nodes.length);
    expect(base.find('.not-test li').not(false).nodes.length).to.equal(base.find('.not-test li').nodes.length);
  });

  it("filter single element", function() {
    expect(base.find('.not-test li').not(u(u('.not-test li').first())).nodes.length).to.equal(2);
  });

  it("filter multiple elements", function() {
    expect(base.find('.not-test li').not(u('.not-test li.filter')).nodes.length).to.equal(1);
  });

  it("filter selector elements", function() {
    expect(base.find('.not-test li').not('.filter').nodes.length).to.equal(1);
  });

});
describe('.off()', function() {
  
  var listener = function() {
    throw 'Shouldn\'t be called';
  };

  beforeEach(function() {
    base.append('<ul class="temp"><li class="off-single-test">1</li>'
    + '<li class="off-multiple-test">2</li>'
    + '<li class="off-multiple-test">3</li>'
    + '</ul>');
  });
  
  afterEach(function(){
    base.find(".temp").remove();
    expect(u(".temp").length).to.equal(0);
  });

  it('should be defined', function() {
    expect(typeof base.off).to.equal('function');
  });

  it('on works', function(done) {
    u('.off-single-test').on('click', function(){ done(); });
    u('.off-single-test').trigger('click');
  });

  it('removes event from single element', function() {
    u('.off-single-test').on('click', listener);
    u('.off-single-test').off('click');
    u('.off-single-test').trigger('click');
  });

  it('removes event from multiple elements', function() {
    u('.off-multiple-test').on('click', listener);
    u('.off-multiple-test').off('click');
    u('.off-multiple-test').trigger('click');
  });

  it('removes event multiple times', function() {
    u('.off-multiple-test').on('click', listener);
    u('.off-multiple-test').on('click', function(){
      throw "Error";
    });
    u('.off-multiple-test').off('click');
    u('.off-multiple-test').trigger('click');
  });

  it('removes multiple events', function() {
    u('.off-multiple-test').on('click mouseover', listener);
    u('.off-multiple-test').off('click mouseover');
    u('.off-multiple-test').trigger('mouseover');
  });

  it('does not remove manual event', function(done) {
    u('.off-single-test').first().addEventListener('click', function(){
      done();
    });
    u('.off-single-test').off('click');
    u('.off-single-test').trigger('click');
  });
});

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
describe('.parent()', function() {

  it('should be defined', function() {
    expect(typeof base.parent).to.equal('function');
  });

  it('can loop the li', function() {
    expect(u('li').parent().is('ol, ul')).to.equal(true);
  });
  
  it('can retrieve all paragraphs', function() {
    expect(u('a').parent('p').is('p')).to.equal(true);
    expect(u('a').parent('p')).not.to.equal(u('a').parent());
  });
});

// Testing the main file
describe(".remove()", function() {

  beforeEach(function() {
    base.append('\
      <ul class="remove-test"> \
        <li></li> \
        <li></li> \
      </ul> \
    ');

    expect(u('.remove-test').length).to.equal(1);
    expect(u('.remove-test li').length).to.equal(2);
  });

  afterEach(function() {
    u('.remove-test').remove();
  });


  it("should be defined", function() {
    expect(typeof base.remove).to.equal('function');
  });

  it("can be called even without any node", function() {
    expect(u('.remove-test div').nodes).to.be.empty;
    u('.remove-test div').remove();
  });

  it("should return an instance of umbrella with the removed nodes", function() {
    var result = u('.remove-test').remove();

    expect(result).to.be.instanceof(u);
    expect(result.nodes).to.have.length(1);
    expect(result.attr('class')).to.equal('remove-test');
    expect(result.children().nodes).to.have.length(2); // Two li children.
  });

  it("removes a single element", function() {
    u('.remove-test').remove();
    expect(u('.remove-test').nodes).to.be.empty;
  });

  it("removes several elements", function() {
    u('.remove-test li').remove();
    expect(u('.remove-test li').nodes).to.be.empty;
  });
});

// Testing the main file
describe(".removeClass()", function() {
  
  beforeEach(function(){
    base.addClass('bla,blu');
    expect(base.hasClass('bla')).to.equal(true);
    expect(base.hasClass('blu')).to.equal(true);
  });
  
  it("should be defined", function() {
    expect(typeof base.removeClass).to.equal('function');
  });

  it("can be called empty", function() {
    base.removeClass();
    base.removeClass("");
    base.removeClass([]);
    base.removeClass("","");
    base.removeClass(" ");
  });

  it("removes a single class", function() {
    base.removeClass('bla');
    expect(base.hasClass('bla')).to.equal(false);
  });

  it("remove several classes as arguments", function() {
    base.removeClass('bla', 'blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("removes several classes with an array", function() {
    base.removeClass(['bla', 'blu']);
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("removes several classes separated by space", function() {
    base.removeClass('bla blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("removes several classes separated by comma", function() {
    base.removeClass('bla,blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("can be concatenated", function() {
    base.removeClass('bla').removeClass('blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(false);
  });
});
// Testing the main file
describe(".select(selector)", function() {
  
  it("should be a function", function() {
    expect(typeof base.select).to.equal('function');
  });
  
  it("is fine-tuned for context (use css with that)", function() {
    var withContext = u().select('a', u('.brand').first())[0];
    var withCss = u().select.byCss('.brand a')[0];
    expect(withContext).to.equal(withCss);
  });
  
  it("can select by class", function(){
    expect(u().select('.base').length).to.equal(1);
    expect(u().select('.base')).to.not.equal(null);
  });
  
  it("can select by tag", function(){
    expect(u().select('li').length).to.be.above(1);
    expect(u().select('li')[0].nodeName).to.equal('LI');
  });
  
  it("can select by id", function(){
    expect(u().select('#base')).to.not.equal(null);
  });
  
  it("can select by complex selector", function() {
    expect(u().select('.brand a').length).to.equal(1);
    expect(u().select('.brand a')[0].nodeName).to.equal('A');
  });
  
  it("can create one element", function(){
    expect(u('<div>').length).to.equal(1);
    expect(u('<div>').first().nodeName).to.equal('DIV');
  });
  
  it("can create many elements", function(){
    expect(u('<p></p><p></p>').length).to.equal(2);
    expect(u('<p></p><p></p>').first().nodeName).to.equal('P');
  });
});


// Testing the main file
describe(".siblings(selector)", function() {
  
  beforeEach(function() {
    base.append('\
      <ul class="siblings-test"> \
        <li id="siblings-1" class="selected"></li> \
        <li id="siblings-2"></li> \
        <li id="siblings-3"></li> \
      </ul> \
      <ul class="siblings-test"> \
        <li id="siblings-4"></li> \
        <li id="siblings-5" class="selected"></li> \
        <li id="siblings-6"></li> \
      </ul> \
    ');

    expect(u('.siblings-test').nodes.length).to.equal(2);
    expect(u('.siblings-test li').nodes.length).to.equal(6);
  });

  afterEach(function() {
    u('.siblings-test').remove();
    expect(u('.siblings-test').nodes.length).to.equal(0);
  });
  
  it("should be a function", function() {
    expect(typeof base.siblings).to.equal('function');
  });
  
  it("can select multiple siblings", function() {
    expect(base.find('#siblings-2').siblings().nodes.length).to.equal(2);
  });
  
  it("can filter the siblings", function() {
    expect(base.find('#siblings-1').siblings('#siblings-2').nodes.length).to.equal(1);
  });
  
  it("can handle non existant siblings ", function() {
    expect(base.find('#siblings-2').siblings('.nonexist').nodes.length).to.equal(0);
  });

  it("can handle multiple nodes", function() {
    expect(base.find('.siblings-test').children('.selected').siblings().nodes.length).to.equal(4);
  });
});
// Testing the main file
describe(".text(content)", function() {
  
  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });
  
  it("can get the text content", function() {
    expect(base.find('#world').text()).to.equal('Hello world');
  });
  
  it("can set the text content", function() {
    expect(base.find('#world').text()).not.to.equal('hello!');
    base.find('#world').text('hello!');
    expect(base.find('#world').text()).to.equal('hello!');
  });
});
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

// Testing the main file
describe(".trigger()", function() {
  
  it("should be a function", function() {
    expect(typeof base.trigger).to.equal('function');
  });
  
  it("can trigger a click", function() {
    base.on('click', function(e){
      expect(!!e).to.equal(true);
    });
    base.trigger('click');
  });
  
  it("can trigger an event in the wrong element", function() {
    base.on('click', function(e){
      expect(!!e).to.equal(true);
    });
    base.trigger('click');
  });
  
  it("doesn't trigger all events", function() {
    base.on('click', function(e){
      throw "Shouldn't be called";
    });
    base.trigger('submit');
  });
  
  it("triggers custom event", function(done) {
    base.on('bla', function(e){
      expect(!!e).to.equal(true);
      done();
    });
    base.trigger('bla');
  });
});