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
    
    // Compatible test (damn you IE11-)
    (function (target, type, event) {
      if (document.createEvent) {
        event = new Event(type);
        target.dispatchEvent(event);
      } else {
        event = document.createEventObject();
        target.fireEvent('on' + type, event);
      }
    })(u('form.login').first(), 'submit');
  });
});
