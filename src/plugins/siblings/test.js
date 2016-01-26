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