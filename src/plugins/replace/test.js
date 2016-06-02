// Based on
if(u(document.createDocumentFragment()).append('<div>').children().length == 0) {
  Object.defineProperty(DocumentFragment.prototype, "children", {"get" : function() {
    var arr = [],
      child = this.firstChild;

    while (child) {
      if (child.nodeType == 1) arr.push(child);
      child = child.nextSibling;
    }

    return arr;
  }});
};


// Testing the replace plugin main file
describe(".replace(newValue)", function() {

  afterEach(function(){
    base.find('button.update').remove();
  });

  it("should be a function", function() {
    expect(typeof base.replace).to.equal('function');
  });

  it("replace the single node string case", function() {
    base.append('<a class="save">Save</a>');

    base.find('a.save').replace('<button class="update">Update</button>');
    size('.base > button.update', 1);

    base.find('button.update').remove();
  });

  it("returns the correct values", function(){
    base.append('<a class="save">Save</a>');
    var button = base.find('a.save').replace('<button class="update">Update</button>').first();
    expect(button.nodeName).to.equal('BUTTON');
    expect(u(button).closest('body').length).to.equal(1);


    base.find('button.update').remove();
  });

  it("replace multi nodes string case", function() {
    base.append('<a class="save">Save</a><a class="save">Save</a>');

    base.find('a.save').replace('<button class="update">Update</button>');
    size('.base > button.update', 2);

    base.find('button.update').remove();
  });

  it("replace the single node function case", function() {
    base.append('<a class="save">Save</a>');

    base.find('a.save').replace(function(link){
      return '<button class="update">' + link.innerHTML  + '</button>';
    });
    size('.base > button.update', 1);

    base.find('button.update').remove();
  });

  it("replace multi nodes function case", function() {
    base.append('<a class="save">Save</a><a class="save">Save</a>');

    base.find('a.save').replace(function(link){
      return '<button class="update">' + link.innerHTML  + '</button>';
    });
    size('.base > button.update', 2);

    base.find('button.update').remove();
  });
});
