const path = require('path');
const Sequelize = require('sequelize');

const dbConfig = require('./db.json');

const connection = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    storage: path.resolve(__dirname, '../data/data.sqlite')
  }
);

module.exports = connection;
