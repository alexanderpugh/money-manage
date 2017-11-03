const _ = require('lodash');

const db = require('../config/db.js');
const valueValid = require('../utilities/valueValid');
const saltValue = require('../utilities/saltValue');
const calculateSalary = require('../utilities/calculateSalary');

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
    const searchedUser = await db.users.findOne({ where: { username } });

    return Boolean(searchedUser);
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch a users details
 *
 * @param {object} param
 * @param {string} param.userId
 * @return {object}
 */
module.exports.getDetails = async ({ userId }) => {
  try {
    const searchedUser = await db.users.findOne({ where: { id: userId } });

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

/**
 * Update a users details
 *
 * @param {string} param.userId
 * @param {string} param.firstName
 * @param {string} param.lastName
 * @param {date} param.dob
 * @param {string} param.studentLoanPlan
 * @return {object}
 */
module.exports.updateDetails = async ({ userId, firstName, lastName, dob, studentLoanPlan }) => {
  try {
    return await db.users.update({ firstName, lastName, dob, studentLoanPlan }, {
      where: { id: userId }
    });

  } catch (error) {
    throw error;
  }
};

/**
 * Fetch a users salary assessment
 *
 * @param {object} param
 * @param {string} param.userId
 * @return {object}
 */
module.exports.fetchSalaryAssessment = async ({ userId }) => {
  try {
    const assessment = await db.salaryAssessment.findOne({ where: { userId } });

    return assessment;
  } catch (error) {
    throw error;
  }
};

/**
 * Update / create a users salary assessment
 *
 * @param {object} param
 * @param {string} param.userId
 * @param {number} param.incomeYearly
 * @return {object}
 */
module.exports.updateSalaryAssessment = async ({ userId, incomeYearly, assessmentId }) => {
  try {
    const userDetails = await db.users.findOne({ where: { id: userId } });
    const calculatedAssessment = calculateSalary({
      incomeYearly: _.toNumber(incomeYearly),
      studentLoanPlan: userDetails.studentLoanPlan
    });

    return await db.salaryAssessment.upsert({
      ...calculatedAssessment,
      userId,
      incomeYearly: _.toNumber(incomeYearly),
      id: assessmentId
    });
  } catch (error) {
    throw error;
  }
};
