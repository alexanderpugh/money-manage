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

  config.addGlobal('SITE_URL', 'http://localhost:3000');

  config.addGlobal('IN_PRODUCTION', process.env.NODE_ENV !== 'development');

  config.addFilter('decimal', value => decimal(value));

  config.addFilter('date', date => date.formatForHTML());
};
