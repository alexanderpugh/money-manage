const Sequelize = require('sequelize');
const path = require('path');

const { DB_DIALECT, DB_URL } = require('./keys');

const config = {
  dialect: DB_DIALECT
};

if (DB_DIALECT === 'sqlite') {
  config.storage = path.resolve(__dirname, '../data/data.sqlite');
} else {
  config.dialectOptions = {
    ssl: true
  };
}

const connection = new Sequelize(DB_URL, config);

const db = {};
const force = false;

db.Sequelize = Sequelize;
db.connection = connection;

db.users = require('../models/users.model')(connection);
db.expenseSets = require('../models/expenseSets.model')(connection);
db.expenses = require('../models/expenses.model')(connection);
db.salaryAssessment = require('../models/salaryAssessment.model')(connection);

db.expenses.belongsTo(db.expenseSets);
db.expenses.belongsTo(db.users);
db.salaryAssessment.belongsTo(db.users);
db.expenseSets.hasMany(db.expenses);
db.expenseSets.belongsTo(db.users);
db.users.hasMany(db.expenseSets);
db.users.hasOne(db.salaryAssessment);

db.users.sync({ force });
db.expenseSets.sync({ force });
db.expenses.sync({ force });
db.salaryAssessment.sync({ force });

module.exports = db;
