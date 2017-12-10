const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

require('./config/jsExtensions');

const nunjucksConfig = require('./config/nunjucks.config');

const homeController = require('./controllers/Home');
const expensesController = require('./controllers/Expenses');
const registrationController = require('./controllers/Registration');
const salaryCalcController = require('./controllers/SalaryCalc');
const settingsController = require('./controllers/Settings');
const sessionCheckMiddleware = require('./middleware/sessionCheck.middleware');
const notFoundMiddleware = require('./middleware/404.middleware');

const app = express();

app.set('trust proxy', 1);
app.use(session({
  secret: 'session secret',
  resave: true
}));

nunjucksConfig({ app });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(registrationController.base, registrationController.router);
app.use(sessionCheckMiddleware);
app.use(homeController.base, homeController.router);
app.use(expensesController.base, expensesController.router);
app.use(salaryCalcController.base, salaryCalcController.router);
app.use(settingsController.base, settingsController.router);
app.use(notFoundMiddleware);

module.exports = app;
