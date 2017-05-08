// Testing the main file
describe(".empty()", function() {

  beforeEach(function() {
    base.append('\
      <div class="empty-test"> \
        <p></p> \
        <p></p> \
      </div> \
    ');

    expect(u('.empty-test').length).to.equal(1);
    expect(u('.empty-test p').length).to.equal(2);
  });

  afterEach(function() {
    u('.empty-test').remove();
  });


  it("should be defined", function() {
    expect(typeof base.empty).to.equal('function');
  });

  it("can be called even without any node", function() {
    expect(u('.empty-test div').length).to.equal(0);
    u('.empty-test div').empty();
  });

  it("will clean text-only nodes", function() {
    u('.empty-test').html('Hello world');
    expect(u('.empty-test').html()).to.equal('Hello world');
    u('.empty-test').empty();
    expect(u('.empty-test').html()).to.equal('');
  });

  it("will clean mixed nodes", function() {
    u('.empty-test').html('Hello world!<p>How <strong>are you</strong>?</p>');
    u('.empty-test').empty();
    expect(u('.empty-test').html()).to.equal('');
  });

  it("should return an instance of umbrella with the empty nodes", function() {
    var result = u('.empty-test').empty();

    expect(result).to.be.instanceof(u);
    expect(result.nodes).to.have.length(1);
    expect(result.attr('class')).to.equal('empty-test');
  });

  it("empty element", function() {
    u('.empty-test').empty();
    expect(u('.empty-test p').length).to.equal(0);
  });
});
