const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const db = require('./db');

const store = new SequelizeStore({
  db: db.connection
});

store.sync();

module.exports = store;
