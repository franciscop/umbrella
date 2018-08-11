// Testing the main file
describe(".append(html)", function() {

  // Default callback for the tests
  function callback(cl){
    return '<a class="bla ' + cl + '">Link</a>';
  }

  beforeEach(function(){
    expect(u('.bla, .blu').length).to.equal(0);
  });

  afterEach(function(){

    // Just in case it stringifies the callback
    expect(base.html().match('function')).to.equal(null);
    u('.bla, .blu').remove();
  });



  it("should be a function", function() {
    expect(typeof base.append).to.equal('function');
  });

  it("can be called empty", function() {
    base.append();
  });

  it("can be called with empty string", function() {
    base.append("");
  });

  it("a function looping data has right footprint", function() {
    base.append(function(value, index, node, j){
      if (['a', 'b'].indexOf(value) === -1) throw new Error("Not an element");
      if (value === 'a') same(index, 0);
      if (value === 'b') same(index, 1);
      same(node, base.first());
      same(j, 0)
    }, ['a', 'b']);
  });


  it("a function looping a number has right footprint", function() {
    var iterations = 0;
    base.append(function(value, index, node, j){
      if ([0, 1].indexOf(value) === -1) throw new Error("Not an element");
      if (value === 0) same(index, 0);
      if (value === 1) same(index, 1);
      same(node, base.first());
      same(j, 0);
      iterations++;
    }, 2);
    same(iterations, 2);
  });



  // HTML
  describe("HTML string", function(){
    it("can add a link", function() {
      base.append('<a class="bla">Link</a>');
      size('.base > .bla', 1);
    });

    it("can add sibling links", function() {
      base.append('<a class="bla">Link</a><a class="bla">Link</a>');
      size('.base > .bla', 2);
    });

    it("can add nested content", function() {
      base.append('<strong class="bla"><a>Link</a></strong>');
      size('.base > .bla > a', 1);
    });

    it("can append a table row", function() {
      var table = u('table.tbl').append('<tr><td>Hi</td></tr>');
      var result = '<table class="tbl"><tr><td>Hi</td></tr></table>';
      expect(table.nodes[0].outerHTML).to.equal(result);
    });

    it("can add just text", function() {
      var frag = u('<div>').append('Hello world!\n');
      same(frag.html(), 'Hello world!\n');
    });
  });

  describe("HTML string looped with array", function(){

    it("insert two links", function() {
      base.append('<a class="bla">Link</a>', ['a', 'b']);
      size('.base > .bla', 2)('.base > .bla:last-child', 1);
    });

    it("can add nested content", function() {
      base.append('<strong class="bla"><a>Link</a></strong>', ['a', 'b']);
      size('.base > .bla > a', 2);
    });

    it("can append simple text", function() {
      var frag = u('<div>').append('Hello!\n', ['a', 'b']);
      same(frag.html(), 'Hello!\nHello!\n');
    });
  });



  // Callback
  describe("Callback", function(){
    it("can add a link", function() {
      base.append(function(){ return '<a class="bla">Link</a>'; });
      size('.base > .bla', 1)('.base > .bla:last-child', 1);
    });

    it("can add sibling links", function() {
      base.append(function(){ return '<a class="bla">Link</a><a class="bla">Link</a>'; });
      size('.base > .bla', 2)('.base > .bla:last-child', 1);
    });

    it("can add nested content", function() {
      base.append(function(){ return '<strong class="bla"><a>Link</a></strong>'; });
      size('.base > .bla > a', 1);
    });

    it("can add just text", function() {
      var frag = u('<div>').append(function(){ return 'Hello world!\n'; });
      same(frag.html(), 'Hello world!\n');
    });
  });

  describe("Callback looped with array", function(){

    it("can add sibling links", function() {
      base.append(function(v){ return '<a class="bla">Link</a>'; }, ['a', 'b']);
      size('.base > .bla', 2)('.base > .bla:last-child', 1);
    });

    it("can add nested content", function() {
      base.append(function(){ return '<strong class="bla"><a>Link</a></strong>'; }, ['a', 'b']);
      size('.base > .bla > a', 2);
    });

    it("can add just text", function() {
      var frag = u('<div>').append(function(){ return 'Hello world!\n'; }, ['a', 'b']);
      same(frag.html(), 'Hello world!\nHello world!\n');
    });

    it("can add content with a callback and data", function() {
      base.append(callback, ['a', 'b']);
      size('.base > .bla', 2)('.base > .bla.a', 1)('.base > .bla.b', 1);
      size('.bla.a + .bla.b', 1)('.bla.b + .bla.a', 0)('.base > .bla.b:last-child', 1);
    });
  });



  describe("Umbrella instance", function(){
    it("Accepts a simple one", function(){
      base.append(u('<div class="bla"></div>'));
      size('.base > .bla', 1)('.base > .bla:last-child', 1);
    });

    it("Keeps the events when appending", function(done){
      base.append(u('<div class="bla">').on('click', function(){ done(); }));
      size('.base > .bla', 1)('.base > .bla:last-child', 1);
      u('.base .bla').trigger('click');
    });

    it("Clones multiple events when appending", function(done){
      base.append(u('<div class="bla">').on('click touch', function(){ done(); }));
      size('.base > .bla', 1)('.base > .bla:last-child', 1);
      u('.base .bla').trigger('touch');
    });
  });



  it("can generate some text", function(){
    var list = u("<div>");
    if (work) list.append(function(n){ return n + "\n" }, ['a', 'b']);

    expect(list.children().length).to.equal(0);
    expect(list.html()).to.equal('a\nb\n');
  });

  it("can generate some text with number", function(){
    var list = u("<div>");
    if (work) list.append(function(n){ return n + "\n" }, 2);

    expect(list.children().length).to.equal(0);
    expect(list.html()).to.equal('0\n1\n');
  });

  it("isn't called any time with 0", function(){
    u('<div>').append(function(n){ throw new Error("Shouldn't be called"); }, 0);
  });



  // Node
  it("can append an html node", function() {
    base.append(u('<div class="bla">').first());
    size('.bla', 1);
  });

  it("should append supplied html to each targeted element and not only the last instance", function() {
    base.append(u('<span class="test-span"></span><span class="test-span"></span><span class="test-span"></span><span class="test-span"></span>'));
    base.append(u('<a class="append-me"></a>'));

    u(".test-span").append(u(".append-me"));

    size(".test-span .append-me", 4);
  });
});
