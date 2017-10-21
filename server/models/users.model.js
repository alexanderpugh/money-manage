const Sequelize = require('sequelize');

module.exports = (connection) => {
  const Users = connection.define('users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      required: true,
      isUnique: true
    },
    password: {
      type: Sequelize.STRING,
      required: true
    }
  });

  return Users;
};
