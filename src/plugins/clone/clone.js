u.prototype.clone = function clone (deepDataAndEvents) {
  return this.map(function (node, i) {
    var cloneWithEvents = node.cloneNode(true);
    var event;
    var j;

    // Copy any existing events
    if (node._e) {
      var nodeEventsObject = node._e;
      for (event in nodeEventsObject) {
        for (j = 0; j < nodeEventsObject[event].length; ++j) {
          u(cloneWithEvents).on(event, nodeEventsObject[event][j]);
        }
      }
    }
    return cloneWithEvents;
  });
};
