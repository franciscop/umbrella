'use strict';

describe('.off()', function() {

  const listener = function() {
    throw 'Shouldn\'t be called';
  };

  before(function() {
    base.append('<ul><li class="off-single-test">1</li>'
    + '<li class="off-multiple-test">2</li>'
    + '<li class="off-multiple-test">3</li>'
    + '</ul>');
  });

  it('should be defined', function() {
    expect(typeof base.off).to.equal('function');
  });

  it('removes event from single element', function() {
    u('.off-single-test').on('click', listener);
    u('.off-single-test').off('click', listener);
    u('.off-single-test').trigger('click');
  });

  it('removes event from multiple elements', function() {
    u('.off-multiple-test').on('click', listener);
    u('.off-multiple-test').off('click', listener);
    u('.off-multiple-test').trigger('click');
  });

  it('removes multiple events', function() {
    u('.off-multiple-test').on('click mouseover', listener);
    u('.off-multiple-test').off('click mouseover', listener);
    u('.off-multiple-test').trigger('mouseover');
  });
});
