// [INTERNAL USE ONLY]
// Generate a fragment of HTML. This irons out the inconsistences
u.prototype.generate = function (html) {
  // Table elements need to be child of <table> for some f***ed up reason
  var table;
  if (/^\s*<tr[> ]/.test(html)) {
    table = document.createElement('table');
    return u(table).html(html).children().children().nodes;
  } else if (/^\s*<t(h|d)[> ]/.test(html)) {
    table = document.createElement('table');
    return u(table).html(html).children().children().children().nodes;
  } else if (/^\s*</.test(html)) {
    return u(document.createElement('div')).html(html).children().nodes;
  } else {
    return document.createTextNode(html);
  }
};
