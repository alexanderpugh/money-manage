const logger = require('heroku-logger');

require('./config/jsExtensions');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port);
logger.info(`Listening at port ${port}`);
