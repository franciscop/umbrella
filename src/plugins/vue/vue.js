// Reactive Components for Modern Web Interfaces
u.prototype.vue = function(opt){
	opt = opt || {};
  opt.el = opt.el || this.first();
  return new Vue(opt);
};
