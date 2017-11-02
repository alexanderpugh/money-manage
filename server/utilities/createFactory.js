/**
 * Create a function that returns an object with default values
 *
 * @param {object} defaults - a default object
 * @return {function}
 */
module.exports = defaults => () => ({ ...defaults });
