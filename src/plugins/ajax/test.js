// Testing the main file
describe(".ajax(done, before)", function() {

  it("should be defined", function() {
    expect(typeof base.ajax).to.equal('function');
  });

  it("works even if empty", function() {

    // This is needed to make sure that the previous one is cleared
    setTimeout(function(){
      u('form.login').ajax();

      u('form.login').trigger('submit');
      setTimeout(function(){ u('form.login').off('submit'); }, 100);
    }, 110);
  });

  it("calls before", function(next) {

    setTimeout(function(){
      u('form.login').ajax(function(err, body, xhr){
        same(this.nodeName, 'FORM');
        same(!!xhr, true);
        next();
      });

      u('form.login').trigger('submit');

      // SetTimeout is needed not to interrupt te current event
      setTimeout(function(){ u('form.login').off('submit'); }, 100);
    }, 110);
  });
});
