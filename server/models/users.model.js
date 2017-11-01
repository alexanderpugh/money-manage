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
    },
    firstName: {
      type: Sequelize.STRING,
      defaultValue: 'First',
      allowNull: true,
      required: false
    },
    lastName: {
      type: Sequelize.STRING,
      defaultValue: 'Last',
      allowNull: true,
      required: false
    },
    dob: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      allowNull: true,
      required: false
    }
  });

  return Users;
};
