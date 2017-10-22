/**
 * @param {object} defaults - a default object
 * @return {function}
 */
module.exports = defaults => () => Object.assign({}, defaults);
