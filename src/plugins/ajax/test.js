
u('form.login').ajax(function(e){
  console.log("Success");
}, function(e){
  console.log("Error");
}, function(e){
  console.log("Before");
});

u('form.login').trigger('submit');
