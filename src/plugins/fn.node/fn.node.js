/**
 * node(selector)
 * 
 * Return the first matched HTML NODE; only for the brave
 * @param String selector same as in u(selector)
 * @return htmlNode the first matched node
 */
function node(selector) {
  
  // Get the first from Umbrella JS
  return u(selector).first();
  }

