// Testing the main file
describe(".addClass(name1, name2, ...)", function() {
  
  it("should be defined", function() {
    expect(typeof base.ajax).to.equal('function');
  });
  
  it("calls before", function(next) {
    u('form.login').ajax(function(err, xhr){
      expect(!!xhr).to.equal(true);
      next();
    });
    u('form.login').trigger('submit');
  });
});
