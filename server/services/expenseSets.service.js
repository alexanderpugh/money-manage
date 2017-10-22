const db = require('../config/db.js');

const expenseSetsService = {};

/**
 * Create a new expense set
 *
 * @param {object} param
 * @param {string} param.name - the expense set name
 * @param {string} param.description - the expense set description
 * @param {string} param.userId - the id of the expense set owner
 * @return {object} - the newly created expense set
 */
expenseSetsService.create = async ({ name, description, userId }) => {
  try {
    const newExpenseSet = await db.expenseSets.create({
      name,
      description,
      userId
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
expenseSetsService.edit = async ({ name = null, description = null, userId, totalYearly = null, expenseSetId }) => {
  const updatedInputs = { expenseSetId, userId };
  if (name) {
    updatedInputs.name = name;
  }
  if (description) {
    updatedInputs.description = description;
  }
  if (totalYearly) {
    updatedInputs.totalYearly = totalYearly
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
expenseSetsService.addToTotalYearly = async ({ value, userId, expenseSetId }) => {
  const updatedInputs = {};

  try {
    const current = await db.expenseSets.findOne({
      where: { userId, id: expenseSetId }
    });

    const updated = await db.expenseSets.update({
      totalYearly: current.totalYearly + parseFloat(value)
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
expenseSetsService.editTotalYearly = async ({ originalValue, newValue, userId, expenseSetId }) => {
  const updatedInputs = {};

  try {
    const current = await db.expenseSets.findOne({
      where: { userId, id: expenseSetId }
    });

    const updated = await db.expenseSets.update({
      totalYearly: (current.totalYearly - parseFloat(originalValue)) + parseFloat(newValue)
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
expenseSetsService.fetchOne = async ({ userId, expenseSetId }) => {
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
expenseSetsService.fetchAll = async ({ userId }) => {
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
expenseSetsService.getTotalYearlyTotal = async ({ userId }) => {
  try {
    const fetchedExpenseSets = await db.expenseSets.findAll({
      where: { userId }
    });

    let total = 0;
    fetchedExpenseSets.forEach(set => {
      total += set.totalYearly;
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
expenseSetsService.delete = async ({ userId, expenseSetId }) => {
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

module.exports = expenseSetsService;
