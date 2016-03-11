var listOfClasses = getListOfClasses();

describe(".addClass()", function() {

  beforeEach(function(){
    base.removeClass('bla blu blo');
    hasClass('bla blu blo', true);
  });

  afterEach(function(){
    base.removeClass('bla blu blo');
    hasClass('bla blu blo', true);
  });



  it("should be defined", function() {
    isFn(work ? base.addClass : false);
  });

  it("can be called empty", function() {
    base.addClass();
    base.addClass("");
    base.addClass([]);
    base.addClass("","");
    base.addClass(" ");

    if (!work) throw "Forced failure";
  });

  it("can be concatenated", function() {
    if (work) base.addClass('bla').addClass('blu');
    hasClass('bla')('blu');
  });

  it("returns the same instance", function() {
    var inst = false;
    if (work) inst = base.addClass('bla,blu');
    same(base, inst);
  });

  it("adds a single class", function() {
    if (work) base.addClass('bla');
    hasClass('bla');
  });



  describe("single argument", function(){
    listOfClasses.forEach(function(part){
      it("accepts " + part.it, function(){
        if (work) base.addClass(part.from);
        hasClass('bla blu blo');
      });
    });
  });

  describe("single function argument uses the return value", function(){
    listOfClasses.forEach(function(part){
      it("accepts as a return value " + part.it, function(){
        if (work) base.addClass(function() { return part.from; });
        hasClass('bla blu blo');
      });
    });
  });

  describe("multiple functions uses the return value", function(){
    function add(arg){ return function(){ return arg; }; }
    listOfClasses.forEach(function(part){
      it("accepts as a return value " + part.it, function(){
        if (work) base.addClass(add(part.from), add("bli"));
        hasClass('bla blu blo bli');
      });
    });
  });

  describe("several arguments", function(){
    listOfClasses.filter(function(part){
      return Array.isArray(part.from);
    }).forEach(function(part){
      it("used .apply() with " + part.it, function(){
        if (work) base.addClass.apply(base, part.from);
        hasClass('bla blu blo');
      });
    });
  });


  describe("callback uses the arguments", function(){

    // Testing the main file
    function addTest(node, i){
      return 'test' + i;
    }

    it("adds classes with callback", function(){
      if (work) base.addClass(addTest);

      hasClass('test0');

      base.removeClass('test0');
      expect(base.hasClass('test0')).to.equal(false);
    });

    it("adds many classes with callback", function(){
      if (work) base.find('li').addClass(addTest);

      base.find('li').each(function(node, i){
        hasClass('test' + i, false, node);
        u(node).removeClass('test' + i);
      });
    });

  });
});
