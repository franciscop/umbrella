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