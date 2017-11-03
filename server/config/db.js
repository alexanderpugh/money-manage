const Sequelize = require('sequelize');
const path = require('path');

const connection = new Sequelize('moneymanage', 'root', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: path.resolve(__dirname, '../data/data.sqlite')
});

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
