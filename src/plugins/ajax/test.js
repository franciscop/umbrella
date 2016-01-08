// Testing the main file
describe(".addClass(name1, name2, ...)", function() {
  
  it("should be defined", function() {
    expect(typeof base.ajax).to.equal('function');
  });
  
  it("calls before", function(done) {
    u('form.login').ajax(console.log, function(xhr){
      expect(!!xhr).to.equal(true);
      done();
    });
    u('form.login').trigger('submit');
  });
});
