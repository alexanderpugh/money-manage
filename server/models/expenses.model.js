const Sequelize = require('sequelize');

/**
 * Expenses model config function
 *
 * @param {object} connection - the Sequalize connection object
 * @return {object} the expenses model config object
 */
module.exports = (connection) => {
  const Expenses = connection.define('expenses', {
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
      required: false
    },
    expenseSetId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false
    }
  });

  return Expenses;
};
