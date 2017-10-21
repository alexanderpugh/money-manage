/**
 * Get a 2 diget decimal value from a number
 *
 * @param {number} value - the floating point number value
 * @return {number} the 2 point decimal value
 * @example
 *
 * decimal(1.111111) === 1.11
 */
module.exports = value => Number(Math.round(value + 'e' + 2) + 'e-' + 2);
