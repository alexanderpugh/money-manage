const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const compression = require('compression');

const nunjucksConfig = require('./config/nunjucks.config');
const store = require('./config/sessionStore');
const { SESSION_SECRET } = require('./config/keys');

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
  secret: SESSION_SECRET,
  store,
  resave: false,
  proxy: true
}));
app.use(compression());

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
