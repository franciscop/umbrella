// Testing the main file
describe(".select(selector)", function() {
  
  it("should be a function", function() {
    expect(typeof base.select).to.equal('function');
  });
  
  it("is fine-tuned for context (use css with that)", function() {
    var withContext = u().select('a', u('.brand').first())[0];
    var withCss = u().select.byCss('.brand a')[0];
    expect(withContext).to.equal(withCss);
  });
  
  it("can select by class", function(){
    expect(u().select('.base').length).to.equal(1);
    expect(u().select('.base')).to.not.equal(null);
  });
  
  // it("is fine-tuned by class", function(){
  //   expect(u().select('.base')).to.equal(u().select.byClass('base'));
  // });
  
  it("can select by tag", function(){
    expect(u().select('li').length).to.be.above(1);
    expect(u().select('li')[0].nodeName).to.equal('LI');
  });
  
  // it("is fine-tuned by tag", function(){
  //   expect(u().select('li')).to.equal(u().select.byTag('li'));
  //   //console.log(u().select('#base'));
  // });
  
  it("can select by id", function(){
    expect(u().select('#base')).to.not.equal(null);
  });
  
  // it("is fine-tuned by id", function(){
  //   expect(u().select('#base')).to.equal(u().select.byId('base'));
  // });
  
  it("can select by complex selector", function() {
    expect(u().select('.brand a').length).to.equal(1);
    expect(u().select('.brand a')[0].nodeName).to.equal('A');
  });
});

