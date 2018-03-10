const nunjucks = require('nunjucks');
const path = require('path');

const decimal = require('../utilities/decimal');

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
  config.addFilter('monthly', value => decimal(value / 12));

  /** display a yearly amount by weekly amounts */
  config.addFilter('weekly', value => decimal(value / 52));

  /** display a yearly amount by daily amounts */
  config.addFilter('daily', value => decimal(value / 365.25));
};
