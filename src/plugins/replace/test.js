// Testing the replace plugin main file
describe(".replace(newValue)", function() {
  
 it("should be a function", function() {
    expect(typeof base.replace).to.equal('function');
  });
    
 it("replace the single node string case", function() { 
    base.append('<a class="save">Save</a>');

    base.find('a.save').replace('<button class="update">Update<button>');
    size('.base > button.update', 1);
 
    base.find('button.update').remove();
 });
    
 it("replace multi nodes string case", function() { 
    base.append('<a class="save">Save</a><a class="save">Save</a>');

    base.find('a.save').replace('<button class="update">Update<button>');
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
