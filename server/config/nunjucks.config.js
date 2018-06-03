const nunjucks = require('nunjucks');
const path = require('path');

const decimal = require('../utilities/decimal');
const {
  ANNUAL_MONTHS,
  ANNUAL_WEEKS,
  ANNUAL_WORKING_DAYS
} = require('../config/constants');

/**
 * nunjucks config function
 *
 * @param {object} param
 * @param {object} param.app - the express app object
 */
module.exports = ({ app }) => {
  const config = nunjucks.configure(path.resolve(__dirname, '../views'), {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true
  });

  config.addGlobal('IN_PRODUCTION', process.env.NODE_ENV !== 'development');

  config.addFilter('decimal', value => decimal(value));

  config.addFilter('date', date => date.formatForHTML());

  /** display a yearly amount by monthly amounts */
  config.addFilter('monthly', value => decimal(value / ANNUAL_MONTHS));

  /** display a yearly amount by weekly amounts */
  config.addFilter('weekly', value => decimal(value / ANNUAL_WEEKS));

  /** display a yearly amount by daily amounts */
  config.addFilter('daily', value => decimal(value / ANNUAL_WORKING_DAYS));
};
