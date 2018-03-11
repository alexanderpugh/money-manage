const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const db = require('./db');

const force = false;

const store = new SequelizeStore({
  db: db.connection
});

store.sync({ force });

module.exports = store;
