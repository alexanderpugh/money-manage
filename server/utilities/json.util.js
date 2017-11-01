/**
 * Check if a string is valid json
 *
 * @param {string} json - input json string
 * @return {boolean}
 */
const isValid = json => {
  try {
    return Boolean(JSON.parse(json));
  } catch (error) {
    return false;
  }
};

module.exports = {
  isValid
};
