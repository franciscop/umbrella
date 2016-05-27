// Testing the main file
describe("clone() nodes without events", function() {
  beforeEach(function() {
    base.append('<div class="container"><div class="testClone1">Hello</div><div class="cloneDestination">Goodbye</div></div>');
    /*<div class="container">
        <div class="hello">Hello</div>
        <div class="goodbye">Goodbye</div>
      </div>*/
  });

  afterEach(function(){
    u('.container').remove();
  });

  it("should be a function", function() {
    expect(typeof base.clone).to.equal('function');
  });

  it("should clone a single simple node", function() {
    var clone = u('.testClone1').clone();

    u('.cloneDestination').append(clone);

    size('.container > .testClone1', 1);
    size('.cloneDestination > .testClone1', 1);
    size('.testClone1', 2);
    expect(u('.cloneDestination > .testClone1').text()).to.eq('Hello');
  });

  it("should clone nested nodes", function() {
    u('.testClone1').append('<div class="testClone2">Hi</div>');

    size('.container > .testClone1 > .testClone2', 1);
    expect(u('.testClone2').text()).to.eq('Hi');
  });
});


describe("clone() nodes with events", function() {
  beforeEach(function() {
    base.append('<div class="container"><div class="testClone1">Hello</div><div class="testClone2"><div class="testCloneWithEvents1">Hello</div></div><div class="cloneDestination"></div></div>');
    /*<div class="container">
        <div class="testClone1">Hello</div>
        <div class="testClone2">
          <div class="testCloneWithEvents1">
            click, touch, etc
          </div>
        </div>
        <div class="cloneDestination"></div>
      </div>*/
  });

  afterEach(function(){
    u('.container').remove();
  });


  it("should clone a node and its events by default", function(done) {
    u('.testClone1').on('click', function() { done(); });

    var clone = u('.testClone1').clone();

    u('.cloneDestination').append(clone);

    u('.cloneDestination > .testClone1').trigger('click');
  });

  it("should clone nested nodes and their events by default", function(done) {
    u('.testCloneWithEvents1').on('click', function() { done(); });

    var clone = u('.testClone2').clone();

    u('.cloneDestination').append(clone);

    // expect(u('.cloneDestination > .testClone2 > .testCloneWithEvents1').text()).to.eq('Hello');
    u('.cloneDestination > .testClone2 > .testCloneWithEvents1').trigger('click');
  });
});
