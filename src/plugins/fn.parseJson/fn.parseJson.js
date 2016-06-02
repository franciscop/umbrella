// [INTERNAL USE ONLY]
// Parse JSON without throwing an error
/* eslint-disable no-unused-vars*/
function parseJson (jsonString) {
  try {
    var o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking
    // so we must check for that, too.
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {}

  return false;
}
/* eslint-enable no-unused-vars*/
