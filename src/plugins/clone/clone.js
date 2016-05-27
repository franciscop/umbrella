u.prototype.clone = function clone( deepDataAndEvents ) {
	return this.join(function(node, i) {
            var cloneWithEvents = node.cloneNode(true),
                event, j;
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


/*function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	var cloneWithEvents = src.cloneNode(true),
          event, i;

	if ( dest.nodeType !== 1 ) {
		return;
	}

  // Copy any existing events
  if (src._e) {
    var nodeEventsObject = src._e;
    for (event in nodeEventsObject) {
      for (i = 0; i < nodeEventsObject[event].length; ++i) {
        u(cloneWithEvents).on(event, nodeEventsObject[event][i]);
      }
    }  
  }
}*/