const db = require('../config/db.js');
const expenseSetsService = require('./expenseSets.service');

/**
 * Create a new expense
 *
 * @param {object} param
 * @param {string} param.name - the expense name
 * @param {string} param.description - the expense description
 * @param {number} param.totalYearly - the cost for a year
 * @param {string} param.userId - the id of the expense owner
 * @param {string} param.expenseSetId - the id of the expense set the expense is in
 * @return {object} - the newly created expense
 */
const create = async ({ name, description, totalYearly, userId, expenseSetId }) => {
  try {
    const newExpense = await db.expenses.create({ name, description, totalYearly, userId, expenseSetId });

    return newExpense;
  } catch (error) {
    throw error;
  }
};

/**
 * Edit an existing expense
 *
 * @param {object} param
 * @param {string} param.name - the expense name
 * @param {string} param.description - the expense description
 * @param {number} param.totalYearly - the cost for a year
 * @param {string} param.userId - the id of the expense owner
 * @param {string} param.expenseSetId - the id of the expense set the expense is in
 * @param {string} param.expenseId - the id of the expense being edited
 * @return {object} - the edited expense
 */
const edit = async ({ name, description, totalYearly, userId, expenseSetId, expenseId }) => {
  try {
    const currentExpense = await db.expenses.findOne({
      where: { userId, expenseSetId, id: expenseId }
    });

    const editedExpense = await db.expenses.update({
      name, description, totalYearly
    },
      {
        where: { userId, expenseSetId, id: expenseId }
      });

    const editedExpenseSet = await expenseSetsService.editTotalYearly({
      userId,
      expenseSetId,
      originalValue: currentExpense.totalYearly,
      newValue: totalYearly
    });

    return editedExpense;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete an existing expense
 *
 * @param {object} param
 * @param {string} param.expenseSetId - the id of the expense set the expense is in
 * @param {string} param.expenseId - the id of the expense being deleted
 * @param {string} param.userId - the id of the expense owner
 * @return {number} - the number of removed items
 */
const remove = async ({ expenseSetId, expenseId = null, userId }) => {
  const where = { expenseSetId, userId };

  if (expenseId) {
    where.id = expenseId
  }

  try {
    const expenseDeleted = await db.expenses.destroy({ where });

    return expenseDeleted;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch an expense
 *
 * @param {object} param
 * @param {string} param.expenseSetId - the id of the expense set the expense is in
 * @param {string} param.expenseId - the id of the expense being fetched
 * @param {string} param.userId - the id of the expense owner
 * @return {object} - the fetched expense
 */
const fetchOne = async ({ expenseSetId, expenseId, userId }) => {
  try {
    const fetchedExpense = await db.expenses.findOne({
      where: { expenseSetId, id: expenseId, userId }
    });

    return fetchedExpense;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  edit,
  remove,
  fetchOne
};
