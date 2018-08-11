// Testing the main file
describe(".select(selector)", function() {

  it("should be a function", function() {
    expect(typeof base.select).to.equal('function');
  });

  it("can select by class", function(){
    expect(u().select('.base').length).to.equal(1);
    expect(u().select('.base')).to.not.equal(null);
  });

  it("can select by tag", function(){
    expect(u().select('li').length).to.be.above(1);
    expect(u().select('li')[0].nodeName).to.equal('LI');
  });

  it("can select by id", function(){
    expect(u().select('#base')[0]).to.not.equal(null);
    expect(u().select('#base')[0].nodeName).to.equal('DIV');
  });

  it("can select by complex selector", function() {
    expect(u().select('.brand a').length).to.equal(1);
    expect(u().select('.brand a')[0].nodeName).to.equal('A');
  });

  it("can create one element", function(){
    expect(u('<div>').length).to.equal(1);
    expect(u('<div>').first().nodeName).to.equal('DIV');
  });

  it("can create many elements", function(){
    expect(u('<p></p><p></p>').length).to.equal(2);
    expect(u('<p></p><p></p>').first().nodeName).to.equal('P');
  });

  it("can have spaces before or after", function(){
    expect(u(' <p></p><p></p>').length).to.equal(2);
    expect(u('<p></p><p></p>').first().nodeName).to.equal('P');

    expect(u('<p></p><p></p> ').length).to.equal(2);
    expect(u('<p></p><p></p> ').first().nodeName).to.equal('P');
  });

  it("can create table stuff", function() {
    size('<table>Hello</table>', 1);
    size('<th>Hello</th>', 1);
    size('<tr>Hello</tr>', 1);
    size('<td>Hello</td>', 1);
  });

  it("can create list stuff", function() {
    size('<ul><li>A</li></ul>', 1);
    size('<li>B</li>', 1);
  });
});
