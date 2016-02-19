
describe(".args(arguments)", function() {
  
  it("should be defined", function() {
    expect(typeof u().args).to.equal('function');
  });
  
  it("accepts zero parameters", function(){
    expect(u().args()).to.deep.equal([]);
  });
  
  it("accepts falsy", function(){
    expect(u().args(null)).to.deep.equal([]);
    expect(u().args(false)).to.deep.equal([]);
    expect(u().args(undefined)).to.deep.equal([]);
    expect(u().args("")).to.deep.equal([]);
    expect(u().args([])).to.deep.equal([]);
  });
  
  it("doesn't accept two parameters", function(){
    expect(u().args('a', 'b')).to.deep.equal(['a']);
  });
  
  it("accepts an umbrella instance", function(){
    expect(u().args(u(['a', 'b']))).to.deep.equal(['a', 'b']);
    expect(u().args(u(['a', 'b']).nodes)).to.deep.equal(['a', 'b']);
  });
  
  
  describe("works with a single string", function(){
    it("single string", function(){
      expect(u().args('a')).to.deep.equal(['a']);
    });
    
    it("splits a string with space", function(){
      expect(u().args('a b ')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args('a,b,')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args('a, b, ')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with enter", function(){
      expect(u().args('a\nb\t')).to.deep.equal(['a', 'b']);
    });
  });
  
  
  describe("works with different arrays", function(){
    
    it("single element", function(){
      expect(u().args(['a'])).to.deep.equal(['a']);
    });
    
    it("single element", function(){
      expect(u().args(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c']);
    });
    
    it("splits a string with space", function(){
      expect(u().args(['a b', 'c d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args(['a,b', 'c,d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args(['a, b', 'c, d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with whitespaces", function(){
      expect(u().args(['a\nb', 'c\td'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });
  
  
  describe("works with a function", function(){
    
    it("single element", function(){
      expect(u().args(['a'])).to.deep.equal(['a']);
    });
    
    it("single element", function(){
      expect(u().args(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c']);
    });
    
    it("splits a string with space", function(){
      expect(u().args(['a b', 'c d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args(['a,b', 'c,d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args(['a, b', 'c, d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with whitespaces", function(){
      expect(u().args(['a\nb', 'c\td'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });
  
  
});