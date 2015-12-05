/**
 * isJson(json)
 * 
 * Check wether the passed string is valid json or not
 * @param String json the string to check
 * @return boolean true if the string is json
 */
function isJson(jsonString){
  try {
    var o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns 'null', and typeof null === "object", 
    // so we must check for that, too.
    if (o && typeof o === "object" && o !== null) {
        return o;
      }
    }
  catch (e) {}

  return false;
  }
