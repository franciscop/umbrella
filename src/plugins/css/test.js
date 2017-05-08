// Testing the main file
describe(".css()", function() {

  beforeEach(function() {
    base.append('\
      <div class="css-test"></div> \
    ');

    expect(u('.css-test').length).to.equal(1);
  });

  afterEach(function() {
    u('.css-test').remove();
  });

  it("should be a function", function() {
    expect(typeof base.css).to.equal('function');
  });

  it("can set and get the single style", function() {
    var test = base.find('.css-test');
    
    test.css('border', '1px solid red');
    test.css('borderWidth', 20);
    expect(test.css('border-width')).to.equal('20px');
    expect(test.css('borderColor')).to.equal('red');
  });

  it("can set multiple styles", function() {
    var test = base.find('.css-test');
    
    test.css({
      border: '10px solid red',
      backgroundColor: 'green'
    });
    expect(test.css('borderStyle')).to.equal('solid');
    expect(test.css('background-color')).to.equal('green');
  });

});
