// Adds a resize event listener to the window object
u.prototype.resize = function (fn) {
  if (fn) {
    window.addEventListener('resize', fn);
  }
};
