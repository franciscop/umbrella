// [INTERNAL USE ONLY]
// Select the adecuate part from the context
u.prototype.select = function (parameter, context) {
  // Allow for spaces before or after
  parameter = parameter.replace(/^\s*/, '').replace(/\s*$/, '');

  if (/^</.test(parameter)) {
    return u().generate(parameter);
  }

  return (context || document).querySelectorAll(parameter);
};
