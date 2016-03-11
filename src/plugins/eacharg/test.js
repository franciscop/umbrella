describe(".eacharg([], function(){})", function() {
    
  it("should be defined", function() {
    expect(typeof base.each).to.equal('function');
  });
  
  it("no data, everything is is okay", function(){
    base.eacharg();
    base.eacharg("");
    base.eacharg("", function(){});
    base.eacharg(false);
    base.eacharg(false, function(){});
    base.eacharg(undefined);
    base.eacharg(undefined, function(){});
    base.eacharg(function(){ return false; });
    base.eacharg(function(){ return false; }, function(){});
  });
  
  it("only first arguments gives an error", function(){
    expect(base.eacharg.bind(base, ["a"])).to.throw();
  });
  
  it("has the right this", function(){
    u(['a', 'b']).eacharg(['a'], function(node, arg){
      expect(this instanceof u).to.equal(true);
    });
  });
  
  it("returns an umbrella object", function(){
    var ret = u(['a', 'b']).eacharg(['a'], function(){});
    expect(ret instanceof u).to.equal(true);
  });
  
  
  // STRING
  describe('loops over an string', function(){
    
    it("accepts commas as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A,B,', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
      
    it("accepts space as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A B ', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts commas and spaces as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A, B, ', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A\nB\n', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
  });
  
  
  // ARRAY
  describe("loops over an array", function(){
    
    it("accepts an array of elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A', 'B', ''], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with space-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A B '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with comma-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A,B,'], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with comma and space separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A, B, '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts an array with other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A\nB\n'], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with a combination", function() {
      var values = ['aA', 'aB', 'aC', 'bA', 'bB', 'bC'];
      u(['a', 'b']).eacharg(['A, B', 'C, '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
  });
  
  
  // FUNCTION
  describe("loops over a function return", function(){
    
    var called = false;
    beforeEach(function(){
      called = false;
    });
    
    it("accepts commas as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A,B,'; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts space as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A B '; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts commas and spaces as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A, B, '; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A\nB\n'; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts an array of elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A', 'B', '']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with space-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A B ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with comma-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A,B,']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with comma and space separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A, B, ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts an array with other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A\nB\n']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with a combination", function() {
      var values = ['aA', 'aB', 'aC', 'bA', 'bB', 'bC'];
      u(['a', 'b']).eacharg(function(){ return ['A, B', 'C, ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
  });
});