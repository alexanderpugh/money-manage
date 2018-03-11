const _ = require('lodash');

const db = require('../config/db.js');
const utils = require('./utilities/expenses.util');

/**
 * Create a new expense set
 *
 * @param {object} param
 * @param {string} param.name - the expense set name
 * @param {string} param.description - the expense set description
 * @param {string} param.userId - the id of the expense set owner
 * @return {object} - the newly created expense set
 */
const create = async ({ name, description, totalYearly = 0.00, userId }) => {
  try {
    const newExpenseSet = await db.expenseSets.create({
      name,
      description,
      userId,
      totalYearly: _.toNumber(totalYearly)
    });

    return newExpenseSet;
  } catch (error) {
    throw error;
  }
};

/**
 * Edit an existing expense set
 *
 * @param {object} param
 * @param {string} param.name - the expense set name
 * @param {string} param.description - the expense set description
 * @param {string} param.userId - the id of the expense set owner
 * @param {number} param.totalYearly - the total cost for a year
 * @param {string} param.expenseSetId - the id of the expense set
 * @return {object} - the edited expense set
 */
const edit = async ({ name = null, description = null, userId, totalYearly = null, expenseSetId }) => {
  const updatedInputs = { expenseSetId, userId };
  if (name) {
    updatedInputs.name = name;
  }
  if (description) {
    updatedInputs.description = description;
  }
  if (totalYearly) {
    updatedInputs.totalYearly = _.toNumber(totalYearly)
  }

  try {
    const updated = await db.expenseSets.update(updatedInputs, {
      where: { userId, id: expenseSetId }
    });

    return updated.length === 1 ? { id: expenseSetId } : null;
  } catch (error) {
    throw error;
  }
};

/**
 * Add to the expense sets total annual cost
 *
 * @param {object} param
 * @param {number} param.value - the amount being added
 * @param {string} param.userId - the id of the expense set owner
 * @param {string} param.expenseSetId - the id of the expense set
 * @return {object} - the newly edited expense set
 */
const addToTotalYearly = async ({ value, userId, expenseSetId }) => {
  const updatedInputs = {};

  try {
    const current = await db.expenseSets.findOne({
      where: { userId, id: expenseSetId }
    });

    const updated = await db.expenseSets.update({
      totalYearly: _.toNumber(current.totalYearly) + _.toNumber(value)
    }, {
        where: { userId, id: expenseSetId }
      });

    return updated;
  } catch (error) {
    throw error;
  }
};

/**
 * Edit the expense sets total annual cost
 *
 * @param {object} param
 * @param {number} param.originalValue - the value before changing
 * @param {number} param.newValue - the amount being being changed to
 * @param {string} param.userId - the id of the expense set owner
 * @param {string} param.expenseSetId - the id of the expense set
 * @return {object} - the edited created expense set
 */
const editTotalYearly = async ({ originalValue, newValue, userId, expenseSetId }) => {
  const updatedInputs = {};

  try {
    const current = await db.expenseSets.findOne({
      where: { userId, id: expenseSetId }
    });

    const updated = await db.expenseSets.update({
      totalYearly: (_.toNumber(current.totalYearly) - _.toNumber(originalValue)) + _.toNumber(newValue)
    }, {
        where: { userId, id: expenseSetId }
      });

    return updated;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch a single expense set
 *
 * @param {object} param
 * @param {string} param.userId - the id of the expense set owner
 * @param {string} param.expenseSetId - the id of the expense set
 * @return {object} - the fetched expense set
 */
const fetchOne = async ({ userId, expenseSetId }) => {
  try {
    const fetchedExpenseSet = await db.expenseSets.findOne({
      where: { userId, id: expenseSetId }
    });

    return fetchedExpenseSet;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch multiple expense sets
 *
 * @param {object} param
 * @param {string} param.userId - the id of the expense set owner
 * @return {array} - the fetched expense sets
 */
const fetchAll = async ({ userId }) => {
  try {
    const fetchedExpenseSets = await db.expenseSets.findAll({
      where: { userId },
      include: {
        model: db.expenses
      }
    });

    return fetchedExpenseSets;
  } catch (error) {
    throw error;
  }
};

/**
 * Get the total yearly cost of all sets
 *
 * @param {string} param.userId - the id of the expense sets owner
 * @return {number} - the total yearly for all sets
 */
const getTotalYearlyTotal = async ({ userId }) => {
  try {
    const fetchedExpenseSets = await db.expenseSets.findAll({
      where: { userId }
    });

    let total = 0;
    fetchedExpenseSets.forEach(set => {
      total += _.toNumber(set.totalYearly);
    });

    return total;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a single expense sets
 *
 * @param {object} param
 * @param {string} param.userId - the id of the expense set owner
 * @param {string} param.expenseSetId - the id of the expense set
 * @return {number} - the number of deleted sets
 */
const remove = async ({ userId, expenseSetId }) => {
  const updatedInputs = { expenseSetId, userId };

  try {
    const deleted = await db.expenseSets.destroy( {
      where: { userId, id: expenseSetId }
    });

    return Boolean(deleted.length);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  edit,
  addToTotalYearly,
  editTotalYearly,
  fetchOne,
  fetchAll,
  getTotalYearlyTotal,
  remove,
  collectionValid: utils.setCollectionValid
};
