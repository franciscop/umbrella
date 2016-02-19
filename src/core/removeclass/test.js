// Testing the main file
describe(".removeClass()", function() {

  //var work = false;

  beforeEach(function(){
    base.addClass('bla blu blo');
    hasClass('bla blu blo');
  });

  afterEach(function(){
    base.removeClass('bla blu blo');
    hasClass('bla blu blo', true);
  });

  it("should be defined", function() {
    isFn(work ? base.removeClass : false);
  });

  it("can be called empty", function() {
    base.removeClass();
    base.removeClass("");
    base.removeClass([]);
    base.removeClass("","");
    base.removeClass(" ");

    if (!work) throw "Force failure";
  });

  it("removes a single class", function() {
    if (work) base.removeClass('bla');
    hasClass('bla', true);
  });

  it("can be concatenated", function() {
    if (work) base.removeClass('bla').removeClass('blu');
    hasClass('bla blu', true);
  });




  describe("single argument", function(){
    base.addClass('bla blu blo');
    listOfClasses.forEach(function(part){
      it("accepts " + part.it, function(){
        if (work) base.removeClass(part.from);
        hasClass('bla blu blo', true);
      });
    });
  });

  describe("single function argument uses the return value", function(){
    base.addClass('bla blu blo');
    listOfClasses.forEach(function(part){
      it("accepts as a return value " + part.it, function(){
        if (work) base.removeClass(function() { return part.from; });
        hasClass('bla blu blo', true);
      });
    });
  });

  describe("multiple functions uses the return value", function(){
    function add(arg){ return function(){ return arg; }; }
    listOfClasses.forEach(function(part){
      it("accepts as a return value " + part.it, function(){
        if (work) base.removeClass(add(part.from), add("bli"));
        hasClass('bla blu blo bli', true);
      });
    });
  });

  describe("several arguments", function(){
    listOfClasses.filter(function(part){
      return Array.isArray(part.from);
    }).forEach(function(part){
      it("used .apply() with " + part.it, function(){
        if (work) base.removeClass.apply(base, part.from);
        hasClass('bla blu blo', true);
      });
    });
  });
});
