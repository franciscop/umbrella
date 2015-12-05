/**
 * u.status = function(activate, deactivate, has, name){
 *
 * Define a status that can be used in the code. Example:
 * u.status('activate', 'deactivate', 'isActive', 'active')
 * 
 * Then you can do this along your code:
 * if(u(".article").isActive())
 *   u(".article").deactivate();
 */
u.status = function(activate, deactivate, has, name){
  name = name || activate;
  
  if (activate) {
    u.prototype[activate] = function() {
      this.addClass(name);
      return this;
      };
    }
  
  if (deactivate) {
    u.prototype[deactivate] = function() {
      this.removeClass(name);
      return this;
      };
    }
  
  if (has) {
    u.prototype[has] = function() {
      return this.hasClass(name);
      };
    }
  };
