/**
 * parseJson(json)
 * 
 * Parse JSON without throwing an error
 * @param String json the string to check
 * @return object from the json or false
 */
function parseJson(jsonString){
  try {
    var o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking
    // so we must check for that, too.
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}

  return false;
}
