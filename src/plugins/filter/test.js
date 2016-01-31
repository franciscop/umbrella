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
    expect(base.filter('.base').length).to.equal(1);
  });

  it("gets only one", function() {
    expect(base.find('a').filter('#world').length).to.equal(1);
  });

  it("accepts a function", function() {
    expect(base.filter(function(){ return true; }).length).to.equal(1);
    expect(base.filter(function(){ return false; }).length).to.equal(0);
  });

  it("accepts an object", function() {
    expect(base.filter(base).length).to.equal(1);
    expect(base.filter(u('.bla')).length).to.equal(0);
  });
  
  it("returns the same if called empty", function() {
    expect(base.find('.not-test li').filter().length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter('').length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(null).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(undefined).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(false).length).to.equal(base.find('.not-test li').length);
  });
});