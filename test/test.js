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
// Testing the main file
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
    len = base.addClass('bla,blu').nodes.length;
    expect(len).to.equal(1);
  });
});
// Testing the main file
describe(".after(html)", function() {
  
  beforeEach(function(){
    expect(u('.bla').nodes.length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.after).to.equal('function');
  });
  
  it("can add content in the right place", function() {
    base.after('<a class="bla">Link</a>');
    expect(u('.bla').nodes.length).to.equal(1);
    expect(base.parent().find('.base, .bla').nodes.length).to.equal(2);
    expect(base.parent().find('.base ~ .bla').nodes.length).to.equal(1);
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
    expect(u('.bla').nodes.length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.append).to.equal('function');
  });
  
  it("can add content in the right place", function() {
    expect(u('.base > .bla').nodes.length).to.equal(0);
    base.append('<a class="bla">Link</a>');
    expect(u('.base > .bla').nodes.length).to.equal(1);
  });
});
// Testing the main file
describe(".attr(name, value)", function() {
  
  beforeEach(function(){
    expect(u('.bla').nodes.length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.after).to.equal('function');
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
    expect(u('.bla').nodes.length).to.equal(0);
  });
  
  afterEach(function(){
    u('.bla').remove();
  });
  
  it("should be a function", function() {
    expect(typeof base.after).to.equal('function');
  });
  
  it("can add content in the right place", function() {
    base.before('<a class="bla">Link</a>');
    expect(u('.bla').nodes.length).to.equal(1);
    expect(base.parent().find('.base, .bla').nodes.length).to.equal(2);
    expect(base.parent().find('.bla ~ .base').nodes.length).to.equal(1);
  });
});
// Testing the main file
describe(".children(selector)", function() {
  
  afterEach(function(){
    // A previous bug that would change the inner of the original reference
    expect(base.nodes.length).to.equal(1);
  });
  
  it("should be a function", function() {
    expect(typeof base.children).to.equal('function');
  });
  
  it("can select the children of ul", function() {
    expect(base.find('ul').children().nodes.length).to.equal(3);
  });
  
  it("can filter the children", function() {
    expect(base.find('ul').children(':first-child').nodes.length).to.equal(1);
  });
  
  it("okay with no children", function() {
    expect(base.find('ul').children('.nonexist').nodes.length).to.equal(0);
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
  
  it("is fine-tuned by class", function(){
    expect(u().select('.base')).to.equal(u().select.byClass('base'));
  });
  
  it("can select by tag", function(){
    expect(u().select('li').length).to.be.above(1);
    expect(u().select('li')[0].nodeName).to.equal('LI');
  });
  
  it("is fine-tuned by tag", function(){
    expect(u().select('li')).to.equal(u().select.byTag('li'));
    //console.log(u().select('#base'));
  });
  
  it("can select by id", function(){
    expect(u().select('#base')).to.not.equal(null);
  });
  
  it("is fine-tuned by id", function(){
    expect(u().select('#base')).to.equal(u().select.byId('base'));
  });
  
  it("can select by complex selector", function() {
    expect(u().select('.brand a').length).to.equal(1);
    expect(u().select('.brand a')[0].nodeName).to.equal('A');
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

  it("toggles several classes separated by comma", function() {
    len = base.toggleClass('bla,blu').nodes.length;
    expect(len).to.equal(1);
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
});