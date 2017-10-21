const md5 = require('md5');

/**
 * Salt a value for use with passwords
 *
 * @param {string} value - the original string for salting
 * @return {string} the salted value
 */
module.exports = value =>  {
  const saltStart = 'ApplE';
  const saltEnd = 'OrangE';

  return md5(`${saltStart}${value}${saltEnd}`);
}
