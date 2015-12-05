/**
 * u.setOptions(where, options);
 *
 * Define some options for the plugins of Umbrella JS
 * @param String where the name of the plugin
 * @param Object options the object's options
 * Example:
 * 
 *   u.setOptions('track', { url: "/trackb/" });
 *
 * Note: do NOT attempt to access u.options straight away
 */
u.setOptions = function(where, options){
  
  // Default options for each plugin is empty object
  u.options[where] = u.options[where] || {};
  
  // Loop through the outside functions
  for(var key in options) {
    
    // Set each of them
    u.options[where][key] = options[key];
    }
  };
