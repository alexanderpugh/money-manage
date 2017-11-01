/**
 * Format a Date object for html inputs
 *
 * @return {string}
 * @example - new Date().formatForHTML === '2001-12-01'
 */
Date.prototype.formatForHTML = function () {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
  (mm > 9 ? '' : '0') + mm,
  (dd > 9 ? '' : '0') + dd
  ].join('-');
};
