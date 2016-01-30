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
    expect(u('.demo').length).to.equal(1);
  });
  
  it("can select by tag", function() {
    expect(u('body').length).to.equal(1);
  });
  
  it("can select by id", function() {
    expect(u('#demo').length).to.equal(1);
  });

  it("can select with css", function() {
    expect(u('[id="demo"]').nodes.length).to.equal(1);
    expect(u('.demo ul').length).to.equal(1);
  });
  
  it("can select an object", function() {
    var object = u('.demo li').nodes[0];
    expect(u(object).length).to.equal(1);
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
    expect(u('a').length).to.equal(u('a').nodes.length);
  });
});



// u('a').parent.children.filter();
// u('a').first;
// u('a').toString()
// u('a').html("Bla") || u('a').html();



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
    len = base.addClass('bla,blu').nodes.length;
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
  
  it("can add content with a callback", function() {
    expect(u('.base > .bla').nodes.length).to.equal(0);
    base.append(function(){ return '<a class="bla">Link</a>'; });
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').nodes.length).to.equal(1);
  });
  
  it("can add content with a callback and data", function() {
    expect(u('.base > .bla').nodes.length).to.equal(0);
    base.append('<a class="bla">Link</a>', ["a", "b"]);
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').nodes.length).to.equal(2);
  });
  
  it("can add content with a callback and data", function() {
    expect(u('.base > .bla').nodes.length).to.equal(0);
    base.append(function(cl, i){ return '<a class="bla ' + cl + '">Link</a>' }, ["a", "b"]);
    expect(base.html().match('function')).to.equal(null);
    expect(u('.base > .bla').nodes.length).to.equal(2);
    expect(u('.base > .bla.a').nodes.length).to.equal(1);
    expect(u('.base > .bla.b').nodes.length).to.equal(1);
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
    expect(base.filter('.base').nodes.length).to.equal(1);
  });

  it("gets only one", function() {
    expect(base.find('a').filter('#world').nodes.length).to.equal(1);
  });

  it("accepts a function", function() {
    expect(base.filter(function(){ return true; }).nodes.length).to.equal(1);
    expect(base.filter(function(){ return false; }).nodes.length).to.equal(0);
  });

  it("accepts an object", function() {
    expect(base.filter(base).nodes.length).to.equal(1);
    expect(base.filter(u('.bla')).nodes.length).to.equal(0);
  });
  
  it("returns the same if called empty", function() {
    expect(base.find('.not-test li').filter().nodes.length).to.equal(base.find('.not-test li').nodes.length);
    expect(base.find('.not-test li').filter('').nodes.length).to.equal(base.find('.not-test li').nodes.length);
    expect(base.find('.not-test li').filter(null).nodes.length).to.equal(base.find('.not-test li').nodes.length);
    expect(base.find('.not-test li').filter(undefined).nodes.length).to.equal(base.find('.not-test li').nodes.length);
    expect(base.find('.not-test li').filter(false).nodes.length).to.equal(base.find('.not-test li').nodes.length);
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

  it("accepts an object", function() {
    expect(base.is(base)).to.equal(true);
    expect(base.is(u('.bla'))).to.equal(false);
    base.is(function(node){
      expect(u(node).is(base)).to.equal(true);
    });
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
// Testing the main file
describe(".remove()", function() {

  beforeEach(function() {
    base.append('\
      <ul class="remove-test"> \
        <li></li> \
        <li></li> \
      </ul> \
    ');

    expect(u('.remove-test').nodes.length).to.equal(1);
    expect(u('.remove-test li').nodes.length).to.equal(2);
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
    len = base.toggleClass('bla,blu').nodes.length;
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