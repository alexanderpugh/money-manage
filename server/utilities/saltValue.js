const md5 = require('md5');

const { AUTH_SALT_1, AUTH_SALT_2 } = require('../config/keys');

/**
 * Salt a value for use with passwords
 *
 * @param {string} value - the original string for salting
 * @return {string} the salted value
 */
module.exports = value => {
  return md5(`${AUTH_SALT_1}${value}${AUTH_SALT_2}`);
}
