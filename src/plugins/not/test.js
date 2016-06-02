describe(".not(elems)", function() {

  beforeEach(function() {
    base.append('\
      <ul class="not-test"> \
        <li class="filter"></li> \
        <li class="filter"></li> \
        <li></li> \
      </ul>');

    expect(u('.not-test').length).to.equal(1);
    expect(u('.not-test li').length).to.equal(3);
  });

  afterEach(function() {
    u('.not-test').remove();
    expect(u('.not-test').length).to.equal(0);
  });

  it("should be a function", function() {
    expect(typeof base.not).to.equal('function');
  });

  it("can be called empty", function() {
    base.not();
    base.not('');
    base.not(null);
    base.not(undefined);
    base.not(false);
  });

  it("returns same if called empty", function() {
    expect(base.find('.not-test li').not().length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').not('').length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').not(null).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').not(undefined).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').not(false).length).to.equal(base.find('.not-test li').length);
  });

  it("filter single element", function() {
    expect(base.find('.not-test li').not(u(u('.not-test li').first())).length).to.equal(2);
  });

  it("filter multiple elements", function() {
    expect(base.find('.not-test li').not(u('.not-test li.filter')).length).to.equal(1);
  });

  it("filter selector elements", function() {
    expect(base.find('.not-test li').not('.filter').length).to.equal(1);
  });

});
