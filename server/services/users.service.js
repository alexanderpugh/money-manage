const db = require('../config/db.js');
const valueValid = require('../utilities/valueValid');
const saltValue = require('../utilities/saltValue');

const passwordRuleRegX = /^([a-zA-Z0-9_-]){3,10}$/;

/**
 * User signup
 *
 * @param {object} param
 * @param {string} param.username
 * @param {string} param.password
 * @return {object} - the user object
 */
module.exports.signup = async ({ username, password }) => {
  try {
    if (!valueValid(passwordRuleRegX, password)) {
      throw new Error('ERROR: the provided password is invalid');
    }

    const insertedUser = await db.users.create({
      username,
      password: saltValue(password)
    });

    return insertedUser;

  } catch (error) {
    throw error;
  }
};

/**
 * User login
 *
 * @param {object} param
 * @param {string} param.username
 * @param {string} param.password
 * @return {object} - the user object
 */
module.exports.login = async ({ username, password }) => {
  try {
    if (!valueValid(passwordRuleRegX, password)) {
      throw new Error('ERROR: the provided password is invalid');
    }

    const searchedUser = await db.users.findOne({
      where: {
        username,
        password: saltValue(password)
      }
    });

    if (!searchedUser) {
      throw new Error('ERROR: the searched user does not exist');
    }

    return searchedUser;

  } catch (error) {
    throw error;
  }
};

/**
 * Check if a username exists
 *
 * @param {object} param
 * @param {string} param.username
 * @return {boolean}
 */
module.exports.userExists = async ({ username }) => {
  try {
    const searchedUser = await db.users.findOne({
      where: { username }
    });

    return Boolean(searchedUser);

  } catch (error) {
    throw error;
  }
};

module.exports.getDetails = async ({ userId }) => {
  try {
    const searchedUser = await db.users.findOne({
      where: {
        id: userId
      }
    });

    return {
      firstName: searchedUser.firstName,
      lastName: searchedUser.lastName,
      dob: searchedUser.dob,
      studentLoanPlan: searchedUser.studentLoanPlan
    };

  } catch (error) {
    throw error;
  }
};

module.exports.updateDetails = async ({ userId, firstName, lastName, dob, studentLoanPlan }) => {
  try {
    return await db.users.update({ firstName, lastName, dob, studentLoanPlan }, {
      where: {
        id: userId
      }
    });

  } catch (error) {
    throw error;
  }
};
