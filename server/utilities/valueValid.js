/**
 * test that a string value matches a regex
 *
 * @param {regex} rule - the test regex rule
 * @param {string} value - the value being searched for
 * @return {boolean}
 */
module.exports = (rule, value) => rule.test(value);
