const Sequelize = require('sequelize');

module.exports = (connection) => {
  const ExpenseSets = connection.define('expenseSets', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      required: true
    },
    description: {
      type: Sequelize.STRING,
      required: true
    },
    totalYearly: {
      type: Sequelize.DECIMAL,
      required: false,
      defaultValue: 0
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false
    }
  });

  return ExpenseSets;
};
