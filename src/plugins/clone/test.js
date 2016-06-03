  // Testing the main file
describe(".clone(options)", function() {
  afterEach(function(){
    u('.container').remove();
  });

  describe("clone() nodes without events", function() {
    beforeEach(function() {
      base.append('<div class="container">\
        <div class="testClone1">Hello</div>\
        <div class="cloneDestination">Goodbye</div>\
      </div>');
    });

    it("should be a function", function() {
      isFn(base.clone);
    });

    it("should clone a single simple node", function() {
      u('.cloneDestination').append(u('.testClone1'));
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
      base.append('<div class="container">\
        <div class="testClone1">Hello</div>\
        <div class="testClone2">\
          <div class="testCloneWithEvents1">\
            click, touch, etc\
          </div>\
        </div>\
        <div class="cloneDestination"></div>\
      </div>');
    });

    it("should clone a node and its events by default", function(done) {
      u('<div>').on('click', function(e){
        u(e.target).off('click');
        done();
      }).clone().trigger('click').trigger('click');
    });

    it("should clone nested nodes and their events by default", function(done) {
      u('.testCloneWithEvents1').on('click', function() { done(); });
      u('.cloneDestination').append(u('.testClone2'));
      u('.cloneDestination > .testClone2 > .testCloneWithEvents1').trigger('click');
    });
  });



  describe("clone() form elements", function() {
    before(function() {
      u('form.clone [type=text]').first().value = 'test input';
      u('form.clone [type=checkbox]').first().checked = true;
      u('form.clone [type=radio]').first().checked = true;
      u('form.clone select').first().value = 'b';
      u('form.clone textarea').first().value = 'test textarea';
    });

    afterEach(function(){
      u('.destination').html("");
    });

    it("has the correct values initially", function(){
      expect(u('form.clone [type=text]').first().value).to.equal('test input', 'beforeClone');
      expect(u('form.clone [type=checkbox]').first().checked).to.equal(true, 'beforeClone');
      expect(u('form.clone [type=radio]').first().checked).to.equal(true, 'beforeClone');
      expect(u('form.clone select').first().value).to.equal('b', 'beforeClone');
      expect(u('form.clone textarea').first().value).to.equal('test textarea', 'beforeClone');
    });


    it ("clones a full form correctly", function(){
      u('.destination').append(u('form.clone'));
      expect(u('.destination [type=text]').length).to.equal(1);
      expect(u('.destination [type=text]').first().value).to.equal('test input');
      expect(u('.destination [type=checkbox]').first().checked).to.equal(true);
      expect(u('.destination [type=radio]').first().checked).to.equal(true);
      expect(u('.destination select').first().value).to.equal('b');
      expect(u('.destination textarea').first().value).to.equal('test textarea');
    });

    it ("should clone a text input and its value by default", function() {
      u('.destination').append(u('form.clone [type=text]'));
      expect(u('.destination [type=text]').first().value).to.eq('test input');
    });

    it ("should clone a checkbox input and its value by default", function() {
      u('.destination').append(u('form.clone [type=checkbox]'));
      expect(u('.destination [type=checkbox]').first().checked).to.eq(true);
    });

    it ("should clone a radio input and its value by default", function() {
      u('.destination').append(u('form.clone [type=radio]'));
      expect(u('.destination [type=radio]').first().checked).to.eq(true);
    });


    it ("should clone a textarea input and its value by default", function() {
      u('.destination').append(u('form.clone textarea'));
      expect(u('.destination textarea').first().value).to.eq('test textarea');
    });

    it ("should clone a select input and its value by default", function() {
      u('.destination').append(u('form.clone select'));
      expect(u('.destination select').first().value).to.eq('b');
    });
  });




  describe(".clone() and node data attributes", function() {
    beforeEach(function() {
      base.append('<div class="container"><div class="testCloneData" data-foo="bar"></div><div class="destination"></div></div>');
    });

    it("should clone node data attributes", function() {
      u('.destination').append(u('.testCloneData'));
      expect(u('.destination .testCloneData').data('foo')).to.eq('bar');
    });
  });
});
